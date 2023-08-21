import db from "../models/index";
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config();

let userLogin = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataResponse = {};
            let user = await db.user.findOne({
                where: { email: data.email }
            });

            console.log('check user : ', user);

            if (!user) {
                dataResponse.errCode = 2;
                dataResponse.message = 'Wrong email';

            } else {
                if (data.password == user.password) {
                    const userData = await db.user.findOne({
                        where: { email: data.email },
                        attributes: ['email', 'id', 'password'],
                    })
                    dataResponse.errCode = 0;
                    dataResponse.user = userData;
                    dataResponse.message = 'Create complete';
                } else {
                    dataResponse.errCode = 3;
                    dataResponse.message = 'Can not create';
                }
            }
            resolve(dataResponse);
        } catch (e) {
            reject(e);
        }
    });
}



module.exports = {
    userLogin: userLogin,

}