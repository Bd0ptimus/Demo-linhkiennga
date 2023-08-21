import express from "express";
import ApiRoute from './API';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/welcome', (req, res) => {
        return res.render('welcome');
    });

    router.use('/api', ApiRoute);
    return app.use("/", router);
}

module.exports = initWebRoutes;