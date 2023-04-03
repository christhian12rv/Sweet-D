import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Divider, FormControl, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import 'suneditor/dist/css/suneditor.min.css';
import FileUpload from 'react-mui-fileuploader';
import { RichTextEditor } from '../../../components/RichTextEditor';
import { GridTextEditor } from './AddProduct.styled';
import { MainButton } from '../../../components/MainButton';
import { DeleteRounded } from '@mui/icons-material';
import CurrencyTextField from '@lupus-ai/mui-currency-textfield';
import { clearRequest as clearRequestAction, createProduct as createProductAction } from '../../../store/features/products/products.actions';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useTypedSelector } from '../../../store/utils/useTypedSelector';
import { useRequestVerification } from '../../../utils/hooks/useRequestVerification';
import RoutesEnum from '../../../types/enums/RoutesEnum';
import ProductCreateType from '../../../types/Product/Create/ProductCreateType';
import { useTitle } from '../../../utils/hooks/useTitle';
import { ProductsActionsTypes } from '../../../store/features/products/products.types';
import ProductSizeCreateType from '../../../types/Product/Create/ProductSizeCreateType';
import ProductIngredientTypeCreateType from '../../../types/Product/Create/ProductIngredientTypeCreateType';
import ProductIngredientCreateType from '../../../types/Product/Create/ProductIngredientCreateType';

export const AddProduct: React.FunctionComponent = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { request, loading, previousType, } = useTypedSelector((state) => state.products);

	const [product, setProduct] = useState<ProductCreateType>({
		name: '',
		description: '',
		photos: [],
		slug: '',
		sizes: [],
		ingredients: [],
		ingredientTypes: [],
	});

	useTitle('Admin - Adicionar produto');

	useEffect(() => {
		dispatch(clearRequestAction());
	}, []);

	useRequestVerification({
		request,
		successMessage: 'Produto criado com sucesso',
		successNavigate: RoutesEnum.ADMIN_LIST_PRODUCTS,
		type: {
			actualType: previousType,
			expectedType: ProductsActionsTypes.CREATE_SUCCESS,
		},
	});

	const handleSaveButtonClick = (): void => {
		dispatch(createProductAction(product));
	};

	const handleFilesChange = (files): void => {
		setProduct({ ...product, photos: [...files], });
	};

	const handleChangeProduct = (property, value): void => {
		setProduct({ ...product, [property]: value, });
	};

	const handleAddSize = (): void => {
		const newId = product.sizes?.length ? (Math.max(...(product.sizes?.map(size => size.id) as number[])) + 1) : 1;
		const newSize = {
			id: newId,
			name: '',
			price: 0,
		} as ProductSizeCreateType;

		setProduct({ ...product , sizes: [...(product.sizes as ProductSizeCreateType[]), newSize], });
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
			productId: 0,
			min: 0,
			max: 0,
			type: '',
		} as ProductIngredientTypeCreateType;

		setProduct({ ...product , ingredientTypes: [...(product.ingredientTypes as ProductIngredientTypeCreateType[]), newIngredientType], });
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
			productId: 0,
			name: '',
			price: 0,
			type: '',
		} as ProductIngredientCreateType;

		setProduct({ ...product , ingredients: [...(product.ingredients as ProductIngredientCreateType[]), newIngredient], });
	} ;

	const handleChangeProductIngredient = (id, property, value): void => {
		const changedIngredients = product.ingredients?.map(ingredient => {
			if (ingredient.id === id)
				ingredient[property] = value;
			return ingredient;
		});
		
		setProduct({ ...product, ingredients: changedIngredients, });

		console.log(product.ingredients);
	};

	const handleRemoveProductIngredient = (id): void => {
		const changedIngredients = product.ingredients?.filter(ingredient => ingredient.id !== id);

		setProduct({ ...product, ingredients: changedIngredients, });
	};
	

	return (
		<Grid display="flex" flexDirection="column" justifyContent="center" gap={4} sx={{ maxWidth: '100%', }}>
			<Typography variant="h4">Adicionar produto</Typography>

			<FormControl>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<TextField
							label="Nome"
							type="text"
							value={product.name}
							onChange={(event): any => handleChangeProduct('name', event.target.value)}
							fullWidth
							sx={{ minHeight: 56, }}/>
					</Grid>

					<Grid item xs={12} md={6}>
						<TextField
							label="Slug"
							type="text"
							value={product.slug}
							onChange={(event): any => handleChangeProduct('slug', event.target.value)}
							fullWidth
							sx={{ minHeight: 56, }}/>
					</Grid>

					<Grid item xs={12} md={12}>
						<RichTextEditor
							placeholder="Descrição..."
							defaultValue=""
							onChange={(value): any => handleChangeProduct('description', value)} />
					</Grid>

					<GridTextEditor item xs={12} md={12}>
						<FileUpload 
							multiFile={true}
							disabled={false}
							title="Imagens do produto"
							header="Puxe uma imagem até aqui"
							leftLabel="ou"
							buttonLabel="Clique aqui"
							rightLabel="para selecionar imagens"
							buttonRemoveLabel="Remover todas"
							maxFilesContainerHeight={317}
							acceptedType={'image/*'}
							allowedExtensions={['jpg', 'jpeg', 'png']}
							defaultValue={product.photos}
							onFilesChange={handleFilesChange}
							BannerProps={{ elevation: 0, variant: 'outlined', }}
							showPlaceholderImage={false}
							PlaceholderGridProps={{ md: 4, }}
							LabelsGridProps={{ md: 8, }}
							ContainerProps={{
								elevation: 0,
								variant: 'outlined',
								sx: { p: 1, },
							}}
						/>
					</GridTextEditor>

					
					<Grid item xs={12} md={12} sx={{ mt: 5, }}>
						<Typography variant="h5">Tamanhos</Typography>
					</Grid>
					<Grid item xs={12} md={12}>
						<MainButton onClick={handleAddSize}>Adicionar tamanho</MainButton>
					</Grid>

					{product.sizes?.map((size, index) => (
						<>
							<Grid item xs={12} md={6}>
								<TextField
									label={`Nome tamanho ${index + 1}`}
									type="string"
									value={product.sizes?.find(s => s.id === size.id)?.name}
									onChange={(event): any => handleChangeProductSize(size.id, 'name', event.target.value)}
									fullWidth/>
							</Grid>
							<Grid item xs={12} md={5}>
								<CurrencyTextField
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
						</>
					))}

					<Grid item xs={12} md={12}>
						<Typography variant="h5">Tipos de ingrediente</Typography>
					</Grid>
					<Grid item xs={12} md={12}>
						<MainButton onClick={handleAddIngredientType}>Adicionar tipo de ingrediente</MainButton>
					</Grid>

					{product.ingredientTypes?.map((ingredientType, index) => (
						<>
							<Grid item xs={12} md={6}>
								<TextField
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
									label={`Mínimo tipo de ingrediente ${index + 1}`}
									type="number"
									value={product.ingredientTypes?.find(s => s.id === ingredientType.id)?.min}
									onChange={(event): any => handleChangeProductIngredientType(ingredientType.id, 'min', event.target.value)}
									InputProps={{ inputProps: { min: 0, }, }}
									fullWidth/>
							</Grid>
							<Grid item xs={12} md={5}>
								<TextField
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
						</>
					))}

					<Grid item xs={12} md={12}>
						<Typography variant="h5">Ingredientes</Typography>
					</Grid>
					<Grid item xs={12} md={12}>
						<MainButton onClick={handleAddIngredient}>Adicionar Ingrediente</MainButton>
					</Grid>

					{product.ingredients?.map((ingredient, index) => (
						<>
							<Grid item xs={12} md={6}>
								<TextField
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
									label={`Preço ingrediente ${index + 1}`}
									variant="outlined"
									value={product.ingredients?.find(s => s.id === ingredient.id)?.price}
									currencySymbol="R$"
									outputFormat="number"
									onChange={(event, value): any => handleChangeProductSize(ingredient.id, 'price', value)}
									decimalCharacter=","
									digitGroupSeparator="."
									minimumValue="0"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} md={5}>
								<TextField
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
						</>
					))}
					
					<Grid item xs={12} md={12}>
						<MainButton onClick={handleSaveButtonClick} style={{ width: '200px', }}>Salvar</MainButton>
					</Grid>
				</Grid>
			</FormControl>
		</Grid>
	);
};