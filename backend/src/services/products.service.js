const { v4: uuidv4 } = require('uuid');
var path = require('path');

const ProductModel = require("../models/Product.model");

exports.findByPk = async (id) => {
    const product = await ProductModel.findByPk(id);
    return product;
}

exports.findAll = async () => {
    const products = await ProductModel.findAll();
    return products;
}

exports.create = async (name, description, price, storage, slug, photos) => {
    const uploadPath = __dirname + '/../public/img/product/';
    const photosArray = [];
    for (const photo of photos) {
        await new Promise((resolve) => {
            const imageName = uuidv4() + path.extname(photo.name);
            const imagePath = uploadPath + imageName;
            photo.mv(imagePath, function (error) {
                if (error)
                    throw error;
                else {
                    photosArray.push(imageName);
                }
                resolve(true);
            });
        })
    }

    const product = await ProductModel.create({
        name,
        description,
        photos: photosArray.join(","),
        price,
        storage,
        slug
    });
    return product;
}

exports.update = async (body, photos) => {
    const photosArray = [];
    if (photos) {
        const uploadPath = __dirname + '/../public/img/product/';
        for (const photo of photos) {
            await new Promise((resolve) => {
                const imageName = uuidv4() + path.extname(photo.name);
                const imagePath = uploadPath + imageName;
                photo.mv(imagePath, function (error) {
                    if (error)
                        throw error;
                    else {
                        photosArray.push(imageName);
                    }
                    resolve(true);
                });
            })
        }
    }

    const dataChange = { ...body, photos: photosArray.join(",") };

    const product = await ProductModel.update(dataChange, { where: { id: body.id } });

    return product;
}