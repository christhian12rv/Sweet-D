const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { UserModel, OrderModel, OrderProductModel, OrderProductIngredientModel, ProductModel, ProductSizeModel,
    ProductIngredientModel, ProductIngredientTypeModel, } = require("../models");

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

exports.findByPk = async (id) => {
    const order = await OrderModel.findOne({
        where: {
            id,
        },
        include: [
            {
                model: OrderProductModel,
                as: 'orderProducts',
                include: [
                    {
                        model: OrderProductIngredientModel,
                        as: 'orderProductIngredients'
                    },
                ]
            },
        ],
    });

    return order;
};

exports.findAllByUser = async (
    userId,
    limit = -1,
    page = 1,
    columnSort = "id",
    directionSort = "asc",
) => {
    const options = {
        order: [[columnSort === "total" || columnSort === "totalQuantity" ? "id" : columnSort, directionSort]],
        limit,
        offset: limit * (page - 1),
        where: {
            userId,
        },
        include: [
            {
                model: OrderProductModel,
                as: 'orderProducts',
                include: [
                    {
                        model: OrderProductIngredientModel,
                        as: 'orderProductIngredients'
                    },
                ]
            },
        ]
    };

    let orders = await OrderModel.findAll(options);

    if (columnSort === "total") {
        orders = orders.sort((a, b) => {
            const totalA = a.orderProducts.reduce((total, orderProduct) => {
                const ingredientsPrices = orderProduct.orderProductIngredients.reduce((sum, ingredient) => {
                    return sum + ingredient.price;
                }, 0);
                return total + ((orderProduct.sizePrice + ingredientsPrices) * orderProduct.quantity);
            }, 0);

            const totalB = b.orderProducts.reduce((total, orderProduct) => {
                const ingredientsPrices = orderProduct.orderProductIngredients.reduce((sum, ingredient) => {
                    return sum + ingredient.price;
                }, 0);
                return total + ((orderProduct.sizePrice + ingredientsPrices) * orderProduct.quantity);
            }, 0)

            if (directionSort === "asc")
                return totalA - totalB;

            return totalB - totalA;
        });
    } else if (columnSort === "totalQuantity") {
        orders = orders.sort((a, b) => {
            const totalQuantityA = a.orderProducts.reduce((totalQuantity, orderProduct) => totalQuantity + orderProduct.quantity, 0);
            const totalQuantityB = b.orderProducts.reduce((totalQuantity, orderProduct) => totalQuantity + orderProduct.quantity, 0);
            
            if (directionSort === "asc")
                return totalQuantityA - totalQuantityB;

            return totalQuantityB - totalQuantityA;
        })
    }

    const totalRows = await OrderModel.count();
    return {
        totalRows,
        orders,
    };
};

exports.create = async (userId, productsChoices, date) => {
    const order = await OrderModel.create({
        userId,
        date,
    });

    await Promise.all(productsChoices.map(async (pc) => {
        const product = await ProductModel.findOne({
            where: {
                id: pc.id
            },
            include: [
                {
                    model: ProductSizeModel,
                    as: 'sizes'
                },
                {
                    model: ProductIngredientModel,
                    as: 'ingredients'
                }
            ],
        });

        const productSize = product.sizes.find(s => s.id === pc.size);

        const orderProduct = await OrderProductModel.create({
            orderId: order.id,
            productId: pc.id,
            sizeName: productSize.name,
            sizePrice: productSize.price,
            quantity: pc.quantity,
        });

        await Promise.all(pc.ingredients.map(async (ingredient) => {
            await Promise.all(ingredient.ingredients.map(async (i) => {
                
                const productIngredient = product.ingredients.find(pi => pi.id === i);

                await OrderProductIngredientModel.create({
                    orderProductId: orderProduct.id,
                    name: productIngredient.name,
                    price: productIngredient.price,
                    type: productIngredient.type,
                });
            }))
        }))
    }))

    return await OrderModel.findOne({
        where: {
            id: order.id,
        },
        include: [
            {
                model: OrderProductModel,
                as: 'orderProducts',
                include: [
                    {
                        model: OrderProductIngredientModel,
                        as: 'orderProductIngredients'
                    }
                ]
            },
        ],
    })
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
