import OrderProductType from '../types/Order/OrderProductType';

export default (orderProducts: OrderProductType[]): number =>
	orderProducts.reduce((total, orderProduct: OrderProductType) => {
		const ingredientsPrices = orderProduct.orderProductIngredients.reduce((sum, ingredient) => {
			return sum + ingredient.price;
		}, 0);
		return total + ((orderProduct.sizePrice + ingredientsPrices) * orderProduct.quantity);
	}, 0);