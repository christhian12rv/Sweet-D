import { CallRounded, LockRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import { Grid, Divider, Typography, FormControl, TextField, InputAdornment, IconButton, capitalize, Box } from '@mui/material';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { BackdropLoading } from '../../components/BackdropLoading';
import { LinkUnstyled } from '../../components/LinkUnstyled';
import { MainButton } from '../../components/MainButton';
import { register as registerAction, clearRequest as clearRequestAction } from '../../store/features/users/users.actions';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import RoutesEnum from '../../types/enums/RoutesEnum';
import getRequestErrorByField from '../../store/utils/getRequestErrorByField';
import { useRequestVerification } from '../../utils/hooks/useRequestVerification';
import { BoxArea, GridContainer } from './Register.styled';

export const Register: React.FunctionComponent = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { request, loading, } = useTypedSelector((state) => state.users);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		phone: '',
	});

	useEffect(() => {
		dispatch(clearRequestAction());
	}, []);

	useRequestVerification({
		request,
		successMessage: 'Cadastro feito com sucesso. Faça login para continuar',
		successNavigate: RoutesEnum.LOGIN,
	});

	const handleRegisterButtonClick = (): void => {
		dispatch(registerAction(user));
	};
	
	const handleChangeUserInput = (property, event): void => {
		let value = event.target.value;
		if (property === 'name')
			value = capitalize(value);

		setUser({ ...user, [property]: value, });
	};

	const handleChangeUserPhoneInput = (property, event): void => {
		const value = formatIncompletePhoneNumber(event.target.value, 'BR');
		setUser({ ...user, [property]: value, });
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
				
				<Box sx={{ position: 'relative', mt: 4, maxWidth: '630px', p: 2, }}>
					<BackdropLoading open={loading}/>
					
					<FormControl sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, }}>
						<Grid columnSpacing={2} rowSpacing={2} container sx={{ alignItems: 'flex-start', justifyContent: 'center', }}>
							<Grid item xs={6} sx={{ minWidth: '300px', }}>
								<TextField
									error={!!getRequestErrorByField(request, 'name')}
									helperText={getRequestErrorByField(request, 'name')?.message}
									type="text" label="Nome" onChange={(event): any => handleChangeUserInput('name', event)} value={user.name}
									style={{ width: '100%', }}/>
							</Grid>

							<Grid item xs={6} sx={{ minWidth: '300px', }}>
								<TextField
									error={!!getRequestErrorByField(request, 'email')}
									helperText={getRequestErrorByField(request, 'email')?.message}
									type="email" label="Email" onChange={(event): any => handleChangeUserInput('email', event)} value={user.email}
									style={{ width: '100%', }}/>
							</Grid>

							<Grid item xs={6} sx={{ minWidth: '300px', }}>
								<TextField
									error={!!getRequestErrorByField(request, 'password')}
									helperText={getRequestErrorByField(request, 'password')?.message}
									type={showPassword ? 'text' : 'password'} label="Senha" onChange={(event): any => handleChangeUserInput('password', event)} value={user.password}
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
								<TextField
									error={!!getRequestErrorByField(request, 'confirmPassword')}
									helperText={getRequestErrorByField(request, 'confirmPassword')?.message}
									type={showConfirmPassword ? 'text' : 'password'} label="Confirmar senha" onChange={(event): any => handleChangeUserInput('confirmPassword', event)} value={user.confirmPassword}
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
								<TextField
									error={!!getRequestErrorByField(request, 'phone')}
									helperText={getRequestErrorByField(request, 'phone')?.message}
									type="text" label="Telefone" onChange={(event): any => handleChangeUserPhoneInput('phone', event)} value={user.phone}
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
	
						<MainButton onClick={handleRegisterButtonClick} style={{ width: '295px', }}>Registrar</MainButton>
	
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
				</Box>
			</GridContainer>
		</BoxArea>
	);
};