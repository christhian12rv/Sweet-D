const ProductModel = require("../models/Product.model");
const UserModel = require("../models/User.model");
const OrderModel = require("../models/Order.model");

exports.getTotal = async () => {
    const totalProducts = await ProductModel.count();
    const totalUsers = await UserModel.count();
    const totalOrders = await OrderModel.count();

    return { totalProducts, totalUsers, totalOrders };
};
