import { Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { MainButton } from '../../../components/MainButton';
import { useTypedSelector } from '../../../store/utils/useTypedSelector';
import { useTitle } from '../../../utils/hooks/useTitle';
import { GridContainer } from './CartProducts.styled';
import { Item } from './Item';
import { fetchCart as fetchCartAction, clearCart as clearCartAction } from '../../../store/features/cart/cart.actions';
import { findAllByIds as findAllProductsBydIdsAction } from '../../../store/features/products/products.actions';
import ProductType from '../../../types/Product/ProductType';
import { useNavigate } from 'react-router-dom';
import RoutesEnum from '../../../types/enums/RoutesEnum';
import { BackdropLoading } from '../../../components/BackdropLoading';

export const CartProducts: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { productsChoices, } = useTypedSelector((state) => state.cart);

	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState<ProductType[]>([]);

	useTitle('Carrinho');

	const handleClearCart = (): void => {
		clearCartAction();
		dispatch(fetchCartAction());
	};

	const fetchProducts = async (): Promise<void> => {
		setLoading(true);

		const [response, json] = await findAllProductsBydIdsAction(productsChoices.map(p => p.id));

		if (response.status === 500) {
			navigate(RoutesEnum.ERROR_500);
			return;
		}

		setProducts(json.products || []);
		
		setLoading(false);
	};

	useEffect(() => {
		fetchProducts();
	}, [productsChoices]);

	return (
		<Grid position="relative" display="flex" flexDirection="column" flexGrow={1} m={0}>
			{loading ? <BackdropLoading open /> :
				<React.Fragment>
					<MainButton onClick={handleClearCart} style={{ marginLeft: 'auto', }}>Limpar</MainButton>
					<GridContainer flexDirection="column" gap={3}>
						{productsChoices.map(p => (
							<>
								<Item productChoices={p} product={products.find(product => product.id === p.id)} key={p.id}/>
								<Divider/>
							</>
						)
						)}
					</GridContainer>
				</React.Fragment>
			}
		</Grid>
	);
};