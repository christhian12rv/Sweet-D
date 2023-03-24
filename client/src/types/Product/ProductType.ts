import ProductIngredientType from './ProductIngredientType';
import ProductIngredientTypeType from './ProductIngredientTypeType';
import ProductSizeType from './ProductSizeType';

interface ProductType {
	id: number;
	name: string;
	description: string;
	photos: string;
	slug: string;
	active: boolean;
	createdAt: Date;
	updatedAt: Date | null;

	sizes?: ProductSizeType[];
	ingredients?: ProductIngredientType[];
	ingredientTypes?: ProductIngredientTypeType[];
	// orderProducts?:
}

export default ProductType;
