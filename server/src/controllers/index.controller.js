const indexService = require("../services/index.service");

exports.getTotal = async (req, res) => {
    try {
        const { totalProducts, totalUsers, totalOrders } =
            await indexService.getTotal();
        res.json({
            status: 200,
            total: {
                products: totalProducts,
                users: totalUsers,
                orders: totalOrders
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
