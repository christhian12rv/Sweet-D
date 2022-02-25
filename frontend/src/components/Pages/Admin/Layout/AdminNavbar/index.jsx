import React from "react";

import { MdOutlineFullscreen } from "react-icons/md";
import { BsList } from "react-icons/bs";
import { FiUser } from "react-icons/fi";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AdminNavbarActions from "../../../../../store/actions/adminNavbar";

import "./index.scss";

const AdminNavbar = ({ title, sidebarOpen, toggleAdminSidebar }) => {
    const handleFullScreen = () => {
        const isInFullScreen =
            (document.fullScreenElement &&
                document.fullScreenElement !== null) ||
            document.mozFullScreen ||
            document.webkitIsFullScreen;

        if (isInFullScreen) {
            const el = document;
            const rfs =
                el.cancelFullScreen ||
                el.webkitCancelFullScreen ||
                el.mozCancelFullScreen ||
                el.exitFullscreen ||
                el.webkitExitFullscreen ||
                el.msExitFullscreen;
            if (typeof rfs != "undefined" && rfs) {
                rfs.call(el);
            } else if (typeof window.ActiveXObject !== "undefined") {
                const wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
        } else {
            const el = document.body;
            const rfs =
                el.requestFullscreen ||
                el.webkitRequestFullScreen ||
                el.mozRequestFullScreen ||
                el.msRequestFullscreen;
            if (typeof rfs != "undefined" && rfs) {
                rfs.call(el);
            } else if (typeof window.ActiveXObject != "undefined") {
                const wscript = new ActiveXObject("WScript.Shell");
                if (wscript != null) {
                    wscript.SendKeys("{F11}");
                }
            }
        }
    };

    const handleSidebarToggle = () => {
        toggleAdminSidebar(!sidebarOpen);
    };

    return (
        <div className={"admin-navbar"}>
            <div className="item">
                <BsList className="icon" onClick={handleSidebarToggle} />
            </div>
            <div className="item path">
                <h5>{title}</h5>
            </div>
            <div className="item" onClick={handleFullScreen}>
                <MdOutlineFullscreen className="icon" />
            </div>
            <div className="item user">
                <div>
                    <h4>John Doe</h4>
                    <p>Admin</p>
                </div>
                <div>
                    <FiUser className="user-icon" />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    sidebarOpen: state.adminSidebar.open
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(AdminNavbarActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);
