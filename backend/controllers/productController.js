const {
    Product,
    Product_Categories
} = require("../models");
import ProductService from '../services/productService';
import AuthMiddleware from '../middleware/auth'
import validateProductsData from "../middleware/validateProductsData";

let createNewCategory = async (req, res) => {
    let name = req.body.name;
    let pid = req.body.pid;
    let listFile = req.files;

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const errors = validateProductsData.createProductCateValidate(req.body).error;
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

    let data = await ProductService.createProductCategory({
        name: name,
        pid: pid,
        listFile: listFile,
    })

    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}


let updateCategory = async (req, res) => {
    let name = req.body.name;
    let pid = req.body.pid;
    let id = req.body.id;
    let listFile = req.files;
    let fileKept = req.body.fileKept;

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    let errors = validateProductsData.updateProductCateValidate(req.body).error;
    // console.log(errors);
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
    let data = await ProductService.updateProductCategory({
        name: name,
        pid: pid,
        id: id,
        listFile: listFile,
        fileKept: fileKept,
    })

    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });

}

let deleteCategory = async (req, res) => {
    let id = req.params.id;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let jwtCheck = AuthMiddleware.checkJWTToken(token);
    if (jwtCheck.errCode != 0) {
        return res.status(500).json(jwtCheck);
    }
    let data = await ProductService.deleteProductCategory({
        id: id
    })

    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}

let createNewProduct = async (req, res) => {
    let name = req.body.name;
    let categoryId = req.body.categoryId;
    let price = req.body.price;
    let wholeSalePrice = req.body.wholeSalePrice;
    let des = req.body.des;
    let note = req.body.note;
    let listFiles = req.files;
    // console.log('controller check files : ', req.body);

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const errors = validateProductsData.createProductValidate(req.body).error;
    // console.log(errors);
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

    let data = await ProductService.createProduct({
        name: name,
        categoryId: categoryId,
        price: price,
        wholeSalePrice: wholeSalePrice,
        des: des,
        note: note,
        listFiles: listFiles,
    })

    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });

}

let updateProduct = async (req, res) => {
    // console.log('===>CHECK FILE SAVING: ', req.files);

    let name = req.body.name;
    let categoryId = req.body.categoryId;
    let price = req.body.price;
    let wholeSalePrice = req.body.wholeSalePrice;
    let des = req.body.des;
    let note = req.body.note;
    let id = req.body.id;
    let listFiles = req.files;
    let fileKept = req.body.fileKept;

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const errors = validateProductsData.updateProductValidate(req.body).error;
    // console.log('check updateProduct : ', JSON.stringify(errors));
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

    let data = await ProductService.updateProduct({
        name: name,
        categoryId: categoryId,
        price: price,
        wholeSalePrice: wholeSalePrice,
        des: des,
        note: note,
        id: id,
        listFiles: listFiles,
        fileKept: fileKept,
    })

    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}


let deleteProduct = async (req, res) => {
    let id = req.params.id;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let jwtCheck = AuthMiddleware.checkJWTToken(token);
    if (jwtCheck.errCode != 0) {
        return res.status(500).json(jwtCheck);
    }
    let data = await ProductService.deleteProduct({
        id: id
    })

    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}

let getAllProducts = async (req, res) => {
    let data = await ProductService.getAllProducts()
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}

let getAllCategories = async (req, res) => {
    let data = await ProductService.getAllCategories();
    // console.log(data);
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}


let getAllProductsPagination = async (req, res) => {
    // console.log(req.query.categoryId);
    let page = req.query.page;
    let categoryId = req.query.categoryId;
    let data = await ProductService.getProductsPagination({
        page: page,
        categoryId: categoryId,
    });
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}

module.exports = {
    createNewCategory: createNewCategory,
    createNewProduct: createNewProduct,
    updateCategory: updateCategory,
    updateProduct: updateProduct,
    deleteCategory: deleteCategory,
    deleteProduct: deleteProduct,
    getAllProducts: getAllProducts,
    getAllCategories: getAllCategories,
    getAllProductsPagination: getAllProductsPagination,
};