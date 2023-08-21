const Joi = require("joi");

const userLoginValidate = (method) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(method);
}



module.exports = {
    userLoginValidate: userLoginValidate,
}