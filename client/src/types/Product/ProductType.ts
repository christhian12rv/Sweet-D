import IngredientsType from './IngredientsType';

interface ProductType {
	id: number;
	name: string;
	description: string;
	photos: string;
	price: number;
	sizes: string[];
	slug: string;
	active: boolean;
	createdAt: Date;
	updatedAt: Date | null;

	ingredients?: IngredientsType;
}

export default ProductType;
