const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const ProductModel = require("../models/Product.model");
const OrderModel = require("../models/Order.model");
const OrderProductModel = require("../models/OrderProduct.model");
const OrderAddress = require("../models/OrderAddress.model");
const UserModel = require("../models/User.model");
const AddressModel = require("../models/Address.model");

exports.findAll = async (
    limit = -1,
    page = 1,
    columnSort = "id",
    directionSort = "asc",
    search = ""
) => {
    const options = {
        ...(columnSort &&
            directionSort &&
            columnSort != "products" && {
                order: [[columnSort, directionSort]]
            }),
        limit,
        offset: limit * (page - 1),
        where: {
            id: {
                [Op.like]: "%" + search + "%"
            }
        }
    };

    const result = await OrderModel.findAndCountAll(options);

    result.rows = await Promise.all(
        result.rows.map(async r => {
            const user = await UserModel.findByPk(r.userId);
            r.setDataValue("user", user);
            let orderProducts = await OrderProductModel.findAll({
                where: { orderId: r.id }
            });
            orderProducts = await Promise.all(
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

    if (columnSort == "products") {
        result.rows.sort((a, b) => {
            a = JSON.stringify(a);
            a = JSON.parse(a);
            b = JSON.stringify(b);
            b = JSON.parse(b);
            if (
                a.orderProducts[0].product == b.orderProducts[0].product.name &&
                a.orderProducts[1] &&
                b.orderProducts[1]
            )
                return a.orderProducts[1].product.name.localeCompare(
                    b.orderProducts[1].product.name
                );

            return a.orderProducts[0].product.name.localeCompare(
                b.orderProducts[0].product.name
            );
        });

        if (directionSort == "desc") result.rows = result.rows.reverse();
    }

    return {
        totalRows: result.count,
        orders: result.rows
    };
};
exports.findByPk = async id => {
    let order = await OrderModel.findByPk(id);

    const user = await UserModel.findByPk(order.userId);
    order.setDataValue("user", user);

    const address = await OrderAddress.findOne({ where: { orderId: id } });
    order.setDataValue("address", address);

    let orderProducts = await OrderProductModel.findAll({
        where: { orderId: id }
    });

    let quantityTotal = 0;

    orderProducts = await Promise.all(
        orderProducts.map(async op => {
            const product = await ProductModel.findByPk(op.productId);
            op.setDataValue("product", product);

            quantityTotal += op.quantity;

            return op;
        })
    );
    order.setDataValue("quantityTotal", quantityTotal);

    order.setDataValue("orderProducts", orderProducts);

    return order;
};

exports.findAllByUser = async userId => {
    const result = await OrderModel.findAndCountAll({
        order: [["createdAt", "desc"]],
        where: { userId }
    });

    result.rows = await Promise.all(
        result.rows.map(async r => {
            let orderProducts = await OrderProductModel.findAll({
                where: { orderId: r.id }
            });

            let quantityTotal = 0;

            orderProducts = await Promise.all(
                orderProducts.map(async op => {
                    const product = await ProductModel.findByPk(op.productId);
                    op.setDataValue("product", product);

                    quantityTotal += op.quantity;
                    return op;
                })
            );
            r.setDataValue("orderProducts", orderProducts);

            r.setDataValue("quantityTotal", quantityTotal);

            return r;
        })
    );

    return {
        totalRows: result.count,
        orders: result.rows
    };
};

exports.create = async (userId, products) => {
    if (!userId)
        return {
            status: 401,
            errors: [
                {
                    msg: "Usuário não está logado"
                }
            ]
        };

    let address = await AddressModel.findOne({ where: { userId } });

    if (!address)
        return {
            status: 400,
            errors: [
                {
                    msg: "Você ainda não definiu um endereço. Vá ao seu perfil e adicione um endereço"
                }
            ]
        };

    address = JSON.stringify(address);
    address = JSON.parse(address);
    delete address.id;

    let total = 0;
    for (const p of products) {
        const productFind = await ProductModel.findByPk(p.id);

        const findExtras = productFind.extras && JSON.parse(productFind.extras);
        const findPriceExtras =
            productFind.extras && JSON.parse(productFind.priceExtras);

        const extrasPriceTotal = 0;
        product.extras &&
            product.extras.forEach(pr => {
                const eFindIndex = findExtras.indexOf(pr.e);
                extrasPriceTotal += parseFloat(findPriceExtras[eFindIndex]);
            });

        total += productFind.price * p.quantity + extrasPriceTotal;
    }

    const order = await OrderModel.create({
        userId: userId,
        total: total
    });

    for (const product of products) {
        const productFind = await ProductModel.findByPk(product.id);

        const findExtras = productFind.extras && JSON.parse(productFind.extras);
        const findPriceExtras =
            productFind.extras && JSON.parse(productFind.priceExtras);

        const priceExtras = [];
        const extrasPriceTotal = 0;
        product.extras &&
            product.extras.forEach(p => {
                const eFindIndex = findExtras.indexOf(p.e);
                extrasPriceTotal += parseFloat(findPriceExtras[eFindIndex]);
                priceExtras.push(parseFloat(findPriceExtras[eFindIndex]));
            });

        await OrderProductModel.create({
            orderId: order.id,
            productId: product.id,
            extras: JSON.stringify(product.extras),
            priceExtras,
            quantity: product.quantity,
            total: productFind.price * product.quantity + extrasPriceTotal
        });

        await ProductModel.update(
            { storage: productFind.storage - product.quantity },
            { where: { id: product.id } }
        );
    }

    await OrderAddress.create({ ...address, ...{ orderId: order.id } });

    return {
        status: 200,
        order,
        msg: "Pedido feito com sucesso. Aguarde e já iremos colocar seu pedido a caminho"
    };
};

exports.update = async (orderId, finished) => {
    const order = await OrderModel.update(
        { finished: finished },
        { where: { id: orderId } }
    );

    return order;
};

exports.updateFinish = async id => {
    await OrderModel.update({ finished: true }, { where: { id } });
};
