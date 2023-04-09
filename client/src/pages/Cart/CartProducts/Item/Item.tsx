import { Edit, Delete, StarBorder, ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material';
import { Box, Card, Collapse, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import PotChocolateCake from '../../../../assets/img/bolo-pote-chocolate.jpg';
import { MainButton } from '../../../../components/MainButton';
import ProductChoicesType from '../../../../types/Product/ProductChoicesType';
import ProductType from '../../../../types/Product/ProductType';
import { EditItem } from './EditItem';
import { BoxImg, Title } from './Item.styled';
import brlCurrencyFormatter from '../../../../utils/brlCurrencyFormatter';
import getTotalPriceOfProduct from '../../../../utils/getTotalPriceOfProduct';
import { LinkUnstyled } from '../../../../components/LinkUnstyled';
import RoutesEnum from '../../../../types/enums/RoutesEnum';

type Props = {
	productChoices: ProductChoicesType;
	product?: ProductType | undefined;
}

export const Item: React.FunctionComponent<Props> = ({ productChoices, product, }) => {
	const [openEditItemDialog, setOpenEditItemDialog] = useState(false);
	const screenWidthIsBellow400px = useMediaQuery('(max-width: 400px)');

	const handleSetOpenEditItemDialog = (): void => {
		setOpenEditItemDialog(true);
	};

	if (!product)
		return;

	return (
		<Box>
			<Grid display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
				<LinkUnstyled to={RoutesEnum.PRODUCT + product.slug}>
					<BoxImg component="div" sx={{ backgroundImage: `url(${JSON.parse(product.photos)[0].url})`, }} />
				</LinkUnstyled>

				<Grid display="flex" flexDirection="column" flexGrow={1} width="min-content">
					<Title variant="h6">{product.name}</Title>

					<List>
						{productChoices.ingredients.map((ingredient) => (
							<React.Fragment key={ingredient.type}>
								<ListItemButton >
									<ListItemText primary={ingredient.type} />
									<ExpandLessRounded />
								</ListItemButton>
								<Collapse in={true} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										{ingredient.ingredients.map((i, index) => (
											<ListItemButton key={index} sx={{ pl: 4, }}>
												<ListItemText primary={(product.ingredients?.find(pi => pi.id === i)?.name || '') +
												'\n(' + (brlCurrencyFormatter.format(product.ingredients?.find(pi => pi.id === i)?.price || 0) || '') + ')'} />
											</ListItemButton>
										))}
									</List>
								</Collapse>
							</React.Fragment>
						))}
					</List>
					
					{/* <Box sx={(theme): object => ({ maxWidth: screenWidthIsBellow400px ? 300 : 340, overflow: 'auto', 
						'&::-webkit-scrollbar': {
							height: '10px',
						},
						'&::-webkit-scrollbar-track': {
							background: 'transparent',
							boxShadow: 'none',
						},
						'&::-webkit-scrollbar-thumb': {
							background: theme.palette.grey[300],
							boxShadow: 'none',
							borderRadius: '2px',
						},
						'&::-webkit-scrollbar-thumb:hover': {
							background: '#555',
						},
						'& .MuiTableCell-root': {
							borderBottom: 0,
						},
						'& .MuiTableRow-root:not(:last-child)': {
							borderBottom: '1px solid rgba(224, 224, 224, 1)',
						},
					})}>
						<TableContainer sx={{ width: 'max-content !important', }}>
							<Table size="small">
								<TableBody>
									{productChoices.ingredients.map((ingredient) => (
										<TableRow
											key={ingredient.type}
										>
											<TableCell component="th" scope="row">{ingredient.type}</TableCell>
											
											{ingredient.ingredients.map((i, index) => (
												<TableCell key={index}>
													{product.ingredients?.find(pi => pi.id === i)?.name || ''}
													&nbsp;({brlCurrencyFormatter.format(product.ingredients?.find(pi => pi.id === i)?.price || 0) || ''})
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box> */}
				</Grid>

				<Grid display="flex" flexDirection="column" sx={{ marginInlineEnd: 'auto', }}>
					<Title variant="h6">{brlCurrencyFormatter.format(getTotalPriceOfProduct(product, productChoices))}</Title>
					<Typography variant="body1" sx={(theme): any => ({ color: theme.palette.grey[700], }) }>Quantidade: {productChoices.quantity}</Typography>
					<Typography variant="body1" sx={(theme): any => ({ color: theme.palette.grey[700], }) }>
						Tamanho: {product.sizes?.find(p => p.id === productChoices.size)?.name || ''}
						&nbsp;({brlCurrencyFormatter.format(product.sizes?.find(p => p.id === productChoices.size)?.price || 0) || ''})
					</Typography>

					<Grid display="flex" gap={2} sx={{ mt: 1, }}>
						<MainButton style={{ padding: 0, width: '10px !important', }} onClick={handleSetOpenEditItemDialog}>
							<Edit/>
						</MainButton>
						<MainButton style={{ padding: 0, }}>
							<Delete/>
						</MainButton>
					</Grid>
				</Grid>
			</Grid>

			<EditItem openEditItemDialog={openEditItemDialog} setOpenEditItemDialog={setOpenEditItemDialog}/>
		</Box>
	);
};