const ProductModel = require("../models/Product.model");

exports.create = async (sess, userId, product) => {
    if (!sess.products)
        sess.products = {};

    let productsArray = sess.products.products || [];

    const productFindOne = await ProductModel.findByPk(product.id);
    productsArray.push({
        userId: userId,
        id: product.id,
        extras: product.extras.join(","),
        quantity: product.quantity,
        total: product.quantity * productFindOne.price
    });

    sess.products = {
        products: productsArray,
        total: sess.products.total
    };

    let total = 0;
    for (const p of sess.products.products) {
        const productFind = await ProductModel.findByPk(p.id);
        total += p.quantity * productFind.price;
    }

    sess.products = { ...sess.products, total };
}

exports.update = async (sess, userId, product) => {
    if (!sess.products)
        sess.products = {};

    let productsArray = sess.products.products || [];

    const productFindOne = await ProductModel.findByPk(product.id);

    if (product.extras)
        product.extras = product.extras.join(',');

    if (product.quantity)
        product.total = product.quantity * productFindOne.price;

    productsArray = productsArray.map(p => {
        if (p.id === product.id) {
            return { ...p, ...product };
        }

        return p;
    });

    sess.products = {
        products: productsArray,
        total: sess.products.total
    };

    let total = 0;
    for (const p of sess.products.products) {
        const productFind = await ProductModel.findByPk(p.id);
        total += p.quantity * productFind.price;
    }

    sess.products = { ...sess.products, total };
}
