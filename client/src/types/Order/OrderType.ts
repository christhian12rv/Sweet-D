import OrderProductType from './OrderProductType';

interface Order {
	id: number;
	userId: number;
	finished: boolean;
	createdAt: Date;
	updatedAt: Date | null;

	orderProducts: OrderProductType[];
}

export default Order;