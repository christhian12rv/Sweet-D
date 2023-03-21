import { createTheme } from '@mui/material';
import { ptBR as dataGridPtBR } from '@mui/x-data-grid';
import { ptBR as corePtBR } from '@mui/material/locale';
import { ptBR } from '@mui/x-date-pickers';

interface InputColors {
	readOnly: string;
}

interface FormColors {
	input: InputColors;
}

interface CardShadows {
	main: string;
}

declare module '@mui/material/styles' {
	interface Palette {
    // link: Palette['primary'];
		form: FormColors;
  }
  interface PaletteOptions {
    // link?: PaletteOptions['primary'];
		form?: FormColors;
  }

  interface PaletteColor {
    darker: string;
		lighter: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
		lighter?: string;
  }

	interface CommonColors {
		dark: string;
		darker: string;
		light: string;
		lighter: string;
		green: string;
		greenDark: string;
		greenDarker: string;
	}


	interface Shadows {
		card: CardShadows;
	}
}

export default createTheme({
	palette: {
		primary: {
			// main: '#fabca5',
			// dark: '#c49280',
			// darker: '#8f6a5c',
			// light: '#ffcfbd',
			// lighter: '#ffdccf',
			main: '#ffb1c6',
			dark: '#ff94b1',
			darker: '#ff7c9f',
			light: '#ffd4e0',
			lighter: '#ffedf2',
		},
		// secondary: {
		// 	main: '#f35151',
		// 	dark: '#aa3838',
		// 	darker: '#682222',
		// },
		secondary: {
			main: '#cb365e',
			dark: '#c51645',
		},
		common: {
			black: 'rgb(22, 22, 22)',
			dark: 'rgb(75, 75, 75)',
			white: 'rgb(250, 250, 250)',
			light: 'rgb(131, 131, 131)',
			green: '#00e676',
			greenDark: '#00c853',
			greenDarker: '#009624',
		},
		divider: 'rgba(0, 0, 0, 0.1)',
		form: {
			input: {
				readOnly: 'rgba(0, 0, 0, 0.05)',
			},
		},
	},
},
ptBR,
dataGridPtBR,
corePtBR,
dataGridPtBR);