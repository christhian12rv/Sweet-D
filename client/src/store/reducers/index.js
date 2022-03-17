import { combineReducers } from "redux";

import register from "./register";
import login from "./login";
import recoveryPassword from "./recoveryPassword";
import contact from "./contact";
import userSettings from "./userSettings";
import listProducts from "./listProducts";
import product from "./product";
import cart from "./cart";
import orders from "./orders";
import adminSidebar from "./admin/adminSidebar";
import dashboardAdmin from "./admin/dashboard";
import addProductAdmin from "./admin/addProduct";
import editProductAdmin from "./admin/editProduct";
import listProductsAdmin from "./admin/listProducts";
import listUsersAdmin from "./admin/listUsers";

export default combineReducers({
    register,
    login,
    recoveryPassword,
    contact,
    userSettings,
    listProducts,
    product,
    cart,
    orders,
    adminSidebar,
    dashboardAdmin,
    addProductAdmin,
    editProductAdmin,
    listProductsAdmin,
    listUsersAdmin
});
