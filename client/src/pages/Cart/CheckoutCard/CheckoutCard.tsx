import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { BackdropLoading } from '../../../components/BackdropLoading';
import { DateTimePicker } from '../../../components/DateTimePicker/DateTimePicker';
import { LinkStyled } from '../../../components/LinkUnstyled/LinkUnstyled.styled';
import { MainButton } from '../../../components/MainButton';
import { fetchCart as fetchCartAction, clearCart as clearCartAction } from '../../../store/features/cart/cart.actions';
import { createOrder as createOrderAction, clearRequest as clearRequestAction } from '../../../store/features/orders/orders.actions';
import { OrdersActionsTypes } from '../../../store/features/orders/orders.types';
import { useTypedSelector } from '../../../store/utils/useTypedSelector';
import RoutesEnum from '../../../types/enums/RoutesEnum';
import ProductChoicesType from '../../../types/Product/ProductChoicesType';
import ProductType from '../../../types/Product/ProductType';
import brlCurrencyFormatter from '../../../utils/brlCurrencyFormatter';
import getTotalPriceOfProduct from '../../../utils/getTotalPriceOfProduct';
import { useNonInitialEffect } from '../../../utils/hooks/useNonInitialEffect';
import { useRequestVerification } from '../../../utils/hooks/useRequestVerification';
import { MainCard } from './CheckoutCard.styled';

type Props = {
	fetchProductsLoading: boolean;
	products: ProductType[];
	productsChoices: ProductChoicesType[];
}

export const CheckoutCard: React.FunctionComponent<Props> = ({ fetchProductsLoading, products, productsChoices, }) => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { request, previousType, loading, } = useTypedSelector((state) => state.orders);
	const { user: loggedUser, } = useTypedSelector((state) => state.auth);

	const now = dayjs();
	const minTime = now.set('hour', 10);
	const maxTime = now.set('hour', 18).set('minutes', 30);
	const disableWeekends = (date): boolean => {
		return date.get('day') === 0 || date.get('day') === 6;
	};

	const onCheckoutClick = (dateTime: dayjs.Dayjs | null): void => {
		const now = dayjs();
		now.add(1, 'day');
		now.set('hour', 0).set('minutes', 0).set('second', 0);

		if (!dateTime || dateTime < now || dateTime.get('hour') < 10 || (dateTime.get('hour') > 18 && dateTime.get('minutes') > 30)) {
			enqueueSnackbar('Data ou horário inválidos', { variant : 'error', });
			return;
		}

		dispatch(createOrderAction(dateTime));
	};

	useEffect(() => {
		dispatch(clearRequestAction());
	}, []);

	useNonInitialEffect(() => {
		if (previousType === OrdersActionsTypes.CREATE_SUCCESS) {
			clearCartAction();
			dispatch(fetchCartAction());
		}
	}, [request]);

	useRequestVerification({
		request,
		successMessage: 'Pedido feito com sucesso',
		successNavigate: '/',
		type: {
			actualType: previousType,
			expectedType: OrdersActionsTypes.CREATE_SUCCESS,
		},
	});

	return (
		<MainCard sx={{ py: 2, }}>
			<BackdropLoading open={fetchProductsLoading || loading} />

			<Grid display="flex" flexDirection="column" gap={3} maxWidth="384px" sx={{ overflowX: 'auto', }}>
				<Typography variant="h6" sx={{ px: 1, }}>
					Total:&nbsp;
					{fetchProductsLoading ? 'R$ 0,00' : 
						brlCurrencyFormatter.format(productsChoices.reduce((sum, pc) => sum + getTotalPriceOfProduct(products.find(p => p.id === pc.id), pc), 0))
					}
				</Typography>

				{loggedUser ? (
					<DateTimePicker
						orientation="portrait"
						okButtonLabel="Fazer Pedido"
						onAccept={onCheckoutClick}
						shouldDisableDate={disableWeekends}
						minTime={minTime}
						maxTime={maxTime}
					/>
				) : (
					<LinkStyled to={RoutesEnum.LOGIN}>
						<MainButton style={{ width: '100%', }}>Login</MainButton>
					</LinkStyled>
				)}
				<Typography variant="body1" textAlign="justify" sx={{ px: 1, }}>Todas as nossas entregas são feitas no Bloco 1B na Universidade Federal de Uberlândia!</Typography>
				<Typography variant="body1" textAlign="justify" sx={{ px: 1, }}>Após a finalização do pedido, compareça no local na data e horário marcados para receber seu pedido. Nós iremos te mandar uma mensagem via whatsapp quando estivermos no local.</Typography>
				<Typography variant="body1" textAlign="justify" sx={{ px: 1, }}>Se você deseja receber o pedido em outro local ou precisar de alguma ajuda, entre em contato com o Rafael ou Fellype pelo whatsapp abaixo.</Typography>
			</Grid>
		</MainCard>
	);
};