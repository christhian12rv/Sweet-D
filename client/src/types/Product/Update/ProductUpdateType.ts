import ProductIngredientUpdateType from './ProductIngredientUpdateType';
import ProductIngredientTypeUpdateType from './ProductIngredientTypeUpdateType';
import ProductSizeUpdateType from './ProductSizeUpdateType';

interface ProductUpdateType {
	id: number;
	name: string;
	description: string;
	photos: File[];
	slug: string;
	active: boolean;

	sizes: ProductSizeUpdateType[];
	ingredients: ProductIngredientUpdateType[];
	ingredientTypes: ProductIngredientTypeUpdateType[];
}

export default ProductUpdateType;
