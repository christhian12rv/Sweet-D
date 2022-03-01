import { combineReducers } from "redux";

import register from "./register";
import login from "./login";
import userSettings from "./userSettings";
import adminSidebar from "./adminSidebar";
import addProduct from "./addProduct";

export default combineReducers({
    register,
    login,
    userSettings,
    adminSidebar,
    addProduct
});
