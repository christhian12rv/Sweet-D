import { combineReducers } from "redux";

import register from "./register";
import login from "./login";
import userSettings from "./userSettings";

export default combineReducers({
    register,
    login,
    userSettings
});
