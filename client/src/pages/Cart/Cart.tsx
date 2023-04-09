import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTitle } from '../../utils/hooks/useTitle';
import { BoxArea, GridContainer } from './Cart.styled';
import { CartProducts } from './CartProducts';
import { CheckoutCard } from './CheckoutCard';
import { fetchCart as fetchCartAction } from '../../store/features/cart/cart.actions';
import { findAllByIds as findAllProductsBydIdsAction } from '../../store/features/products/products.actions';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import { EmptyCart } from './EmptyCart';
import { BackdropLoading } from '../../components/BackdropLoading';
import { useNavigate } from 'react-router-dom';
import RoutesEnum from '../../types/enums/RoutesEnum';
import ProductType from '../../types/Product/ProductType';

export const Cart: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { productsChoices, loading, } = useTypedSelector((state) => state.cart);
	const [fetchProductsLoading, setFetchProductsLoading] = useState(true);
	const [products, setProducts] = useState<ProductType[]>([]);

	useTitle('Carrinho');

	useEffect(() => {
		dispatch(fetchCartAction());
	}, []);

	const fetchProducts = async (): Promise<void> => {
		setFetchProductsLoading(true);

		const [response, json] = await findAllProductsBydIdsAction(productsChoices.map(p => p.id));

		if (response.status === 500) {
			navigate(RoutesEnum.ERROR_500);
			return;
		}

		setProducts(json.products || []);
		
		setFetchProductsLoading(false);
	};

	useEffect(() => {
		if (!productsChoices || productsChoices.length <= 0)
			return;
			
		fetchProducts();
	}, [productsChoices]);

	return (
		<BoxArea>
			{!loading ? 
				productsChoices.length > 0 ?
					(
						<React.Fragment>
							<Typography variant="h4">Carrinho</Typography>
							<GridContainer>
								<CartProducts fetchProductsLoading={fetchProductsLoading} products={products}/>
								<CheckoutCard fetchProductsLoading={fetchProductsLoading} products={products} productsChoices={productsChoices}/>
							</GridContainer>
						</React.Fragment>
					)
					: (
						<EmptyCart />
					)
				: <BackdropLoading open />
			}
		</BoxArea>
	);
};