const Sequelize = require("sequelize");
const dayjs = require("dayjs");
const { ProductModel, OrderModel, OrderProductModel, OrderProductIngredientModel, UserModel, } = require("../models");

exports.getDashboard = async () => {
    const now = dayjs();

    const totalQuantityOrders = await OrderModel.count();
    const totalQuantityProducts = await ProductModel.count();
    const totalQuantityUsers = await UserModel.count();

    let topSellingProducts = [];
    
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const orders = await OrderModel.findAll({
        include: [
            {
                model: OrderProductModel,
                as: 'orderProducts',
                include: [
                    {
                        model: OrderProductIngredientModel,
                        as: 'orderProductIngredients'
                    },
                    {
                        model: ProductModel,
                        as: 'product'
                    },
                ]
            },
        ]
    });

    const ordersPerYear = months.map(m => ({
        month: m,
        orders: [],
    }));

    let totalPriceOrders = 0;
    orders.forEach((order) => {
        order.orderProducts.forEach((orderProduct) => {
            let totalPriceOfProduct = orderProduct.sizePrice;
            
            orderProduct.orderProductIngredients.forEach((orderProductIngredients) => {
                totalPriceOfProduct += orderProductIngredients.price;
            })

            totalPriceOfProduct *= orderProduct.quantity;
            totalPriceOrders += totalPriceOfProduct;

            const topSellingProductIndex = topSellingProducts.findIndex(t => t.id === orderProduct.productId);
            if (topSellingProductIndex >= 0) {
                topSellingProducts[topSellingProductIndex].quantitySold += orderProduct.quantity;
            } else {
                topSellingProducts.push({
                    id: orderProduct.productId,
                    name: orderProduct.product.name,
                    photo: JSON.parse(orderProduct.product.photos)[0],
                    slug: orderProduct.product.slug,
                    quantitySold: 0,
                });
            }
        })

        if (dayjs(order.createdAt).get('year') === now.get('year'))
            ordersPerYear[dayjs(order.createdAt).get('month')].orders.push(order);
    });

    topSellingProducts = topSellingProducts.sort((a, b) => {
        return b.quantitySold - a.quantitySold;
    }).slice(0, 5);

    const users = await UserModel.findAll();

    const usersPerYear = months.map(m => ({
        month: m,
        users: [],
    }));

    users.forEach((user) => {
        if (dayjs(user.createdAt).get('year') === now.get('year'))
            usersPerYear[dayjs(user.createdAt).get('month')].users.push(user);
    })

    return {
        totalQuantityOrders,
        totalQuantityProducts,
        totalQuantityUsers,
        totalPriceOrders,
        ordersPerYear,
        usersPerYear,
        topSellingProducts,
    }
};