import React from "react";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

import "./index.scss";

const Layout = ({ children, activePage, title }) => {
    return (
        <div className="admin-layout">
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

export default Layout;
