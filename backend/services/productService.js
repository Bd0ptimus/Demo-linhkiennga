import bcrypt from "bcryptjs";
import db from "../models/index";
import sequelize, { Op } from "sequelize";
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config();
const salt = bcrypt.genSaltSync(10);
const {
    Product,
    Product_Categories,
    Product_Attachment
} = require("../models");
let createProductCategory = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataResponse = {};
            // console.log(data.listFile[0]);
            let newCate = await db.Product_Categories.create({
                name: data.name,
                pid: JSON.parse(data.pid),
                logoPath: data.listFile[0] ? '/category-logo/' + data.listFile[0].filename : '',
            });

            if (newCate) {
                dataResponse.errCode = 0;
                dataResponse.newCate = newCate;
                dataResponse.message = 'Create complete';

            } else {
                dataResponse.errCode = 2;
                dataResponse.message = 'Can not create';
            }
            resolve(dataResponse);
        } catch (e) {
            reject(e);
        }
    });
}

let updateProductCategory = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);

            let dataResponse = {};
            if (data.pid == data.id) {
                dataResponse.errCode = 2;
                dataResponse.message = 'pid could not be accepted';
                resolve(dataResponse);

            }
            // let logoPathOption = data.fileKept ? '' : { logoPath: data.listFile[0] ? '/category-logo/' + data.listFile[0].filename : '' };
            let productCategory = false;
            if (!JSON.parse(data.fileKept)) {
                productCategory = await db.Product_Categories.update({
                    name: data.name,
                    pid: JSON.parse(data.pid),
                    logoPath: data.listFile[0] ? '/category-logo/' + data.listFile[0].filename : '',
                }, {
                    where: { id: data.id }
                });
            } else {
                productCategory = await db.Product_Categories.update({
                    name: data.name,
                    pid: JSON.parse(data.pid),
                }, {
                    where: { id: data.id }
                });
            }

            let cateAfterUpdate = await db.Product_Categories.findByPk(data.id);
            if (productCategory) {
                dataResponse.errCode = 0;
                dataResponse.productCategory = cateAfterUpdate;
                dataResponse.message = 'Create complete';
            } else {
                dataResponse.errCode = 3;
                dataResponse.message = 'category not existed';
            }
            resolve(dataResponse);

        } catch (e) {
            reject(e);
        }
    });
}

let deleteProductCategory = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let categoryCondition = JSON.parse(data.id);
            let dataResponse = {};
            db.Product_Categories.update({
                pid: null,
            }, {
                where: { pid: categoryCondition },
            })
            // db.Product.destroy({
            //     where: { categoryId: categoryCondition }

            // });
            db.Product_Categories.destroy({
                where: { id: categoryCondition }
            });
            dataResponse.errCode = 0;
            dataResponse.message = 'delete complete';

            resolve(dataResponse);
        } catch (e) {
            reject(e);
        }
    });
}

let createProduct = async (data) => {
    return new Promise(async (resolve, reject) => {
        const t = await db.sequelize.transaction();
        try {
            let dataResponse = {};

            const product = await db.Product.create({
                name: data.name,
                categoryId: JSON.parse(data.categoryId),
                price: JSON.parse(data.price),
                wholeSalePrice: JSON.parse(data.wholeSalePrice),

                des: data.des,
                note: data.note
            }, { transaction: t });
            let destinationPath = '';
            // data.listFiles.forEach(file => {
            //     console.log('File data : ', file);
            //     destinationPath = `uploads/products/${file.file.filename}`;
            //     fs.renameSync(file.file.path, destinationPath);
            // });
            for (const file of data.listFiles) {
                await db.Product_Attachment.create({
                    productId: product.id,
                    path: '/product-images/' + file.filename,
                }, { transaction: t });
            }


            await t.commit();
            if (product) {
                dataResponse.errCode = 0;
                dataResponse.newProduct = product;
                dataResponse.message = 'Create complete';

            } else {
                dataResponse.errCode = 2;
                dataResponse.message = 'Can not create';
            }
            resolve(dataResponse);
        } catch (e) {
            console.log('----> ERROR : ', e);
            await t.rollback();
            reject(e);
        }
    });
}


let updateProduct = async (data) => {
    return new Promise(async (resolve, reject) => {
        const t = await db.sequelize.transaction();
        try {
            let dataResponse = {};
            let productId = JSON.parse(data.id);
            let productUpdate = await db.Product.update({
                name: data.name,
                categoryId: JSON.parse(data.categoryId),
                wholeSalePrice: Number(data.wholeSalePrice),
                price: Number(data.price),
                des: data.des,
                note: data.note
            }, {
                where: { id: productId }
            }, { transaction: t });
            if (data.fileKept != undefined) {
                data.fileKept.forEach((element, index) => {
                    let dataSplit = element.split('/');
                    data.fileKept[index] = '/' + dataSplit[3] + '/' + dataSplit[4];
                });
                db.Product_Attachment.destroy({
                    where: {
                        productId: productId,
                        [Op.not]: {
                            path: data.fileKept,
                        },
                    }
                }, { transaction: t })
            } else {
                db.Product_Attachment.destroy({
                    where: {
                        productId: productId,
                    }
                }, { transaction: t })
            }

            for (const file of data.listFiles) {
                await db.Product_Attachment.create({
                    productId: productId,
                    path: '/product-images/' + file.filename,
                }, { transaction: t });
            }
            await t.commit();
            // let productAfterUpdate = await db.Product.findByPk(data.id);

            if (productUpdate) {
                dataResponse.errCode = 0;
                // dataResponse.product = productAfterUpdate;
                dataResponse.message = 'Create complete';

            } else {
                dataResponse.errCode = 2;
                dataResponse.message = 'Can not create';
            }
            resolve(dataResponse);
        } catch (e) {
            console.log('----> ERROR : ', e);

            await t.rollback();

            reject(e);
        }
    });
}

let deleteProduct = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataResponse = {};
            db.Product_Attachment.destroy({
                where: { productId: JSON.parse(data.id) }
            });
            db.Product.destroy({
                where: { id: JSON.parse(data.id) },
                cascade: true,
                include: [{ model: db.Product_Attachment }]
            });
            dataResponse.errCode = 0;
            dataResponse.message = 'delete complete';

            resolve(dataResponse);
        } catch (e) {
            reject(e);
        }
    });
}

let getAllProducts = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataResponse = {};
            let allProducts = await db.Product.findAll({
                include: [{
                    model: Product_Categories
                }, {
                    model: Product_Attachment

                }],
                order: [['updatedAt', 'DESC'],]
            });
            dataResponse.errCode = 0;
            dataResponse.data = allProducts;

            dataResponse.message = 'get all complete';
            resolve(dataResponse);
        } catch (e) {
            reject(e);
        }
    });
}

let getAllCategories = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataResponse = {};
            let allCategories = await db.Product_Categories.findAll({
                include: [{ model: Product, as: 'Products' }],// group: ['Product_Categories.id'],
                // order: [['updatedAt', 'DESC'],]

            });
            // console.log(allCategories);
            dataResponse.errCode = 0;
            dataResponse.data = allCategories;

            dataResponse.message = 'get all complete';
            resolve(dataResponse);
        } catch (e) {
            reject(e);
        }
    });
}

let getProductsPagination = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log('check limit : ', process.env.PRODUCT_USER_PAGINATION_OFFSET);
            // console.log('check offset : ', process.env.PRODUCT_USER_PAGINATION_OFFSET * (data.page - 1));
            let limit = process.env.PRODUCT_USER_PAGINATION_OFFSET;
            let offset = process.env.PRODUCT_USER_PAGINATION_OFFSET * (data.page - 1);

            console.log('==>Limit : ', limit);
            console.log('==>categoryId : ', data.categoryId);
            let categoryId = JSON.parse(data.categoryId);
            let dataResponse = {};
            let options = {
                offset: JSON.parse(offset),
                limit: JSON.parse(limit),
                include: [{
                    model: Product_Categories
                }, {
                    model: Product_Attachment
                }],
                where: {},

                order: [['updatedAt', 'DESC'],],
            }

            if (categoryId != null) {
                console.log('=====++++-----AAAAAAAAAAAAAAA');
                options.where.categoryId = categoryId;
            }

            let productPagination = await db.Product.findAndCountAll(options);
            console.log('options :', productPagination);

            if (productPagination) {
                dataResponse.errCode = 0;
                dataResponse.products = productPagination;
                dataResponse.message = 'get complete';

            } else {
                dataResponse.errCode = 2;
                dataResponse.message = 'Can not get';
            }
            resolve(dataResponse);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    createProductCategory: createProductCategory,
    createProduct: createProduct,
    updateProductCategory: updateProductCategory,
    updateProduct: updateProduct,
    deleteProductCategory: deleteProductCategory,
    deleteProduct: deleteProduct,
    getAllProducts: getAllProducts,
    getAllCategories: getAllCategories,
    getProductsPagination: getProductsPagination,
};