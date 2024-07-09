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
exports.OrderControllers = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const order_validation_1 = require("./order.validation");
const order_service_1 = require("./order.service");
const product_service_1 = require("../product/product.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const { productId, quantity } = req.body;
        const zodParsedData = order_validation_1.orderSchemaValidation.parse(req.body);
        const product = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        if (((_a = product === null || product === void 0 ? void 0 : product.inventory) === null || _a === void 0 ? void 0 : _a.quantity) - quantity < 0) {
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
        }
        else {
            if (((_b = product === null || product === void 0 ? void 0 : product.inventory) === null || _b === void 0 ? void 0 : _b.quantity) - quantity > 0) {
                console.log('Product quantity', (_c = product === null || product === void 0 ? void 0 : product.inventory) === null || _c === void 0 ? void 0 : _c.quantity);
                yield product_service_1.ProductServices.updateSignleProductFromDB(productId, {
                    inventory: {
                        quantity: ((_d = product === null || product === void 0 ? void 0 : product.inventory) === null || _d === void 0 ? void 0 : _d.quantity) - quantity,
                        inStock: true,
                    },
                });
            }
            if (((_e = product === null || product === void 0 ? void 0 : product.inventory) === null || _e === void 0 ? void 0 : _e.quantity) - quantity == 0) {
                yield product_service_1.ProductServices.updateSignleProductFromDB(productId, {
                    inventory: {
                        quantity: 0,
                        inStock: false,
                    },
                });
            }
            const result = yield order_service_1.OrderServices.createOrderIntoDB(zodParsedData);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: 'Order created successfully!',
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
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.email;
        const result2 = yield order_service_1.OrderServices.getAllOrderFromDB();
        if (req.query.email) {
            const result = yield order_service_1.OrderServices.getAllOrderUsingEmailFromDB(searchTerm);
            if (result.length) {
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: 'Orders fetched successfully for user email!',
                    data: result,
                });
            }
            else {
                res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .json({ success: false, message: 'Order not found' });
            }
        }
        else {
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: 'Orders fetched successfully!',
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
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};
