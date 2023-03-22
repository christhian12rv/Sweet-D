const { v4: uuidv4 } = require("uuid");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const fs = require("fs");

const ProductModel = require("../models/Product/Product.model");
const ProductSizeModel = require('../models/Product/ProductSize.model');
const ProductIngredientTypeModel = require('../models/Product/ProductIngredientType.model');
const ProductIngredientModel = require('../models/Product/ProductIngredient.model');

exports.findBySlug = async slug => {
    const product = await ProductModel.findOne({ where: { slug } });
    return product;
};

exports.findAll = async (
    limit = -1,
    page = 1,
    columnSort = "id",
    directionSort = "asc",
    search = "",
    priceFilter,
    productNotFilterSlug
) => {
    const options = {
        ...(columnSort &&
            directionSort && {
                order:
                    columnSort != "random"
                        ? [[columnSort, directionSort]]
                        : Sequelize.literal("rand()")
            }),
        limit,
        offset: limit * (page - 1),
        where: {
            name: {
                [Op.like]: "%" + search + "%"
            },
            ...(priceFilter && {
                price: {
                    [Op.between]: [priceFilter[0] - 0.01, priceFilter[1]]
                }
            }),
            ...(productNotFilterSlug && {
                slug: {
                    [Op.not]: productNotFilterSlug
                }
            })
        }
    };

    const result = await ProductModel.findAndCountAll(options);
    const minPrice = await ProductModel.min("price");
    const maxPrice = await ProductModel.max("price");

    return {
        totalRows: result.count,
        products: result.rows,
        minPrice,
        maxPrice
    };
};

exports.create = async (
    name,
    description,
    slug,
    sizes,
    ingredientTypes,
    ingredients
    // photos
) => {
    // if ((!photos.length || photos.length < 1) && !Array.isArray(photos)) {
    //     let arrayAuxPhotos = [];
    //     arrayAuxPhotos.push(photos);
    //     photos = arrayAuxPhotos;
    // }

    // let newPhotos = [];

    // const uploadPath = __dirname + "/../public/img/product/";
    // for (const photo of photos) {
    //     await new Promise(resolve => {
    //         const imageName = uuidv4() + path.extname(photo.name);
    //         const imagePath = uploadPath + imageName;

    //         photo.mv(imagePath, async error => {
    //             if (error) throw error;
    //             else {
    //                 const cloudinaryResponse = await cloudinary.uploader.upload(
    //                     imagePath,
    //                     { folder: "Products/" }
    //                 );
    //                 newPhotos.push({
    //                     url: cloudinaryResponse.secure_url,
    //                     public_id: cloudinaryResponse.public_id
    //                 });

    //                 fs.unlinkSync(imagePath);
    //             }
    //             resolve(true);
    //         });
    //     });
    // }

    const product = await ProductModel.create({
        name,
        description,
        slug,
        // photos: JSON.stringify(newPhotos),
        photos: 'Teste',
    });

    const createdSizes = await Promise.all(sizes.map( async size => {
        return await ProductSizeModel.create({
            productId: product.id,
            name: size.name,
            price: size.price,
        });
    }));

    const createdIngredientTypes = await Promise.all(ingredientTypes.map( async ingredientType => {
        return await ProductIngredientTypeModel.create({
            productId: product.id,
            min: ingredientType.min,
            max: ingredientType.max,
            type: ingredientType.type,
        });
    }));

    const createdIngredients = await Promise.all(ingredients.map( async ingredient => {
        return await ProductIngredientModel.create({
            productId: product.id,
            name: ingredient.name,
            price: ingredient.price,
            type: ingredient.type,
        });
    }));

    return {
        ...product.dataValues,
        sizes: createdSizes,
        ingredients: createdIngredients,
        ingredientTypes: createdIngredientTypes,
    };
};

exports.update = async (
    id,
    name,
    description,
    price,
    storage,
    slug,
    extras,
    priceExtras,
    bodyPhotos,
    filesPhotos
) => {
    let arrayAuxPhotos = [];
    if (
        (!bodyPhotos.length || bodyPhotos.length < 1) &&
        !Array.isArray(bodyPhotos)
    ) {
        arrayAuxPhotos.push(bodyPhotos);
        bodyPhotos = arrayAuxPhotos;
    }

    if (
        (!filesPhotos.length || filesPhotos.length < 1) &&
        !Array.isArray(filesPhotos)
    ) {
        arrayAuxPhotos.push(filesPhotos);
        filesPhotos = arrayAuxPhotos;
    }

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
            ...(extras && { extras: JSON.stringify(extras) }),
            ...(priceExtras && { priceExtras: JSON.stringify(priceExtras) })
        },
        {
            where: { id }
        }
    );

    return newProduct;
};

exports.updateActive = async (id, active) => {
    const newProduct = await ProductModel.update({ active }, { where: { id } });
    return newProduct;
};
