interface ProductChoicesIngredientsType {
	type: string;
	ingredients: number[]
}

interface ProductChoicesType {
	id: number;
	size: number;
	ingredients: ProductChoicesIngredientsType[];
	quantity: number;
}

export default ProductChoicesType;
