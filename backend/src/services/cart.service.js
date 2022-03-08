const ProductModel = require("../models/Product.model");

exports.getAllData = async productsIds => {
    const products = [];

    for (const id of productsIds) {
        const product = await ProductModel.findByPk(id);
        products.push(product);
    }

    return products;
};

exports.create = async (sess, product) => {
    if (!sess.products) sess.products = {};

    let productsArray = sess.products.products || [];

    const productFindOne = await ProductModel.findByPk(product.id);
    productsArray.push({
        id: product.id,
        extras: product.extras,
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

        const extrasPriceTotal = 0;
        if (sess.products.extras.length) {
            const findExtras =
                productFind.extras && JSON.parse(productFind.extras);
            const findPriceExtras =
                productFind.extras && JSON.parse(productFind.priceExtras);

            sess.products.extras.forEach((e, i) => {
                const eFindIndex = findExtras.indexOf(e);
                extrasPriceTotal += parseFloat(findPriceExtras[eFindIndex]);
            });
        }

        total += p.quantity * productFind.price + extrasPriceTotal;
    }

    sess.products = { ...sess.products, total };

    return productFindOne;
};

exports.update = async (sess, product) => {
    if (!sess.products) sess.products = {};

    let productsArray = sess.products.products || [];

    const productFindOne = await ProductModel.findByPk(product.id);

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

        const extrasPriceTotal = 0;
        if (sess.products.extras.length) {
            const findExtras =
                productFind.extras && JSON.parse(productFind.extras);
            const findPriceExtras =
                productFind.extras && JSON.parse(productFind.priceExtras);

            sess.products.extras.forEach((e, i) => {
                const eFindIndex = findExtras.indexOf(e);
                extrasPriceTotal += parseFloat(findPriceExtras[eFindIndex]);
            });
        }

        total += p.quantity * productFind.price + extrasPriceTotal;
    }

    sess.products = { ...sess.products, total };

    return product;
};

exports.remove = async (sess, id) => {
    if (!sess.products) sess.products = {};

    let productsArray = sess.products.products || [];

    productsArray = sess.products.products.filter(p => p.id != id);

    sess.products = {
        products: productsArray,
        total: sess.products.total
    };

    let total = 0;
    for (const p of sess.products.products) {
        const productFind = await ProductModel.findByPk(p.id);

        const extrasPriceTotal = 0;
        if (sess.products.extras.length) {
            const findExtras =
                productFind.extras && JSON.parse(productFind.extras);
            const findPriceExtras =
                productFind.extras && JSON.parse(productFind.priceExtras);

            sess.products.extras.forEach((e, i) => {
                const eFindIndex = findExtras.indexOf(e);
                extrasPriceTotal += parseFloat(findPriceExtras[eFindIndex]);
            });
        }

        total += p.quantity * productFind.price + extrasPriceTotal;
    }

    sess.products = { ...sess.products, total };

    return sess;
};

exports.clear = async sess => {
    sess.products = undefined;
};
