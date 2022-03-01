const { v4: uuidv4 } = require("uuid");
var path = require("path");
const datauri = require("datauri");
const cloudinary = require("cloudinary").v2;

const ProductModel = require("../models/Product.model");

exports.findByPk = async id => {
    const product = await ProductModel.findByPk(id);
    return product;
};

exports.findAll = async () => {
    const products = await ProductModel.findAll();
    return products;
};

exports.create = async (
    name,
    description,
    price,
    storage,
    slug,
    extras,
    photos
) => {
    if (!photos.length || photos.length < 1) {
        let arrayAuxPhotos = [];
        arrayAuxPhotos.push(photos);
        photos = arrayAuxPhotos;
    }

    let photosNames = [];

    const uploadPath = __dirname + "/../public/img/product/";
    for (const photo of photos) {
        await new Promise(resolve => {
            const imageName = uuidv4() + path.extname(photo.name);
            const imagePath = uploadPath + imageName;
            photo.mv(imagePath, async error => {
                if (error) throw error;
                else {
                    const cloudinaryResponse = await cloudinary.uploader.upload(
                        imagePath,
                        { folder: "Products/" }
                    );
                    photosNames.push(cloudinaryResponse.secure_url);
                }
                resolve(true);
            });
        });
    }

    const product = await ProductModel.create({
        name,
        ...(description && { description }),
        photos: JSON.stringify(photosNames),
        price,
        storage,
        slug,
        ...(extras && { extras: JSON.stringify(extras) })
    });
    return product;
};

exports.update = async (body, photos) => {
    const photosArray = [];
    if (photos) {
        const uploadPath = __dirname + "/../public/img/product/";
        for (const photo of photos) {
            await new Promise(resolve => {
                const imageName = uuidv4() + path.extname(photo.name);
                const imagePath = uploadPath + imageName;
                photo.mv(imagePath, function (error) {
                    if (error) throw error;
                    else {
                        photosArray.push(imageName);
                    }
                    resolve(true);
                });
            });
        }
    }

    const dataChange = {
        ...body,
        ...(photosArray.length && { photos: photosArray.join(",") })
    };

    const product = await ProductModel.update(dataChange, {
        where: { id: body.id }
    });

    return product;
};
