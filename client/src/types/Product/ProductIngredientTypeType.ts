interface ProductIngredientTypeType {
	id: number;
	productId: number;
	min: number;
	max: number;
	type: string;
	createdAt: Date;
	updatedAt: Date | null;
}

export default ProductIngredientTypeType;