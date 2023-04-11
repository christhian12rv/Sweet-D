const Sequelize = require("sequelize");
const dayjs = require("dayjs");
const { ProductModel, OrderModel, OrderProductModel, OrderProductIngredientModel, UserModel, } = require("../models");

// exports.getTotal = async () => {
//     const dateTodayStart = new Date().setHours(0, 0, 0, 0);
//     const dateNow = new Date();

//     const totalProducts = await ProductModel.count();
//     const totalUsers = await UserModel.count();
//     const totalOrders = await OrderModel.count();
//     const totalOrdersToday = await OrderModel.count({
//         where: {
//             createdAt: {
//                 [Op.gt]: dateTodayStart,
//                 [Op.lt]: dateNow
//             }
//         }
//     });

//     let totalPriceOrders = await OrderModel.findAll({
//         attributes: [
//             [Sequelize.fn("SUM", Sequelize.col("total")), "totalPriceOrders"]
//         ]
//     });

//     totalPriceOrders = JSON.stringify(totalPriceOrders);
//     totalPriceOrders = JSON.parse(totalPriceOrders);

//     let totalPriceOrdersToday = await OrderModel.findAll({
//         attributes: [
//             [
//                 Sequelize.fn("SUM", Sequelize.col("total")),
//                 "totalPriceOrdersToday"
//             ]
//         ],
//         where: {
//             createdAt: {
//                 [Op.gt]: dateTodayStart,
//                 [Op.lt]: dateNow
//             }
//         }
//     });

//     totalPriceOrdersToday = JSON.stringify(totalPriceOrdersToday);
//     totalPriceOrdersToday = JSON.parse(totalPriceOrdersToday);

//     let ordersTotalPerMonth = [];
//     let ordersTotalPricePerMonth = [];

//     let month = 1;
//     while (month < 13) {
//         const currMonthQty = await OrderModel.findAndCountAll({
//             attributes: ["id"],
//             where: {
//                 createdAt: {
//                     [Op.gte]: moment("0101", "MMDD")
//                         .tz("America/Sao_Paulo")
//                         .add(month - 1, "months")
//                         .toDate(),
//                     [Op.lt]: moment("0101", "MMDD")
//                         .tz("America/Sao_Paulo")
//                         .add(month, "months")
//                         .toDate()
//                 }
//             }
//         });

//         let currMonthPrice = await OrderModel.findAll({
//             attributes: [
//                 [
//                     Sequelize.fn("SUM", Sequelize.col("total")),
//                     "totalPriceOrdersMonth"
//                 ]
//             ],
//             where: {
//                 createdAt: {
//                     [Op.gte]: moment("0101", "MMDD")
//                         .tz("America/Sao_Paulo")
//                         .add(month - 1, "months")
//                         .toDate(),
//                     [Op.lt]: moment("0101", "MMDD")
//                         .tz("America/Sao_Paulo")
//                         .add(month, "months")
//                         .toDate()
//                 }
//             }
//         });

//         currMonthPrice = JSON.stringify(currMonthPrice);
//         currMonthPrice = JSON.parse(currMonthPrice);

//         ordersTotalPerMonth.push(currMonthQty);
//         ordersTotalPricePerMonth.push(
//             currMonthPrice[0].totalPriceOrdersMonth
//                 ? currMonthPrice[0].totalPriceOrdersMonth
//                 : 0
//         );

//         month++;
//     }

//     ordersTotalPerMonth = ordersTotalPerMonth.map(r => r.count);

//     let ordersTotalCurrentMonth = [];
//     let ordersTotalPriceCurrentMonth = [];

//     let daysIsMonth = moment().tz("America/Sao_Paulo").daysInMonth();
//     let currentYear = moment().tz("America/Sao_Paulo").year();
//     let currentMonth = moment().tz("America/Sao_Paulo").month();
//     let day = 1;
//     while (day <= daysIsMonth) {
//         let today = moment().tz("America/Sao_Paulo").toDate();
//         today.setFullYear(currentYear);
//         today.setMonth(currentMonth);
//         today.setDate(day);
//         today.setHours(0);
//         today.setMinutes(0);
//         today.setSeconds(0);
//         today.setMilliseconds(0);

//         let tomorrow = moment().tz("America/Sao_Paulo").toDate();
//         tomorrow.setFullYear(currentYear);
//         tomorrow.setMonth(currentMonth);
//         tomorrow.setDate(day + 1);
//         tomorrow.setHours(0);
//         tomorrow.setMinutes(0);
//         tomorrow.setSeconds(0);
//         tomorrow.setMilliseconds(0);

//         const currDay = await OrderModel.findAndCountAll({
//             where: {
//                 createdAt: {
//                     [Op.gte]: today,
//                     [Op.lt]: tomorrow
//                 }
//             }
//         });

//         let currDayPrice = await OrderModel.findAll({
//             attributes: [
//                 [
//                     Sequelize.fn("SUM", Sequelize.col("total")),
//                     "totalPriceOrdersDay"
//                 ]
//             ],
//             where: {
//                 createdAt: {
//                     [Op.gte]: today,
//                     [Op.lt]: tomorrow
//                 }
//             }
//         });

//         currDayPrice = JSON.stringify(currDayPrice);
//         currDayPrice = JSON.parse(currDayPrice);

//         ordersTotalCurrentMonth.push(currDay);
//         ordersTotalPriceCurrentMonth.push(
//             currDayPrice[0].totalPriceOrdersDay
//                 ? currDayPrice[0].totalPriceOrdersDay
//                 : 0
//         );

//         day++;
//     }

//     ordersTotalCurrentMonth = ordersTotalCurrentMonth.map(r => r.count);

//     return {
//         totalProducts,
//         totalUsers,
//         totalOrders,
//         totalOrdersToday,
//         totalPriceOrders: totalPriceOrders[0].totalPriceOrders,
//         totalPriceOrdersToday: totalPriceOrdersToday[0].totalPriceOrdersToday,
//         ordersTotalPerMonth,
//         ordersTotalCurrentMonth,
//         ordersTotalPricePerMonth,
//         ordersTotalPriceCurrentMonth
//     };
// };

exports.getDashboard = async () => {
    const now = dayjs();

    const totalQuantityOrders = await OrderModel.count();
    const totalQuantityProducts = await ProductModel.count();
    const totalQuantityUsers = await UserModel.count();
    
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
        })

        if (dayjs(order.createdAt).get('year') === now.get('year'))
            ordersPerYear[dayjs(order.createdAt).get('month')].orders.push(order);
    });


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
    }
};