const { v4: uuidv4 } = require("uuid");
var path = require("path");
const datauri = require("datauri");
const cloudinary = require("cloudinary").v2;

const ProductModel = require("../models/Product.model");

exports.findByPk = async id => {
    const product = await ProductModel.findByPk(id);
    return product;
};

exports.findAll = async (
    limit = -1,
    page = 1,
    columnSort = "id",
    directionSort = "asc"
) => {
    const result = await ProductModel.findAndCountAll({
        limit,
        offset: limit * (page - 1),
        order: [[columnSort, directionSort]]
    });
    return { totalRows: result.count, products: result.rows };
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

    let newPhotos = [];

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
                    newPhotos.push({
                        url: cloudinaryResponse.secure_url,
                        public_id: cloudinaryResponse.public_id
                    });
                }
                resolve(true);
            });
        });
    }

    const product = await ProductModel.create({
        name,
        ...(description && { description }),
        photos: JSON.stringify(newPhotos),
        price,
        storage,
        slug,
        ...(extras && { extras: JSON.stringify(extras) })
    });
    return product;
};

exports.update = async (
    id,
    name,
    description,
    price,
    storage,
    slug,
    extras,
    bodyPhotos,
    filesPhotos
) => {
    console.log(filesPhotos);
    let arrayAuxPhotos = [];
    if (!bodyPhotos.length || bodyPhotos.length < 1) {
        arrayAuxPhotos.push(bodyPhotos);
        bodyPhotos = arrayAuxPhotos;
    }

    arrayAuxPhotos = [];
    if (!filesPhotos.length || filesPhotos.length < 1) {
        arrayAuxPhotos.push(filesPhotos);
        filesPhotos = arrayAuxPhotos;
    }

    console.log(filesPhotos);

    let newPhotos = [];

    const product = await ProductModel.findByPk(id);

    const JSONProductPhotos = JSON.parse(product.photos);

    await JSONProductPhotos.forEach(async productPhoto => {
        if (
            bodyPhotos.filter(
                b =>
                    b.url === productPhoto.url &&
                    b.public_id === productPhoto.public_id
            ).length < 1
        ) {
            await cloudinary.uploader.destroy(productPhoto.public_id);
        } else {
            newPhotos.push(productPhoto);
        }
    });

    const uploadPath = __dirname + "/../public/img/product/";
    for (const photo of filesPhotos) {
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
                    newPhotos.push({
                        url: cloudinaryResponse.secure_url,
                        public_id: cloudinaryResponse.public_id
                    });
                }
                resolve(true);
            });
        });
    }

    const newProduct = await ProductModel.update(
        {
            name,
            ...(description && { description }),
            photos: JSON.stringify(newPhotos),
            price,
            storage,
            slug,
            ...(extras && { extras: JSON.stringify(extras) })
        },
        {
            where: { id }
        }
    );

    return newProduct;
};
