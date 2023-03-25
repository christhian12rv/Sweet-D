const ProductModel = require('./Product/Product.model');
const ProductSizeModel = require('./Product/ProductSize.model');
const ProductIngredientTypeModel = require('./Product/ProductIngredientType.model');
const ProductIngredientModel = require('./Product/ProductIngredient.model');
const OrderModel = require('./Order/Order.model');
const OrderProductModel = require('./Order/OrderProduct.model');
const OrderProductIngredientModel = require('./Order/OrderProductIngredient.model');
const UserModel = require('./User/User.model');
const ChangePasswordTokenModel = require('./User/ChangePasswordToken.model');

// Product
ProductModel.hasMany(ProductSizeModel, { as: "sizes" });
ProductModel.hasMany(ProductIngredientModel, { as: "ingredients" });
ProductModel.hasMany(ProductIngredientTypeModel, { as: "ingredientTypes" });
ProductModel.hasMany(OrderProductModel, { as: "orderProducts" });

ProductSizeModel.belongsTo(ProductModel, {
		foreignKey: 'productId',
		as: 'product',
});

ProductIngredientModel.belongsTo(ProductModel, {
		foreignKey: 'productId',
		as: 'product',
});

ProductIngredientTypeModel.belongsTo(ProductModel, {
		foreignKey: 'productId',
		as: 'product',
});


// Order
OrderModel.hasMany(OrderProductModel, { as: "orderProducts" });
OrderModel.belongsTo(UserModel, {
		foreignKey: 'userId',
		as: 'user',
});

OrderProductModel.belongsTo(OrderModel, {
		foreignKey: 'orderId',
		as: 'order',
});
OrderProductModel.belongsTo(ProductModel, {
		foreignKey: 'productId',
		as: 'product',
});
OrderProductModel.hasMany(OrderProductIngredientModel, { as: "orderProductIngredients" });

OrderProductIngredientModel.belongsTo(OrderProductModel, {
		foreignKey: 'orderProductId',
		as: 'orderProduct',
});


// User
UserModel.hasMany(OrderModel, { as: "orders" });
UserModel.hasOne(ChangePasswordTokenModel, {
		foreignKey: "userId",
});

ChangePasswordTokenModel.belongsTo(UserModel, {
		foreignKey: "userId",
});

module.exports = {
	ProductModel,
	ProductSizeModel,
	ProductIngredientTypeModel,
	ProductIngredientModel,
	OrderModel,
	OrderProductModel,
	OrderProductIngredientModel,
	UserModel,
	ChangePasswordTokenModel
};