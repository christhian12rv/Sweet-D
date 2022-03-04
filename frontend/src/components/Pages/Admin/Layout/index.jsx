import React from "react";
import { useParams } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AdminNavbarActions from "../../../../store/actions/admin/adminNavbar";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

import "./index.scss";

const AdminLayout = ({
    children,
    activePage,
    title,
    titleParam,
    open,
    toggleAdminSidebar
}) => {
    if (titleParam) {
        const { id } = useParams();
        title += id;
    }

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
