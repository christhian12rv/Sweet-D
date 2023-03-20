import FillingIngredientType from './FillingIngredientType';
import PastaIngredientType from './PastaIngredientType';

interface IngredientsType {
	id: number;
	pastas?: PastaIngredientType[];
	pastasMinQuantity?: number;
	pastasMaxQuantity?: number;
	fillings?: FillingIngredientType[];
	fillingsMinQuantity?: number;
	fillingsMaxQuantity?: number;
	createdAt: Date;
	updatedAt: Date | null;
}

export default IngredientsType;