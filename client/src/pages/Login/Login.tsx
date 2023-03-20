import { AccountCircleRounded, LockRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import { Grid, Divider, Typography, FormControl, TextField, InputAdornment, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { LinkUnstyled } from '../../components/LinkUnstyled';
import { MainButton } from '../../components/MainButton';
import RoutesEnum from '../../types/enums/RoutesEnum';
import { BoxArea, GridContainer } from './Login.styled';

export const Login: React.FunctionComponent = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [login, setLogin] = useState({
		email: '',
		password: '',
	});

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

				<FormControl sx={{ mt: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, }}>
					<TextField type="email" label="Email" onChange={(event): any => handleChangeLoginInput('email', event)} value={login.email}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AccountCircleRounded/>
								</InputAdornment>
							),
						}} style={{ width: '100%', }}/>

					<TextField type={showPassword ? 'text' : 'password'} label="Senha" onChange={(event): any => handleChangeLoginInput('password', event)} value={login.password}
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

					<MainButton style={{ width: '100%', }}>Continuar</MainButton>

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
			</GridContainer>
		</BoxArea>
	);
};