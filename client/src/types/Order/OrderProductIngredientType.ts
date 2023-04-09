interface OrderProductIngredientType {
	id: number;
	orderProductId: number;
	name: string;
	price: number;
	type: string;
	createdAt: Date;
	updatedAt: Date | null;
}

export default OrderProductIngredientType;