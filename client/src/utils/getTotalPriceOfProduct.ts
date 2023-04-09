import ProductChoicesType from '../types/Product/ProductChoicesType';
import ProductType from '../types/Product/ProductType';

export default (product: ProductType | undefined, productChoices: ProductChoicesType | undefined): number => {
	if (!product || !productChoices || product.id !== productChoices.id)
		return 0;

	let total = 0;

	total += product.sizes?.find(s => s.id === productChoices.size)?.price || 0;

	productChoices.ingredients.forEach(pci => {
		pci.ingredients.forEach(pciIngredients => {
			total += product.ingredients?.find(pi => pi.id === pciIngredients)?.price || 0;
		});
	});

	total *= productChoices.quantity;
	
	return total;
};