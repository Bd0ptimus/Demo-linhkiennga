import bcrypt from "bcryptjs";
import db from "../models/index";
import sequelize, { Op } from "sequelize";
import fs from 'fs';
import dotenv from "dotenv";
import * as Constants from '../config/constants/Constants';
import * as functions from '../utils/functions';
dotenv.config();
const salt = bcrypt.genSaltSync(10);
const {
    Product,
    Product_Categories,
    Product_Attachment
} = require("../models");

let createRequest = async (data) => {
    return new Promise(async (resolve, reject) => {
        const t = await db.sequelize.transaction();
        try {
            let dataResponse = {};
            let filesSaving = [];
            console.log('=====> list files : ', data.listFiles);
            const userExisted = await db.user.findOne({
                where: { email: data.email }
            });
            let userId = 0;
            let emailString = '';
            if (!userExisted) {
                let passwordGenerated = functions.generatePassword();
                const user = await db.user.create({
                    email: data.email,
                    password: passwordGenerated,
                });
                userId = user.id;
                emailString = `Tài khoản của quý khách cũng đã được tự động tạo với email : ${data.email} và mật khẩu : ${passwordGenerated}. Quý khách cũng có thể truy cập vào tài khoản này để xem thông tin chi tiết về báo giá và chat với chúng tôi.`
            } else {
                userId = userExisted.id;
                emailString = `Thông tin về yêu cầu báo giá của quý khách có thể được xem chi tiết tại tài khoản ${data.email}`;

            }
            const request = await db.request.create({
                name: data.name,
                email: data.email,
                des: data.des,
                userId: userId,
                requestCode: 'BGCODE' + new Date().getTime(),
                status: Constants.REQUEST_STATUS_CREATED,
            }, { transaction: t });
            for (const file of data.listFiles) {
                await db.request_file.create({
                    requestId: request.id,
                    filePath: '/request-files/' + file.filename,
                }, { transaction: t });
                filesSaving = [...filesSaving, {
                    filename: file.filename,
                    path: process.env.MAIN_URL + '/request-files/' + file.filename,
                }]
            }
            await t.commit();
            if (request) {
                dataResponse.errCode = 0;
                dataResponse.request = request;
                dataResponse.filesSaving = filesSaving;
                dataResponse.emailString = emailString;
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

let getAllRequest = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataResponse = {};
            const requests = await db.request.findAll({
                include: [{
                    model: db.request_file
                }],
                order: [['updatedAt', 'DESC'],]
            });

            if (requests) {
                dataResponse.errCode = 0;
                dataResponse.requests = requests;

                dataResponse.message = 'get complete';

            } else {
                dataResponse.errCode = 2;
                dataResponse.message = 'Can not get';
            }
            resolve(dataResponse);
        } catch (e) {
            console.log('----> ERROR : ', e);
            reject(e);
        }
    });
}

let updateRequestStatus = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let dataResponse = {};
            let request = await db.request.update({
                status: data.status,
            }, {
                where: { id: data.requestId }
            });
            if (request) {
                dataResponse.errCode = 0;
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

let findRequest = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let requestCode = data.requestCode;
            let dataResponse = {};
            let request = await db.request.findOne({
                where: { requestCode: requestCode },
                include: [{
                    model: db.request_file
                }],
            });
            if (request) {
                dataResponse.errCode = 0;
                dataResponse.request = request;

                dataResponse.message = 'get complete';
            } else {
                dataResponse.errCode = 3;
                dataResponse.message = 'request not existed';
            }
            resolve(dataResponse);

        } catch (e) {
            reject(e);
        }
    });
}



module.exports = {
    createRequest: createRequest,
    getAllRequest: getAllRequest,
    updateRequestStatus: updateRequestStatus,
    findRequest: findRequest,
}