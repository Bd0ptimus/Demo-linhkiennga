import db from "../models/index";
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config();

let createBlog = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataResponse = {};
            // console.log(data.listFile[0]);
            let slugString = data.title.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            let routeSlug = '';
            slugString.split(' ').map((item, index) => {
                if (index == 0) {
                    routeSlug = item;
                } else {
                    routeSlug = routeSlug + '-' + item;
                }
            });

            let blogExisted = await db.blog.findOne({ where: { routeSlug: routeSlug } });
            if (blogExisted) {
                dataResponse.errCode = 3;
                dataResponse.message = 'Tiêu đề đã tồn tại';
            } else {
                let newBlog = await db.blog.create({
                    title: data.title,
                    routeSlug: routeSlug,
                    content: data.content,
                });
                if (newBlog) {
                    dataResponse.errCode = 0;
                    dataResponse.newCate = newBlog;
                    dataResponse.message = 'Create complete';

                } else {
                    dataResponse.errCode = 2;
                    dataResponse.message = 'Can not create';
                }
            }
            resolve(dataResponse);
        } catch (e) {
            reject(e);
        }
    });
}


let getBlogById = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataResponse = {};
            let blog = await db.blog.findOne({ where: { routeSlug: data.routeSlug } });

            if (blog) {
                dataResponse.errCode = 0;
                dataResponse.blog = blog;
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

let getAllBlog = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataResponse = {};
            let blogs = await db.blog.findAll();

            if (blogs) {
                dataResponse.errCode = 0;
                dataResponse.blogs = blogs;
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

let updateBlog = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataResponse = {};
            // console.log(data.listFile[0]);
            let updateBlog = await db.blog.update({
                content: data.content,
            }, { where: { id: Number(data.blogId) } });
            if (updateBlog) {
                dataResponse.errCode = 0;
                dataResponse.updateBlog = updateBlog;
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

module.exports = {
    createBlog: createBlog,
    getBlogById: getBlogById,
    getAllBlog: getAllBlog,
    updateBlog: updateBlog,
}