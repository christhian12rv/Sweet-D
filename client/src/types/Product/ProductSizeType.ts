interface ProductSizeType {
	id: number;
	productId: number;
	name: string;
	price: number;
	createdAt: Date;
	updatedAt: Date | null;
}

export default ProductSizeType;