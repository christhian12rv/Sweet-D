import { CallRounded, CloseRounded, LockRounded } from '@mui/icons-material';
import { Box, capitalize, Divider, FormControl, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { BackdropLoading } from '../../components/BackdropLoading';
import { LinkUnstyled } from '../../components/LinkUnstyled';
import { MainButton } from '../../components/MainButton';
import { getUserAuth as getUserAuthAction } from '../../store/features/auth/auth.actions';
import { update as updateAction } from '../../store/features/users/users.actions';
import getRequestErrorByField from '../../store/utils/getRequestErrorByField';
import { useTypedSelector } from '../../store/utils/useTypedSelector';
import RoutesEnum from '../../types/enums/RoutesEnum';
import { useNonInitialEffect } from '../../utils/hooks/useNonInitialEffect';
import { useRequestVerification } from '../../utils/hooks/useRequestVerification';

export const Profile: React.FunctionComponent = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { user: loggedUser, } = useTypedSelector((state) => state.auth);
	const { request: usersRequest, loading: usersLoading, } = useTypedSelector((state) => state.users);
	
	const [updateButtonClicked, setUpdateButtonClicked] = useState(false);
	const [phoneFocus, setPhoneFocus] = useState(false);
	const [profile, setProfile] = useState({
		name: '',
		email: '',
		password: '12345678',
		phone: '',
	});

	useEffect(() => {
		setProfile({
			name: loggedUser?.name || '',
			email: loggedUser?.email || '',
			password: '12345678',
			phone: loggedUser?.phone || '',
		});
	}, [loggedUser]);

	useRequestVerification({
		request: usersRequest,
		successMessage: 'Informações pessoais atualizadas com sucesso',
	});

	useNonInitialEffect(() => {
		if (usersRequest?.success)
			dispatch(getUserAuthAction());
	}, [usersRequest]);

	const handleUpdateButtonClick = (): void => {
		dispatch(updateAction({
			name: profile.name,
			email: profile.email,
			phone: profile.phone,
		}));

		setUpdateButtonClicked(true);
	};

	const handleChangeProfileInput = (property, event): void => {
		let value = event.target.value;
		if (property === 'name')
			value = capitalize(value);

		setProfile({ ...profile, [property]: value, });
	};

	const handleChangeProfilePhoneInput = (property, event): void => {
		const value = formatIncompletePhoneNumber(event.target.value, 'BR');
		setProfile({ ...profile, [property]: value, });
	};

	const handleClickClearPhone = (): void => {
		setProfile({ ...profile, phone: '', });
	};
	
	const handleMouseDownClearPhone = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
	};

	const handleChangePhoneFocus = (value): void => {
		setPhoneFocus(value);
	};

	return (
		<Grid display="flex" flexDirection="column">
			<Typography variant="h4" mb={3}>Meu perfil</Typography>

			<Typography variant="h6">Informações pessoais</Typography>
			<Divider/>

			<Typography variant="body1" sx={(theme): object => ({ mt: 3, color: theme.palette.grey[600], })}>Usamos suas informações para lhe identificar na hora da entrega. Sinta-se a vontade para alterá-las.</Typography>

			<Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', mt: 6, maxWidth: '700px', p: 2, }}>
				<BackdropLoading open={usersLoading}/>

				<FormControl sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', gap: 2, width: '100%', }}>
					<Grid container spacing={2} sx={{ alignItems: 'flex-start', justifyContent: 'center', }}>
						<Grid item xs={6} sx={{ minWidth: '300px', }}>
							<TextField
								error={!!getRequestErrorByField(usersRequest, 'name')}
								helperText={getRequestErrorByField(usersRequest, 'name')?.message}
								type="text" label="Nome" onChange={(event): any => handleChangeProfileInput('name', event)} value={profile.name}
								style={{ width: '100%', }}/>
						</Grid>

						<Grid item xs={6} sx={{ minWidth: '300px', }}>
							<TextField
								error={!!getRequestErrorByField(usersRequest, 'email')}
								helperText={getRequestErrorByField(usersRequest, 'email')?.message}
								type="email" label="Email" onChange={(event): any => handleChangeProfileInput('email', event)} value={profile.email}
								style={{ width: '100%', }}/>
						</Grid>

						<Grid item xs={6} sx={{ minWidth: '300px', }}>
							<TextField disabled type="password" label="Senha" onChange={(event): any => handleChangeProfileInput('password', event)} value={profile.password}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LockRounded/>
										</InputAdornment>
									),
								}} style={{ width: '100%', }}/>
						</Grid>

						<Grid item xs={6} sx={{ minWidth: '300px', }}>
							<TextField
								error={!!getRequestErrorByField(usersRequest, 'phone')}
								helperText={getRequestErrorByField(usersRequest, 'phone')?.message}
								onFocus={(): any => handleChangePhoneFocus(true)} onBlur={(): any => handleChangePhoneFocus(false)} type="text" label="Telefone" onChange={(event): any => handleChangeProfilePhoneInput('phone', event)} value={profile.phone}
								inputProps={{ maxLength: 15, }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<CallRounded/>
										</InputAdornment>
									),
									endAdornment: phoneFocus ? (
										<InputAdornment position="end">
											<IconButton
												aria-label="clear phone"
												onClick={handleClickClearPhone}
												onMouseDown={handleMouseDownClearPhone}
												edge="end"
											>
												{<CloseRounded/>}
											</IconButton>
										</InputAdornment>
									) : <></>,
								}} style={{ width: '100%', }}/>
						</Grid>

						<Grid item display="flex" xs={6} sx={{ minWidth: '300px', mt: '-12px', }}>
							<LinkUnstyled to={RoutesEnum.LOGIN}>
								<Typography variant="body1" sx={(theme): any => ({
									color: theme.palette.primary.darker,
									'&:hover': {
										color: theme.palette.secondary.dark,
									},
									transition: 'all .25s',
								})}>
									&nbsp;Clique aqui
								</Typography>
							</LinkUnstyled>
							<Typography variant="body1" sx={(theme): object => ({ color: theme.palette.grey[800], })}>&nbsp;para alterar sua senha</Typography>
						</Grid>

						<Grid item xs={6} sx={{ minWidth: '300px', }}></Grid>
					</Grid>
		
					<Grid item xs={6} sx={{ minWidth: '300px', }}>
						<MainButton onClick={handleUpdateButtonClick} style={{ width: '295px', alignSelf: 'flex-start', }}>Atualizar</MainButton>
					</Grid>
				</FormControl>

			</Box>
		</Grid>
	);
};