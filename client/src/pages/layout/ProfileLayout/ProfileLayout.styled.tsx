import { AppBar, AppBarProps, Box, CSSObject, Drawer, Grid, styled, Theme } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

export const BoxArea = styled(Box)(() => ({
	width: '100%',
	display: 'flex',
	minHeight: 400,
	alignItems: 'center',
	justifyContent: 'center',
	margin: '0 !important',
	padding: '0 !important',
}));

export const GridContainer = styled(Grid)(() => ({
	display: 'flex',
	flexDirection: 'column',
	maxWidth: 1280,
	width: '100%',
	margin: '0 !important',
	padding: '3em 0',
}));

export const DrawerHeader = styled('div')(({ theme, }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

type AppBarStyledProps = {
	open?: any;
} & AppBarProps;

export const AppBarStyled = styled(AppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarStyledProps>(({ theme, open, }) => ({
	zIndex: 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export const DrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open', })(
	({ theme, open, }) => ({
		zIndex: 1,
		position: 'sticky',
		top: '90px',
		left: 0,
		'& .MuiPaper-root': {
			width: 240,
			position: 'relative',
			transition: 'none !important',
		},
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	})
);