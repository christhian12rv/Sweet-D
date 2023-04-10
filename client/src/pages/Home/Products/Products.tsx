import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { LinkUnstyled } from '../../../components/LinkUnstyled';
import { MainButton } from '../../../components/MainButton';
import { ProductCard } from '../../../components/ProductCard';
import RoutesEnum from '../../../types/enums/RoutesEnum';
import { clearRequest as clearRequestAction, findAllProducts as findAllProductsAction } from '../../../store/features/products/products.actions';
import PaginationModelType from '../../../types/PaginationModelType';
import { enqueueSnackbar } from 'notistack';
import ProductType from '../../../types/Product/ProductType';

export const Products: React.FunctionComponent = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState<ProductType[]>([]);

	const [paginationModel, setPaginationModel] = useState<PaginationModelType>({
		page: 0,
		pageSize: 5,
		sort: {
			field: 'createdAt',
			sort: 'desc',
		},
		filterActives: 'y',
	});

	const fetchProducts = async (): Promise<void> => {
		setLoading(true);

		const [response, json] = await findAllProductsAction(paginationModel);

		if (response.status === 500) {
			enqueueSnackbar(json.message, { variant: 'error', });
			setLoading(false);
			return;
		}

		if (json.products)
			setProducts(json.products);

		setLoading(false);
	};

	useEffect(() => {
		dispatch(clearRequestAction());
		fetchProducts();
	}, []);

	return (
		<Grid display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={5} mt={8} width="100%">
			<Typography variant="h4" fontWeight="bold">
				Produtos
			</Typography>
			<Grid display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" gap={5} width="100%">
				{products.map(p => (
					<ProductCard key={p.id} product={p}/>
				))}
			</Grid>
			<LinkUnstyled to={RoutesEnum.PRODUCTS}>
				<MainButton style={{ fontSize: '1em', marginTop: '1em', }}>Ver mais produtos</MainButton>
			</LinkUnstyled>
		</Grid>
	);
};