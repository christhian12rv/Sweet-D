import { GlobalStyles } from '@mui/material';
import React from 'react';
import MultipleBubblesBackground from '../../assets/svg/MultipleBubblesBackground.svg';
import MultipleWaves from '../../assets/svg/MultipleWaves';
import { BoxArea, GridContainer } from './Home.styled';

export const Home: React.FunctionComponent = () => {
	return (
		<>
			<BoxArea>
				<GlobalStyles styles={(theme): any => ({
					body: {
						backgroundImage: `url(${MultipleBubblesBackground})`,
						backgroundSize: '600px',
					},
				})}/>
				<GridContainer>
					<MultipleWaves/>
				</GridContainer>
			</BoxArea>
		</>
	);
};