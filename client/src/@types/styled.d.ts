import 'styled-components';
import theme from '../styles/global';

type ThemeInterface = typeof theme;

declare module 'styled-components' {
	export type DefaultTheme = ThemeInterface
}