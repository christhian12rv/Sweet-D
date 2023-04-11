import { Card, CardContent, Box, Grid, Typography } from '@mui/material';
import React from 'react';

type Props = {
	children: any;
	title: string;
	value: string | number;
	iconColor: string;
}

export const TotalQuantityCard: React.FunctionComponent<Props> = ({ children, title, value, iconColor, }) => {
	return (
		<Card sx={{
			width: '100%',
			boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
		}}>
			<CardContent>
				<Grid display="flex" alignItems="center">
					<Grid sx={(theme): object => ({
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: theme.palette.primary.dark,
						mr: 1,
						'& .MuiSvgIcon-root': {
							fontSize: '3em !important',
						},
					})}>
						{children}
					</Grid>

					<Grid display="flex" justifyContent="center" flexGrow={1}>
						<Grid display="flex" flexDirection="column"  justifyContent="center">
							<Typography variant="h6">{title}</Typography>
							<Typography variant="h6" sx={(theme): object => ({ color: theme.palette.primary.dark, })}>{value}</Typography>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};