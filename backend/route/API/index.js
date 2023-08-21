import express from "express";
import productRoutes from "./product";
import requestRoutes from "./request";
import blogRoute from "./blog";
import authRoutes from "./auth";
const router = express.Router({ mergeParams: true });

router.use(express.json());

router.use("/product", productRoutes);
router.use("/request", requestRoutes);
router.use("/blog", blogRoute);
router.use("/auth", authRoutes);

module.exports = router;
