import { GlobalStyles } from '@mui/material';
import React from 'react';
import MultipleBubblesBackground from '../../assets/svg/MultipleBubblesBackground.svg';
import { BoxArea, GridContainer } from './Home.styled';
import { Lead } from './Lead';
import { Products } from './Products';
import { SizesSection } from './SizesSection';
import { DateVisualization } from './DateVisualization';

export const Home: React.FunctionComponent = () => {
	return (
		<>
			<BoxArea>
				<GlobalStyles styles={(): any => ({
					body: {
						backgroundImage: `url(${MultipleBubblesBackground})`,
						backgroundSize: '600px',
					},
				})}/>
				<GridContainer>
					<Lead/>
					<SizesSection/>
					<Products/>
					<DateVisualization/>
				</GridContainer>
			</BoxArea>
		</>
	);
};