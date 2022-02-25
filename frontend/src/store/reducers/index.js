import { combineReducers } from "redux";

import register from "./register";
import login from "./login";
import userSettings from "./userSettings";
import adminSidebar from "./adminSidebar";

export default combineReducers({
    register,
    login,
    userSettings,
    adminSidebar
});
