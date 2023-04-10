import { AccordionDetails, AccordionSummary, Divider, FormControl, Grid, MenuItem, Modal, Pagination, Slider, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MainButton } from '../../components/MainButton';
import { ProductCard } from '../../components/ProductCard';
import { BoxArea, BoxModal, CloseModalIcon, FormAccordionStyled, FormControlStyled, GridContainer } from './Products.styled';
import { ExpandMoreRounded } from '@mui/icons-material';
import { useTitle } from '../../utils/hooks/useTitle';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import PaginationModelType from '../../types/PaginationModelType';
import ProductType from '../../types/Product/ProductType';
import { clearRequest as clearRequestAction, findAllProducts as findAllProductsAction } from '../../store/features/products/products.actions';
import { BackdropLoading } from '../../components/BackdropLoading';

// const sortByArray = [
// 	{
// 		value: 'a',
// 		label: 'Menor preço',
// 	},
// 	{
// 		value: 'b',
// 		label: 'Maior preço',
// 	},
// 	{
// 		value: 'c',
// 		label: 'Disponível',
// 	}
// ];

export const Products: React.FunctionComponent = () => {
	// const [page, setPage] = useState(1);
	// const [openFilterModal, setOpenFilterModal] = useState(false);
	// const [name, setName] = useState('');
	// const [price, setPrice] = useState<number[]>([5, 39]);
	// const [sortBy, setSortBy] = useState(sortByArray[0]);

	// const handleChangePage = (event: React.ChangeEvent<unknown>, value: number): void => {
	// 	setPage(value);
	// };

	// const handleOpenFilterModal = (): void => {
	// 	setOpenFilterModal(true);
	// };

	// const handleCloseFilterModal = (): void => {
	// 	setOpenFilterModal(false);
	// };

	// const handleChangeName = (event): void => {
	// 	setName(event.target.value);
	// };

	// const handleChangePrice = (event: Event, newValue: number | number[]): void => {
	// 	setPrice(newValue as number[]);
	// };

	// const handleChangeSortBy = (event): void => {
	// 	setSortBy(event.target.value);
	// };

	useTitle('Produtos');

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
		<>
			<BoxArea>
				<GridContainer>
					{/* <MainButton style={{ alignSelf: 'flex-start', }} onClick={handleOpenFilterModal}>Filtrar</MainButton> */}
					<Typography variant="h4">Produtos</Typography>
					<Grid position="relative" display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" gap={5} py="2em" width="100%" minHeight={400}>
						<BackdropLoading open={loading} />
						{products.map(p => (
							<ProductCard product={p} key={p.id}/>
						))}
					</Grid>
					
					{/* <Pagination count={10} size="large" page={page} onChange={handleChangePage} /> */}
				</GridContainer>

				{/* <Modal
					open={openFilterModal}
					onClose={handleCloseFilterModal}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<BoxModal>
						<Grid display="flex" alignItems="center" justifyContent="center" mx="1em">
							<Typography id="modal-modal-title" variant="h6" component="h2" mx="auto">
								Filtro
							</Typography>
							<CloseModalIcon onClick={handleCloseFilterModal}/>
						</Grid>

						<FormControlStyled>
							<FormAccordionStyled>
								<AccordionSummary
									expandIcon={<ExpandMoreRounded />}
									aria-controls="name-content"
									id="name-header"
								>
									<Typography>Nome</Typography>
								</AccordionSummary>
								<AccordionDetails sx={{ pb: 0, }}>
									<TextField
										fullWidth
										label="Nome"
										variant="outlined"
										value={name}
										onChange={handleChangeName} />
								</AccordionDetails>
							</FormAccordionStyled>
							<Divider/>

							<FormAccordionStyled>
								<AccordionSummary
									expandIcon={<ExpandMoreRounded />}
									aria-controls="price-content"
									id="price-header"
								>
									<Grid display="flex" sx={{ width: '100%', }}>
										<Typography flexGrow={1}>Preço</Typography>
										<Typography sx={{ mr: '6px', }}>R$ {price[0]} - {price[1]}</Typography>
									</Grid>
								</AccordionSummary>
								<AccordionDetails sx={{ textAlign: 'center', }}>
									<Slider
										getAriaLabel={(): string => 'Preço'}
										value={price}
										onChange={handleChangePrice}
										valueLabelDisplay="auto"
										getAriaValueText={(value: number): string => `R$ ${value}`}
										min={5}
										max={39}
										sx={{ width: '94%', }}
									/>
								</AccordionDetails>
							</FormAccordionStyled>
							<Divider/>

							<FormAccordionStyled>
								<AccordionSummary
									expandIcon={<ExpandMoreRounded />}
									aria-controls="sort-by-content"
									id="sort-by-header"
								>
									<Typography>Ordenar por</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<TextField
										fullWidth
										select
										label="Ordenar por"
										defaultValue={sortByArray[0].value}
										value={sortBy}
										onChange={handleChangeSortBy}
									>
										{sortByArray.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</TextField>
								</AccordionDetails>
							</FormAccordionStyled>
							<Divider/>

							<MainButton style={{ margin: '1em 1em 0 1em', }}>Aplicar Filtros</MainButton>
						</FormControlStyled>
					</BoxModal>
				</Modal> */}
			</BoxArea>
		</>
	);
};