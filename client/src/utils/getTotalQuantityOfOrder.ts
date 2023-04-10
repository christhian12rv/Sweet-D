import OrderProductType from '../types/Order/OrderProductType';

export default (orderProducts: OrderProductType[]): number =>
	orderProducts.reduce((total, orderProduct: OrderProductType) => {
		return total + orderProduct.quantity;
	}, 0);