import types from "../types";

export function toggleAdminSidebar(open) {
    return {
        type: types.TOGGLE_ADMIN_SIDEBAR,
        payload: { open }
    };
}
