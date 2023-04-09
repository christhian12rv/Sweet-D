import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import ProductType from '../../types/Product/ProductType';
import { useTitle } from '../../utils/hooks/useTitle';
import { Item } from './Item';
import { OtherProducts } from './OtherProducts';
import { BoxArea, GridContainer } from './Product.styled';
import { clearRequest as clearRequestAction, findBySlug as findBySlugAction } from '../../store/features/products/products.actions';
import { enqueueSnackbar } from 'notistack';
import RoutesEnum from '../../types/enums/RoutesEnum';
import { BackdropLoading } from '../../components/BackdropLoading';

export const Product: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [loading, setLoading] = useState(true);
	const { slug, } = useParams();

	const [product, setProduct] = useState<ProductType>({
		id: 0,
		name: '',
		description: '',
		photos: '',
		slug: '',
		sizes: [],
		ingredients: [],
		ingredientTypes: [],
		active: true,
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	const [title, setTitle] = useTitle('Sweet D');

	const fetchProduct = async (): Promise<void> => {
		setLoading(true);

		const [response, json] = await findBySlugAction(slug || '');
		if (response.status === 500) {
			enqueueSnackbar(json.message, { variant: 'error', });
			setLoading(false);
			return;
		} else if (response.status === 404) {
			navigate(RoutesEnum.ERROR_404);
			return;
		}

		const jsonProduct = json.product;
		if (jsonProduct) {
			setProduct(jsonProduct);
			setTitle(jsonProduct.name);
		}

		setLoading(false);
	};

	useEffect(() => {
		dispatch(clearRequestAction());
		fetchProduct();
	}, []);

	return (
		<BoxArea>
			<BackdropLoading open={loading} />
			{!loading && (
				<GridContainer>
					<Item product={product}/>
					<OtherProducts/>
				</GridContainer>
			)}
		</BoxArea>
	);
};