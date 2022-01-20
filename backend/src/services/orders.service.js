const ProductModel = require("../models/Product.model");
const OrderModel = require("../models/Order.model");
const OrderProductModel = require("../models/OrderProduct.model");

exports.findAllByUser = async (userId) => {
    let orders = await OrderModel.findAll({ where: { userId } });
    orders = await Promise.all(orders.map(async (order) => {
        let orderProducts = await OrderProductModel.findAll({ where: { orderId: order.id } });

        orderProducts = await Promise.all(orderProducts.map(async (orderProduct) => {
            const product = await ProductModel.findByPk(orderProduct.productId);
            orderProduct.setDataValue("product", product);
            return orderProduct;
        }));

        order.setDataValue("orderProducts", orderProducts);
        return order;
    }));

    return orders;
}

exports.create = async (userId, products) => {
    let total = 0;
    for (const p of products) {
        const productFind = await ProductModel.findByPk(p.id);
        total += productFind.price * p.quantity;
    }

    const order = await OrderModel.create({
        userId: userId,
        total: total
    });

    products.forEach(async (product) => {
        const productFind = await ProductModel.findByPk(product.id);
        await OrderProductModel.create({
            orderId: order.id,
            productId: product.id,
            extras: product.extras.join(","),
            quantity: product.quantity,
            total: productFind.price * product.quantity
        })

        await ProductModel.update({ storage: productFind.storage - product.quantity }, { where: { id: product.id } });
    });

    return order;
}

exports.update = async (orderId, finished) => {
    const order = await OrderModel.update({ finished: finished }, { where: { id: orderId } });

    return order;
}