interface ProductIngredientType {
	id: number;
	productId: number;
	name: string;
	price: number;
	type: string;
	createdAt: Date;
	updatedAt: Date | null;
}

export default ProductIngredientType;