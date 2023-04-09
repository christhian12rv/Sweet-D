import OrderProductIngredientType from './OrderProductIngredientType';

interface OrderProductType {
	id: number;
	orderId: number;
	productId: number;
	sizeName: string;
	sizePrice: string;
	quantity: number;
	createdAt: Date;
	updatedAt: Date | null;

	orderProductIngredients: OrderProductIngredientType[];
}

export default OrderProductType;