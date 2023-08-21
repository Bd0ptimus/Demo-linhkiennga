const Joi = require("joi");

const createProductCateValidate = (method) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        pid: Joi.string().allow(''),
        listFile: Joi.array(),

    });
    return schema.validate(method);
}

const updateProductCateValidate = (method) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        pid: Joi.string().allow('null'),
        id: Joi.string().required(),
        listFile: Joi.array(),
        fileKept: Joi.any(),
    });
    return schema.validate(method);
}

const createProductValidate = (method) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        categoryId: Joi.string().allow('null'),
        price: Joi.string().allow('null'),
        wholeSalePrice: Joi.string().allow('null'),
        des: Joi.string().allow(''),
        listFiles: Joi.array(),

    });
    return schema.validate(method);
}

const updateProductValidate = (method) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        categoryId: Joi.string().allow('null'),
        price: Joi.string().allow('null'),
        wholeSalePrice: Joi.string().allow('null'),
        des: Joi.string().allow(''),
        id: Joi.string().required(),
        fileKept: Joi.array()
    });
    return schema.validate(method);
}

module.exports = {
    createProductCateValidate: createProductCateValidate,
    createProductValidate: createProductValidate,
    updateProductCateValidate: updateProductCateValidate,
    updateProductValidate: updateProductValidate,
}