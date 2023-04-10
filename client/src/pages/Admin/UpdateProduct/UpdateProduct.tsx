import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, IconButton, MenuItem, Switch, TextField, Typography } from '@mui/material';
import 'suneditor/dist/css/suneditor.min.css';
import FileUpload from 'react-mui-fileuploader';
import { RichTextEditor } from '../../../components/RichTextEditor';
import { GridTextEditor } from './UpdateProduct.styled';
import { MainButton } from '../../../components/MainButton';
import { DeleteRounded } from '@mui/icons-material';
import CurrencyTextField from '@lupus-ai/mui-currency-textfield';
import { clearRequest as clearRequestAction, findBySlug as findBySlugAction, updateProduct as updateProductAction } from '../../../store/features/products/products.actions';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useTypedSelector } from '../../../store/utils/useTypedSelector';
import { useRequestVerification } from '../../../utils/hooks/useRequestVerification';
import RoutesEnum from '../../../types/enums/RoutesEnum';
import { useTitle } from '../../../utils/hooks/useTitle';
import getRequestErrorByField from '../../../store/utils/getRequestErrorByField';
import { ProductsActionsTypes } from '../../../store/features/products/products.types';
import { BackdropLoading } from '../../../components/BackdropLoading';
import ProductUpdateType from '../../../types/Product/Update/ProductUpdateType';
import ProductSizeUpdateType from '../../../types/Product/Update/ProductSizeUpdateType';
import ProductIngredientTypeUpdateType from '../../../types/Product/Update/ProductIngredientTypeUpdateType';
import ProductIngredientUpdateType from '../../../types/Product/Update/ProductIngredientUpdateType';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { FileUploader } from '../../../components/FileUploader';
import createFileFromUrl from '../../../utils/createFileFromUrl';

export const UpdateProduct: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { request, loading :requestLoading, previousType, } = useTypedSelector((state) => state.products);
	const [loading, setLoading] = useState(true);
	const { slug, } = useParams();

	const [product, setProduct] = useState<ProductUpdateType>({
		id: 0,
		name: '',
		description: '',
		photos: [],
		slug: '',
		sizes: [],
		ingredients: [],
		ingredientTypes: [],
		active: true,
	});

	const [title, setTitle] = useTitle('Admin - Produto #0');

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
			jsonProduct.photos = await Promise.all(
				JSON.parse(jsonProduct.photos).map( async (p, index) => await createFileFromUrl(p.url, `Imagem ${index + 1}`))
			);
			jsonProduct.sizes = jsonProduct.sizes.map(s => {
				s.new = false;
				return s;
			});
			jsonProduct.ingredients = jsonProduct.ingredients.map(i => {
				i.new = false;
				return i;
			});
			jsonProduct.ingredientTypes = jsonProduct.ingredientTypes.map(it => {
				it.new = false;
				return it;
			});

			setTitle(`Admin - Produto #${jsonProduct.id}`);
			setProduct(jsonProduct);
		}

		setLoading(false);
	};

	useEffect(() => {
		dispatch(clearRequestAction());
		fetchProduct();
	}, []);

	useRequestVerification({
		request,
		successMessage: 'Produto atualizado com sucesso',
		successNavigate: RoutesEnum.ADMIN_LIST_PRODUCTS,
		type: {
			actualType: previousType,
			expectedType: ProductsActionsTypes.UPDATE_SUCCESS,
		},
	});

	const handleFormSubmit = (event): void => {
		event.preventDefault();
		dispatch(updateProductAction(product));
	};

	const handleChangeProduct = (property, value): void => {
		setProduct((state) => ({ ...state, [property]: value, }));
	};

	const handleAddSize = (): void => {
		const newId = product.sizes?.length ? (Math.max(...(product.sizes?.map(size => size.id) as number[])) + 1) : 1;
		const newSize = {
			id: newId,
			name: '',
			price: 0,
			new: true,
		} as ProductSizeUpdateType;

		setProduct({ ...product , sizes: [...(product.sizes as ProductSizeUpdateType[]), newSize], });
	} ;

	const handleChangeProductSize = (id, property, value): void => {
		const changedSizes = product.sizes?.map(size => {
			if (size.id === id)
				size[property] = value;
			return size;
		});
		
		setProduct({ ...product, sizes: changedSizes, });
	};

	const handleRemoveProductSize = (id): void => {
		const changedSizes = product.sizes?.filter(size => size.id !== id);

		setProduct({ ...product, sizes: changedSizes, });
	};

	const handleAddIngredientType = (): void => {
		const newId = product.ingredientTypes?.length ? (Math.max(...(product.ingredientTypes?.map(ingredientType => ingredientType.id) as number[])) + 1) : 1;
		const newIngredientType = {
			id: newId,
			min: 0,
			max: 0,
			type: '',
			new: true,
		} as ProductIngredientTypeUpdateType;

		setProduct({ ...product , ingredientTypes: [...(product.ingredientTypes as ProductIngredientTypeUpdateType[]), newIngredientType], });
	} ;

	const handleChangeProductIngredientType = (id, property, value): void => {
		const changedIngredientTypes = product.ingredientTypes?.map(ingredientType => {
			if (ingredientType.id === id)
				ingredientType[property] = value;
			return ingredientType;
		});
		
		setProduct({ ...product, ingredientTypes: changedIngredientTypes, });
	};

	const handleRemoveProductIngredientType = (id): void => {
		const changedIngredientTypes = product.ingredientTypes?.filter(ingredientType => ingredientType.id !== id);

		setProduct({ ...product, ingredientTypes: changedIngredientTypes, });
	};

	const handleAddIngredient = (): void => {
		const newId = product.ingredients?.length ? (Math.max(...(product.ingredients?.map(ingredient => ingredient.id) as number[])) + 1) : 1;
		const newIngredient = {
			id: newId,
			name: '',
			price: 0,
			type: '',
			new: true,
		} as ProductIngredientUpdateType;

		setProduct({ ...product , ingredients: [...(product.ingredients as ProductIngredientUpdateType[]), newIngredient], });
	} ;

	const handleChangeProductIngredient = (id, property, value): void => {
		const changedIngredients = product.ingredients?.map(ingredient => {
			if (ingredient.id === id)
				ingredient[property] = value;
			return ingredient;
		});
		
		setProduct({ ...product, ingredients: changedIngredients, });
	};

	const handleRemoveProductIngredient = (id): void => {
		const changedIngredients = product.ingredients?.filter(ingredient => ingredient.id !== id);

		setProduct({ ...product, ingredients: changedIngredients, });
	};
	

	return (
		<Grid display="flex" flexDirection="column" justifyContent="center" gap={4} sx={{ maxWidth: '100%', }}>
			<BackdropLoading open={loading || requestLoading}/>

			<Typography variant="h4">Atualizar Produto #{product.id}</Typography>

			<form onSubmit={handleFormSubmit}>
				<FormControl>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<FormControlLabel control={<Switch checked={product.active} onChange={(): any => handleChangeProduct('active', !product.active)}/>} label="Ativo" />
						</Grid>
						<Grid item xs={12} md={6}>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								error={!!getRequestErrorByField(request, 'name')}
								helperText={getRequestErrorByField(request, 'name')?.message}
								label="Nome"
								type="text"
								value={product.name}
								onChange={(event): any => handleChangeProduct('name', event.target.value)}
								fullWidth
								sx={{ minHeight: 56, }}/>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								error={!!getRequestErrorByField(request, 'slug')}
								helperText={getRequestErrorByField(request, 'slug')?.message}
								label="Slug"
								type="text"
								value={product.slug}
								onChange={(event): any => handleChangeProduct('slug', event.target.value)}
								fullWidth
								sx={{ minHeight: 56, }}/>
						</Grid>

						<Grid item xs={12} md={12}>
							{product.description && <>
								<RichTextEditor
									error={!!getRequestErrorByField(request, 'description')}
									placeholder="Descrição..."
									defaultValue={product.description}
									onChange={(event): any => handleChangeProduct('description', event)} />
								<FormHelperText sx={(theme): object => ({ color: theme.palette.error.main, })}>
									{getRequestErrorByField(request, 'description')?.message}
								</FormHelperText>
							</>
							}
						</Grid>

						<GridTextEditor item xs={12} md={12} sx={(theme): object => ({
							'& .MuiPaper-root': {
								...(!!getRequestErrorByField(request, 'photos') && { borderColor: theme.palette.error.main, }),
							},
						})}>
							<FileUploader files={product.photos} onChange={(value): any => handleChangeProduct('photos', value.map(v => v.file))}/>
							<FormHelperText sx={(theme): object => ({ color: theme.palette.error.main, })}>
								{getRequestErrorByField(request, 'photos')?.message}
							</FormHelperText>
						</GridTextEditor>

						
						<Grid item xs={12} md={12} sx={{ mt: 5, }}>
							<Typography variant="h5">Tamanhos</Typography>
						</Grid>
						<Grid item xs={12} md={12}>
							<MainButton onClick={handleAddSize}>Adicionar tamanho</MainButton>
						</Grid>
						<Grid item xs={12} md={12} sx={{ display: getRequestErrorByField(request, 'sizes') ? 'initial' : 'none', }}>
							<FormHelperText sx={(theme): object => ({ color: theme.palette.error.main, })}>
								{getRequestErrorByField(request, 'sizes')?.message}
							</FormHelperText>
						</Grid>

						{product.sizes?.map((size, index) => (
							<React.Fragment key={size.id}>
								<Grid item xs={12} md={6}>
									<TextField
										error={!!getRequestErrorByField(request, `sizes[${index}].name`)}
										helperText={getRequestErrorByField(request, `sizes[${index}].name`)?.message}
										label={`Nome tamanho ${index + 1}`}
										type="string"
										value={product.sizes?.find(s => s.id === size.id)?.name}
										onChange={(event): any => handleChangeProductSize(size.id, 'name', event.target.value)}
										fullWidth/>
								</Grid>
								<Grid item xs={12} md={5}>
									<CurrencyTextField
										error={!!getRequestErrorByField(request, `sizes[${index}].price`)}
										helperText={getRequestErrorByField(request, `sizes[${index}].price`)?.message}
										label={`Preço tamanho ${index + 1}`}
										variant="outlined"
										value={product.sizes?.find(s => s.id === size.id)?.price}
										currencySymbol="R$"
										outputFormat="number"
										onChange={(event, value): any => handleChangeProductSize(size.id, 'price', value)}
										decimalCharacter=","
										digitGroupSeparator="."
										minimumValue="0"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12} md={1} display="flex" alignItems="center">
									<IconButton
										color="inherit"
										aria-label="delete size"
										edge="start"
										onClick={(): any => handleRemoveProductSize(size.id)}
									>
										<DeleteRounded sx={(theme): object => ({
											color: theme.palette.grey[700],
										})}/>
									</IconButton>
									
								</Grid>
								<Grid item xs={12} md={12}>
									<Divider/>
								</Grid>
							</React.Fragment>
						))}

						<Grid item xs={12} md={12}>
							<Typography variant="h5">Tipos de ingrediente</Typography>
						</Grid>
						<Grid item xs={12} md={12}>
							<MainButton onClick={handleAddIngredientType}>Adicionar tipo de ingrediente</MainButton>
						</Grid>
						<Grid item xs={12} md={12} sx={{ display: getRequestErrorByField(request, 'ingredientTypes') ? 'initial' : 'none', }}>
							<FormHelperText sx={(theme): object => ({ color: theme.palette.error.main, })}>
								{getRequestErrorByField(request, 'ingredientTypes')?.message}
							</FormHelperText>
						</Grid>

						{product.ingredientTypes?.map((ingredientType, index) => (
							<React.Fragment key={ingredientType.id}>
								<Grid item xs={12} md={6}>
									<TextField
										error={!!getRequestErrorByField(request, `ingredientTypes[${index}].type`)}
										helperText={getRequestErrorByField(request, `ingredientTypes[${index}].type`)?.message}
										label={`Nome tipo de ingrediente ${index + 1}`}
										type="string"
										value={product.ingredientTypes?.find(s => s.id === ingredientType.id)?.type}
										onChange={(event): any => handleChangeProductIngredientType(ingredientType.id, 'type', event.target.value)}
										fullWidth/>
								</Grid>
								<Grid item xs={12} md={6}>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										error={!!getRequestErrorByField(request, `ingredientTypes[${index}].min`)}
										helperText={getRequestErrorByField(request, `ingredientTypes[${index}].min`)?.message}
										label={`Mínimo tipo de ingrediente ${index + 1}`}
										type="number"
										value={product.ingredientTypes?.find(s => s.id === ingredientType.id)?.min}
										onChange={(event): any => handleChangeProductIngredientType(ingredientType.id, 'min', event.target.value)}
										InputProps={{ inputProps: { min: 0, }, }}
										fullWidth/>
								</Grid>
								<Grid item xs={12} md={5}>
									<TextField
										error={!!getRequestErrorByField(request, `ingredientTypes[${index}].max`)}
										helperText={getRequestErrorByField(request, `ingredientTypes[${index}].max`)?.message}
										label={`Máximo tipo de ingrediente ${index + 1}`}
										type="number"
										value={product.ingredientTypes?.find(s => s.id === ingredientType.id)?.max}
										onChange={(event): any => handleChangeProductIngredientType(ingredientType.id, 'max', event.target.value)}
										InputProps={{ inputProps: { min: 0, }, }}
										fullWidth/>
								</Grid>
								<Grid item xs={12} md={1} display="flex" alignItems="center">
									<IconButton
										color="inherit"
										aria-label="delete ingredientType"
										edge="start"
										onClick={(): any => handleRemoveProductIngredientType(ingredientType.id)}
									>
										<DeleteRounded sx={(theme): object => ({
											color: theme.palette.grey[700],
										})}/>
									</IconButton>
								</Grid>
								<Grid item xs={12} md={12}>
									<Divider/>
								</Grid>
							</React.Fragment>
						))}

						<Grid item xs={12} md={12}>
							<Typography variant="h5">Ingredientes</Typography>
						</Grid>
						<Grid item xs={12} md={12}>
							<MainButton onClick={handleAddIngredient}>Adicionar Ingrediente</MainButton>
						</Grid>
						<Grid item xs={12} md={12} sx={{ display: getRequestErrorByField(request, 'ingredients') ? 'initial' : 'none', }}>
							<FormHelperText sx={(theme): object => ({ color: theme.palette.error.main, })}>
								{getRequestErrorByField(request, 'ingredients')?.message}
							</FormHelperText>
						</Grid>

						{product.ingredients?.map((ingredient, index) => (
							<React.Fragment key={ingredient.id}>
								<Grid item xs={12} md={6}>
									<TextField
										error={!!getRequestErrorByField(request, `ingredients[${index}].name`)}
										helperText={getRequestErrorByField(request, `ingredients[${index}].name`)?.message}
										label={`Nome ingrediente ${index + 1}`}
										type="string"
										value={product.ingredients?.find(s => s.id === ingredient.id)?.name}
										onChange={(event): any => handleChangeProductIngredient(ingredient.id, 'name', event.target.value)}
										fullWidth/>
								</Grid>
								<Grid item xs={12} md={6}>
								</Grid>
								<Grid item xs={12} md={6}>
									<CurrencyTextField
										error={!!getRequestErrorByField(request, `ingredients[${index}].price`)}
										helperText={getRequestErrorByField(request, `ingredients[${index}].price`)?.message}
										label={`Preço ingrediente ${index + 1}`}
										variant="outlined"
										value={product.ingredients?.find(s => s.id === ingredient.id)?.price}
										currencySymbol="R$"
										outputFormat="number"
										onChange={(event, value): any => handleChangeProductIngredient(ingredient.id, 'price', value)}
										decimalCharacter=","
										digitGroupSeparator="."
										minimumValue="0"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12} md={5}>
									<TextField
										error={!!getRequestErrorByField(request, `ingredients[${index}].type`)}
										helperText={getRequestErrorByField(request, `ingredients[${index}].type`)?.message}
										label={`Tipo ingrediente ${index + 1}`}
										select
										type="string"
										value={product.ingredients?.find(s => s.id === ingredient.id)?.type}
										onChange={(event): any => handleChangeProductIngredient(ingredient.id, 'type', event.target.value)}
										fullWidth>
										{product.ingredientTypes?.map((ingredientType, index) => (
											<MenuItem key={ingredientType.id} value={ingredientType.type}>
												{ingredientType.type}
											</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={12} md={1} display="flex" alignItems="center">
									<IconButton
										color="inherit"
										aria-label="delete ingredient"
										edge="start"
										onClick={(): any => handleRemoveProductIngredient(ingredient.id)}
									>
										<DeleteRounded sx={(theme): object => ({
											color: theme.palette.grey[700],
										})}/>
									</IconButton>
								</Grid>
								<Grid item xs={12} md={12}>
									<Divider/>
								</Grid>
							</React.Fragment>
						))}
						
						<Grid item xs={12} md={12}>
							<MainButton type="submit" style={{ width: '200px', }}>Salvar</MainButton>
						</Grid>
					</Grid>
				</FormControl>
			</form>
		</Grid>
	);
};