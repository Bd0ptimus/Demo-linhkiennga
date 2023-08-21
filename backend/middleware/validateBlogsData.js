const Joi = require("joi");

const createBlogValidate = (method) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
    });
    return schema.validate(method);
}

const updateBlogValidate = (method) => {
    const schema = Joi.object({
        blogId: Joi.string().required(),
        content: Joi.string().required(),
    });
    return schema.validate(method);
}




module.exports = {
    createBlogValidate: createBlogValidate,
    updateBlogValidate: updateBlogValidate,
}