import ProductIngredientType from '../ProductIngredientType';
import ProductIngredientTypeType from '../ProductIngredientTypeType';
import ProductSizeType from '../ProductSizeType';

interface ProductCreateType {
	name: string;
	description: string;
	photos: File[];
	slug: string;

	sizes: ProductSizeType[];
	ingredients: ProductIngredientType[];
	ingredientTypes: ProductIngredientTypeType[];
}

export default ProductCreateType;
