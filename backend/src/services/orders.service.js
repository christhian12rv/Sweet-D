const ProductModel = require("../models/Product.model");
const OrderModel = require("../models/Order.model");
const OrderProductModel = require("../models/OrderProduct.model");
const OrderAddress = require("../models/OrderAddress.model");
const UserModel = require("../models/User.model");
const ProductModel = require("../models/Product.model");

exports.findAll = async (
    limit = -1,
    page = 1,
    columnSort = "id",
    directionSort = "asc",
    search = ""
) => {
    const options = {
        ...(columnSort &&
            directionSort && {
                order: [[columnSort, directionSort]]
            }),
        limit,
        offset: limit * (page - 1),
        where: {
            name: {
                [Op.like]: "%" + search + "%"
            }
        }
    };

    const result = await OrderModel.findAndCountAll(options);

    result.rows = await Promise.all(
        result.rows.map(async r => {
            const user = UserModel.findByPk(r.userId);
            r.setDataValue("user", user);

            const orderProducts = OrderProductModel.findAll({
                where: { orderId: r.id }
            });
            orderProducts = Promise.all(
                orderProducts.map(async op => {
                    const product = await ProductModel.findByPk(op.productId);
                    op.setDataValue("product", product);
                    return op;
                })
            );
            r.setDataValue("orderProducts", orderProducts);

            return r;
        })
    );

    return {
        totalRows: result.count,
        orders: result.rows
    };
};

exports.findAllByUser = async userId => {
    let orders = await OrderModel.findAll({ where: { userId } });
    orders = await Promise.all(
        orders.map(async order => {
            let orderProducts = await OrderProductModel.findAll({
                where: { orderId: order.id }
            });

            orderProducts = await Promise.all(
                orderProducts.map(async orderProduct => {
                    const product = await ProductModel.findByPk(
                        orderProduct.productId
                    );
                    orderProduct.setDataValue("product", product);
                    return orderProduct;
                })
            );

            order.setDataValue("orderProducts", orderProducts);
            return order;
        })
    );

    return orders;
};

exports.create = async (userId, products, address) => {
    let total = 0;
    for (const p of products) {
        const productFind = await ProductModel.findByPk(p.id);
        total += productFind.price * p.quantity;
    }

    const order = await OrderModel.create({
        userId: userId,
        total: total
    });

    for (const product of products) {
        const productFind = await ProductModel.findByPk(product.id);
        await OrderProductModel.create({
            orderId: order.id,
            productId: product.id,
            extras: JSON.stringify(product.extras),
            quantity: product.quantity,
            total: productFind.price * product.quantity
        });

        await ProductModel.update(
            { storage: productFind.storage - product.quantity },
            { where: { id: product.id } }
        );
    }
    console.log(address);
    await OrderAddress.create({ ...address, ...{ orderId: order.id } });

    return order;
};

exports.update = async (orderId, finished) => {
    const order = await OrderModel.update(
        { finished: finished },
        { where: { id: orderId } }
    );

    return order;
};
