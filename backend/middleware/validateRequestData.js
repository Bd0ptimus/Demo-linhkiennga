const Joi = require("joi");

const createRequestValidate = (method) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        des: Joi.string().allow(''),
        fileSelected: Joi.any(),
    });
    return schema.validate(method);
}

const updateRequestStatusValidate = (method) => {
    const schema = Joi.object({
        requestId: Joi.number().required(),
        status: Joi.number().required(),
    });
    return schema.validate(method);
}



module.exports = {
    createRequestValidate: createRequestValidate,
    updateRequestStatusValidate: updateRequestStatusValidate,
}