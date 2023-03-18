import { Box, CardContent, Typography } from '@mui/material';
import React from 'react';
import BackgroundColorsEnum from '../../../../types/enums/BackgroundColorsEnum';
import { BoxImg, CardStyled } from './SizeCard.styled';
import DonutImg from '../../../../assets/img/Donut.png';

type Props = {
	backgroundColor: BackgroundColorsEnum;
	size: string;
}

export const SizeCard: React.FunctionComponent<Props> = ({ backgroundColor, size, }) => {

	return (
		<CardStyled backgroundColor={backgroundColor}>
			<CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', }}>
				<BoxImg className="boxImg" component="img" src={DonutImg} sx={{ width: size, }}/>
			</CardContent>
		</CardStyled>
	);
};