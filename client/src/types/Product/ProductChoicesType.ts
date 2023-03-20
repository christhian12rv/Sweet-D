import FillingIngredientType from './FillingIngredientType';
import PastaIngredientType from './PastaIngredientType';

interface ProductChoicesType {
	pastas?: number[],
	fillings?: number[],
	quantity: number,
	size: string,
}

export default ProductChoicesType;