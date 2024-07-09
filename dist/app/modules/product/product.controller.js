"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const product_validation_1 = require("./product.validation");
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodParsedData = product_validation_1.productSchemaValidation.parse(req.body);
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParsedData);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductServices.getAllProductFromDB();
        if (req.query.searchTerm) {
            const filteredProducts = result.filter(product => product.name.toLowerCase().includes(searchTerm));
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: filteredProducts,
            });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: 'Products fetched successfully!',
                data: result,
            });
        }
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(id);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Product fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const productData = req.body;
        const result = yield product_service_1.ProductServices.updateSignleProductFromDB(id, productData);
        if (result.modifiedCount) {
            const result2 = yield product_service_1.ProductServices.getSingleProductFromDB(id);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: 'Product updated successfully!',
                data: result2,
            });
        }
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        yield product_service_1.ProductServices.deleteSingleProductFromDB(id);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
    // searchProducts,
};
