import { combineReducers } from "redux";

import register from "./register";
import login from "./login";
import userSettings from "./userSettings";
import adminSidebar from "./adminSidebar";
import addProduct from "./addProduct";
import listProducts from "./listProducts";

export default combineReducers({
    register,
    login,
    userSettings,
    adminSidebar,
    addProduct,
    listProducts
});
