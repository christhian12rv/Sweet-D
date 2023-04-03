import ProductIngredientCreateType from './ProductIngredientCreateType';
import ProductIngredientTypeCreateType from './ProductIngredientTypeCreateType';
import ProductSizeCreateType from './ProductSizeCreateType';

interface ProductCreateType {
	name: string;
	description: string;
	photos: File[];
	slug: string;

	sizes: ProductSizeCreateType[];
	ingredients: ProductIngredientCreateType[];
	ingredientTypes: ProductIngredientTypeCreateType[];
}

export default ProductCreateType;
