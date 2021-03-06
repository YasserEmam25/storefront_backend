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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ProductModel {
    // gets all products
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT name, price, category FROM products;';
                const result = yield conn.query(sql);
                conn.release();
                if (result.rows.length > 0) {
                    return result.rows;
                }
                else {
                    throw new Error("No data in the database");
                }
            }
            catch (error) {
                console.log(`Error while trying to get products: ${error}`);
                return `Error while trying to get products: ${error}`;
            }
        });
    }
    // gets the product by search from database
    show(productName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT name, price, category FROM products where name = ($1);';
                const result = yield conn.query(sql, [productName]);
                conn.release();
                if (result.rows.length > 0) {
                    return result.rows;
                }
                else {
                    throw new Error("No data in the database");
                }
            }
            catch (error) {
                console.log(`Error while trying to get it from the database: ${error}`);
                return `Error while trying to get it from the database: ${error}`;
            }
        });
    }
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'Insert into products(name, price, category) values ($1, $2, $3)';
                const result = yield conn.query(sql, [p.name, p.price, p.category]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                console.log(`Error while trying to create new product: ${error}`);
                return `Error while trying to create new product: ${error}`;
            }
        });
    }
    popular() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                // const sql = 'select products.name, products.price, products.category, count(orders.product_id) as orders from products, orders where products.product_id = orders.product_id group by orders.product_id order by orders.product_id limit 5';
                // const sql = "select products.name as name, products.price as price, products.category as category, count(orders.product_id) as orders from products, orders WHERE orders.product_id = products.product_id group by orders.product_id, name, category, price order by orders desc limit 5;";
                const sql = 'select products.name as name, products.price as price, products.category as category, count(productsOrders.product_id) as orders from products inner join productsOrders on products.product_id = productsOrders.product_id group by productsOrders.product_id, name, category, price order by orders desc limit 5;';
                const result = yield conn.query(sql);
                conn.release();
                if (result.rows.length > 0) {
                    return result.rows;
                }
                else {
                    throw new Error("No data in the database");
                }
            }
            catch (error) {
                console.log(`Erro while trying to get popular products from database: ${error}`);
                return `Erro while trying to get popular products from database: ${error}`;
            }
        });
    }
    category(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT name, price, category FROM products where category = ($1);';
                const result = yield conn.query(sql, [category]);
                conn.release();
                if (result.rows.length > 0) {
                    return result.rows;
                }
                else {
                    throw new Error("No data in the database");
                }
            }
            catch (error) {
                console.log(`Error while trying to get products by category: ${error}`);
                return `Error while trying to get products by category: ${error}`;
            }
        });
    }
}
exports.default = ProductModel;
