import { CallRounded, CloseRounded, LockRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import { capitalize, Divider, FormControl, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import React, { useState } from 'react';
import { LinkUnstyled } from '../../components/LinkUnstyled';
import { MainButton } from '../../components/MainButton';
import RoutesEnum from '../../types/enums/RoutesEnum';

export const Profile: React.FunctionComponent = () => {
	const [phoneFocus, setPhoneFocus] = useState(false);
	const [profile, setProfile] = useState({
		name: 'Christhian Rezende Vieira',
		email: 'christhian11rv@hotmail.com',
		password: '12345678',
		phone: '(34) 98801-2345',
	});

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

			<FormControl sx={{ mt: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', gap: 2, width: '100%', maxWidth: '700px', }}>
				<Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'center', }}>
					<Grid item xs={6} sx={{ minWidth: '300px', }}>
						<TextField type="text" label="Nome" onChange={(event): any => handleChangeProfileInput('name', event)} value={profile.name}
							style={{ width: '100%', }}/>
					</Grid>

					<Grid item xs={6} sx={{ minWidth: '300px', }}>
						<TextField type="email" label="Email" onChange={(event): any => handleChangeProfileInput('email', event)} value={profile.email}
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
						<TextField onFocus={(): any => handleChangePhoneFocus(true)} onBlur={(): any => handleChangePhoneFocus(false)} type="text" label="Telefone" onChange={(event): any => handleChangeProfilePhoneInput('phone', event)} value={profile.phone}
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
					<MainButton style={{ width: '295px', alignSelf: 'flex-start', }}>Atualizar</MainButton>
				</Grid>
			</FormControl>
		</Grid>
	);
};