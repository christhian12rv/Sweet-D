const indexService = require("../services/index.service");

exports.getTotal = async (req, res) => {
    try {
        const {
            totalProducts,
            totalUsers,
            totalOrders,
            totalOrdersToday,
            totalPriceOrders,
            totalPriceOrdersToday,
            ordersTotalPerMonth,
            ordersTotalCurrentMonth,
            ordersTotalPricePerMonth,
            ordersTotalPriceCurrentMonth
        } = await indexService.getTotal();

        res.json({
            status: 200,
            total: {
                products: totalProducts,
                users: totalUsers,
                orders: totalOrders,
                ordersToday: totalOrdersToday,
                totalPriceOrders,
                totalPriceOrdersToday,
                ordersTotalPerMonth,
                ordersTotalCurrentMonth,
                ordersTotalPricePerMonth,
                ordersTotalPriceCurrentMonth
            },
            msg: "Total buscado com sucesso"
        });
    } catch (error) {
        res.json({
            status: 500,
            msg: "Houve um erro interno ao procurar total"
        });
    }
};
