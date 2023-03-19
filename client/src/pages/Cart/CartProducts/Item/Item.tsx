import { Edit, Delete } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import PotChocolateCake from '../../../../assets/img/bolo-pote-chocolate.jpg';
import { MainButton } from '../../../../components/MainButton';
import { EditItem } from './EditItem';
import { BoxImg, Title } from './Item.styled';

export const Item: React.FunctionComponent = () => {
	const [openEditItemDialog, setOpenEditItemDialog] = useState(false);

	const handleSetOpenEditItemDialog = (): void => {
		setOpenEditItemDialog(true);
	};

	return (
		<Box>
			<Grid display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
				<BoxImg component="div" sx={{ backgroundImage: `url(${PotChocolateCake})`, }} />

				<Grid display="flex" flexDirection="column" flexGrow={1}>
					<Title variant="h6">Bolo de pote</Title>
					<Typography variant="body1" sx={(theme): any => ({ color: theme.palette.grey[700], }) }>Massas: Chocolate, Baunilha</Typography>
					<Typography variant="body1" sx={(theme): any => ({ color: theme.palette.grey[700], }) }>Recheios: Abacaxi, Ninho</Typography>
				</Grid>

				<Grid display="flex" flexDirection="column" sx={{ marginInlineEnd: 'auto', }}>
					<Title variant="h6">R$ 7,20</Title>
					<Typography variant="body1" sx={(theme): any => ({ color: theme.palette.grey[700], }) }>Quantidade: 1</Typography>
					<Typography variant="body1" sx={(theme): any => ({ color: theme.palette.grey[700], }) }>Tamanho: 250ml</Typography>

					<Grid display="flex" gap={2} sx={{ mt: 1, }}>
						<MainButton style={{ padding: 0, }} onClick={handleSetOpenEditItemDialog}>
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