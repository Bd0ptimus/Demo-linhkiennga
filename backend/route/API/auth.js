import express from "express";

const router = express.Router({ mergeParams: true });
router.use(express.json());
import authController from "../../controllers/authController";
router.post('/user-login', authController.userLogin);

module.exports = router;