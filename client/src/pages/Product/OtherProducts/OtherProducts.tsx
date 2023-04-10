import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { ProductCard } from '../../../components/ProductCard';
import { LinkUnstyled } from '../../../components/LinkUnstyled';
import { MainButton } from '../../../components/MainButton';
import RoutesEnum from '../../../types/enums/RoutesEnum';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import PaginationModelType from '../../../types/PaginationModelType';
import ProductType from '../../../types/Product/ProductType';
import { clearRequest as clearRequestAction, findAllProducts as findAllProductsAction } from '../../../store/features/products/products.actions';

type Props = {
	product: ProductType;
}

export const OtherProducts: React.FunctionComponent<Props> = ({ product, }) => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState<ProductType[]>([]);

	const [paginationModel, setPaginationModel] = useState<PaginationModelType>({
		page: 0,
		pageSize: 3,
		sort: {
			field: 'createdAt',
			sort: 'desc',
		},
		slugNotFilter: product.slug,
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
				Outros Produtos
			</Typography>
			<Grid display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" gap={5} width="100%">
				{products.map(p => (
					<ProductCard key={p.id} product={p}/>
				))}
			</Grid>
			<LinkUnstyled to={RoutesEnum.PRODUCTS} style={{ marginTop: '1em', }}>
				<MainButton style={{ fontSize: '1em', }}>Ver mais produtos</MainButton>
			</LinkUnstyled>
		</Grid>
	);
};