import { CallRounded, LockRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import { Grid, Divider, Typography, FormControl, TextField, InputAdornment, IconButton, capitalize } from '@mui/material';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import React, { useState } from 'react';
import { LinkUnstyled } from '../../components/LinkUnstyled';
import { MainButton } from '../../components/MainButton';
import RoutesEnum from '../../types/enums/RoutesEnum';
import { BoxArea, GridContainer } from './Register.styled';

export const Register: React.FunctionComponent = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [register, setRegister] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		phone: '',
	});
	
	const handleChangeRegisterInput = (property, event): void => {
		let value = event.target.value;
		if (property === 'name')
			value = capitalize(value);

		setRegister({ ...register, [property]: value, });
	};

	const handleChangeRegisterPhoneInput = (property, event): void => {
		const value = formatIncompletePhoneNumber(event.target.value, 'BR');
		setRegister({ ...register, [property]: value, });
	};
	
	const handleClickShowPassword = (): void => {
		setShowPassword((show) => !show);
	};
	
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
	};

	const handleClickShowConfirmPassword = (): void => {
		setShowConfirmPassword((show) => !show);
	};
	
	const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
	};
		
	return (
		<BoxArea>
			<GridContainer>
				<Typography variant="h4">Registrar</Typography>
				<Divider sx={(theme): object => ({ backgroundColor: theme.palette.primary.main, width: '138px', height: '3px', mt: 1, mb: 3, })}/>
	
				<Typography variant="body1" sx={(theme): object => ({ color: theme.palette.grey[800], })}>Olá! Registre sua conta para fazer seu pedido.</Typography>
				
				<FormControl sx={{ mt: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, maxWidth: '600px', }}>
					<Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'center', }}>
						<Grid item xs={6} sx={{ minWidth: '300px', }}>
							<TextField type="text" label="Nome" onChange={(event): any => handleChangeRegisterInput('name', event)} value={register.name}
								style={{ width: '100%', }}/>
						</Grid>

						<Grid item xs={6} sx={{ minWidth: '300px', }}>
							<TextField type="email" label="Email" onChange={(event): any => handleChangeRegisterInput('email', event)} value={register.email}
								style={{ width: '100%', }}/>
						</Grid>

						<Grid item xs={6} sx={{ minWidth: '300px', }}>
							<TextField type={showPassword ? 'text' : 'password'} label="Senha" onChange={(event): any => handleChangeRegisterInput('password', event)} value={register.password}
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
						</Grid>
		
						<Grid item xs={6} sx={{ minWidth: '300px', }}>
							<TextField type={showConfirmPassword ? 'text' : 'password'} label="Confirmar senha" onChange={(event): any => handleChangeRegisterInput('confirmPassword', event)} value={register.confirmPassword}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LockRounded/>
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle confirm password visibility"
												onClick={handleClickShowConfirmPassword}
												onMouseDown={handleMouseDownConfirmPassword}
												edge="end"
											>
												{showConfirmPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
											</IconButton>
										</InputAdornment>
									),
								}} style={{ width: '100%', }}/>
						</Grid>

						<Grid item xs={6} sx={{ minWidth: '300px', }}>
							<TextField type="text" label="Telefone" onChange={(event): any => handleChangeRegisterPhoneInput('phone', event)} value={register.phone}
								inputProps={{ maxLength: 15, }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<CallRounded/>
										</InputAdornment>
									),
								}} style={{ width: '100%', }}/>
						</Grid>
					</Grid>
	
					<MainButton style={{ width: '295px', }}>Registrar</MainButton>
	
					<Grid display="flex">
						<Typography variant="body1" sx={(theme): object => ({ color: theme.palette.grey[800], })}>Já possui uma conta?</Typography>
						<LinkUnstyled to={RoutesEnum.LOGIN}>
							<Typography variant="body1" sx={(theme): any => ({
								color: theme.palette.primary.darker,
								'&:hover': {
									color: theme.palette.secondary.dark,
								},
								transition: 'all .25s',
							})}>
								&nbsp;Login
							</Typography>
						</LinkUnstyled>
					</Grid>
				</FormControl>
			</GridContainer>
		</BoxArea>
	);
};