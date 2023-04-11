import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

type Props = {
	children: any;
	title: string;
	quantity: number;
	iconColor: string;
}

export const TotalQuantityCard: React.FunctionComponent<Props> = ({ children, title, quantity, iconColor, }) => {
	return (
		<Card sx={{
			width: '100%',
			boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
		}}>
			<CardContent>
				<Grid display="flex" alignItems="center">
					<Box component="span" sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						mr: 1,
						'& .MuiSvgIcon-root': {
							fontSize: '2em !important',
							color: iconColor,
						},
					}}>
						{children}
					</Box>
					<Typography variant="h6" sx={{ flexGrow: 1, }}>{title}</Typography>
					<Typography variant="h6">{quantity}</Typography>
				</Grid>
			</CardContent>
		</Card>
	);
};