import { AccountCircleRounded, LockRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import { Grid, Divider, Typography, FormControl, TextField, InputAdornment, IconButton, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { LinkUnstyled } from '../../components/LinkUnstyled';
import { MainButton } from '../../components/MainButton';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import { login as loginAction, clearRequest as clearRequestAction } from '../../store/features/auth/auth.actions';
import RoutesEnum from '../../types/enums/RoutesEnum';
import { useRequestVerification } from '../../utils/hooks/useRequestVerification';
import { BoxArea, GridContainer } from './Login.styled';
import getRequestErrorByField from '../../store/utils/getRequestErrorByField';
import { BackdropLoading } from '../../components/BackdropLoading';
import { AuthActionsTypes } from '../../store/features/auth/auth.types';

export const Login: React.FunctionComponent = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { request, loading, previousType, } = useTypedSelector((state) => state.auth);
	
	const [showPassword, setShowPassword] = useState(false);
	const [login, setLogin] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		dispatch(clearRequestAction());
	}, []);

	useRequestVerification({
		request,
		type: {
			expectedType: AuthActionsTypes.LOGIN_SUCCESS,
			actualType: previousType,
		},
		successNavigate: '/',
	});

	const handleLoginButtonClick = (): void => {
		dispatch(loginAction(login));
	};

	const handleChangeLoginInput = (property, event): void => {
		setLogin({ ...login, [property]: event.target.value, });
	};

	const handleClickShowPassword = (): void => {
		setShowPassword((show) => !show);
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
	};
	
	return (
		<BoxArea>
			<GridContainer>
				<Typography variant="h4">Login</Typography>
				<Divider sx={(theme): object => ({ backgroundColor: theme.palette.primary.main, width: '85px', height: '3px', mt: 1, mb: 3, })}/>

				<Typography variant="body1" sx={(theme): object => ({ color: theme.palette.grey[800], })}>Bem vindo de volta! Faça login para continuar.</Typography>
				<Grid display="flex">
					<Typography variant="body1" sx={(theme): object => ({ color: theme.palette.grey[800], })}>Você</Typography>
					<LinkUnstyled to={RoutesEnum.FORGOT_PASSWORD}>
						<Typography variant="body1" sx={(theme): any => ({
							color: theme.palette.primary.darker,
							'&:hover': {
								color: theme.palette.secondary.dark,
							},
							transition: 'all .25s',
						})}>
							&nbsp;esqueceu sua senha?
						</Typography>
					</LinkUnstyled>
				</Grid>

				<Box sx={{ position: 'relative', mt: 6, p: 2, }}>
					<BackdropLoading open={loading}/>

					<FormControl sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, }}>
						<TextField
							error={!!getRequestErrorByField(request, 'email')}
							helperText={getRequestErrorByField(request, 'email')?.message}
							type="email" label="Email" onChange={(event): any => handleChangeLoginInput('email', event)} value={login.email}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircleRounded/>
									</InputAdornment>
								),
							}} style={{ width: '100%', }}/>

						<TextField
							error={!!getRequestErrorByField(request, 'password')}
							helperText={getRequestErrorByField(request, 'password')?.message}
							type={showPassword ? 'text' : 'password'} label="Senha" onChange={(event): any => handleChangeLoginInput('password', event)} value={login.password}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockRounded/>
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
										</IconButton>
									</InputAdornment>
								),
							}} style={{ width: '100%', }}/>

						<MainButton onClick={handleLoginButtonClick} style={{ width: '100%', }}>Continuar</MainButton>

						<Grid display="flex">
							<Typography variant="body1" sx={(theme): object => ({ color: theme.palette.grey[800], })}>Não tem uma conta?</Typography>
							<LinkUnstyled to={RoutesEnum.REGISTER}>
								<Typography variant="body1" sx={(theme): any => ({
									color: theme.palette.primary.darker,
									'&:hover': {
										color: theme.palette.secondary.dark,
									},
									transition: 'all .25s',
								})}>
								&nbsp;Registrar
								</Typography>
							</LinkUnstyled>
						</Grid>
					</FormControl>
				</Box>
			</GridContainer>
		</BoxArea>
	);
};