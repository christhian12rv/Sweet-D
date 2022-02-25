import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AdminNavbarActions from "../../../../store/actions/adminNavbar";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

import "./index.scss";

const AdminLayout = ({
    children,
    activePage,
    title,
    open,
    toggleAdminSidebar
}) => {
    const handleSidebarClose = () => {
        toggleAdminSidebar(false);
    };

    return (
        <div className="admin-layout">
            <div
                className={
                    "background-modal-sidebar-mobile " +
                    (open ? "show" : "hide")
                }
                onClick={handleSidebarClose}
            ></div>
            <div className="sidebar-row">
                <AdminSidebar activePage={activePage} />
            </div>
            <div className="second-row">
                <AdminNavbar title={title} />
                <div className="children-content">{children}</div>
                <AdminFooter />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    open: state.adminSidebar.open
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(AdminNavbarActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
