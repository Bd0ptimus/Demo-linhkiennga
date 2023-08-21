const {
    Product,
    Product_Categories
} = require("../models");
import BlogService from '../services/blogService';
import AuthMiddleware from '../middleware/auth'
import validateBlogsData from "../middleware/validateBlogsData";

let createNewBlog = async (req, res) => {
    let content = req.body.content;
    let title = req.body.title;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const errors = validateBlogsData.createBlogValidate(req.body).error;
    if (errors) {
        return res.status(500).json({
            errCode: 1,
            message: 'Parameters input are not met requirements',
        });
    }
    let jwtCheck = AuthMiddleware.checkJWTToken(token);
    if (jwtCheck.errCode != 0) {
        return res.status(500).json(jwtCheck);
    }

    let data = await BlogService.createBlog({
        content: content,
        title: title,
    })

    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}


let getBlogById = async (req, res) => {
    let routeSlug = req.params.id;
    let data = await BlogService.getBlogById({
        routeSlug: routeSlug,
    })

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}

let getAllBlog = async (req, res) => {
    let data = await BlogService.getAllBlog();

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}

let updateBlog = async (req, res) => {
    let content = req.body.content;
    let blogId = req.body.blogId;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const errors = validateBlogsData.updateBlogValidate(req.body).error;
    console.log('error : ', errors);
    if (errors) {
        return res.status(500).json({
            errCode: 1,
            message: 'Parameters input are not met requirements',
        });
    }

    let jwtCheck = AuthMiddleware.checkJWTToken(token);
    if (jwtCheck.errCode != 0) {
        return res.status(500).json(jwtCheck);
    }

    let data = await BlogService.updateBlog({
        content: content,
        blogId: blogId,
    })

    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}

module.exports = {
    createNewBlog: createNewBlog,
    getBlogById: getBlogById,
    getAllBlog: getAllBlog,
    updateBlog: updateBlog,
};