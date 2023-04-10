import OrderProductType from './OrderProductType';

interface OrderType {
	id: number;
	userId: number;
	finished: boolean;
	createdAt: Date;
	updatedAt: Date | null;

	orderProducts: OrderProductType[];
}

export default OrderType;