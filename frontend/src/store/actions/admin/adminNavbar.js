import types from "../../constants";

export function toggleAdminSidebar(open) {
    localStorage.setItem("admin_sidebar_open", open ? "true" : "false");
    return {
        type: types.TOGGLE_ADMIN_SIDEBAR,
        payload: { open }
    };
}
