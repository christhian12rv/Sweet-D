import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AdminNavbarActions from "../../../../../store/actions/admin/adminNavbar";
import * as LoginActions from "../../../../../store/actions/login";

import { MdOutlineFullscreen } from "react-icons/md";
import { BsList } from "react-icons/bs";
import { FiUser } from "react-icons/fi";

import "./index.scss";

const AdminNavbar = ({
    title,
    user,
    sidebarOpen,
    toggleAdminSidebar,
    getUserAuth
}) => {
    const navigate = useNavigate();

    useEffect(async () => {
        await getUserAuth();
    }, []);

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
            <div
                className="item user"
                onClick={() => navigate("/user/settings")}
            >
                <div>
                    <h4>
                        {user.name.substr(0, user.name.indexOf(" "))
                            ? user.name.substr(0, user.name.indexOf(" "))
                            : user.name}
                    </h4>
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
    user: state.login.user,
    sidebarOpen: state.adminSidebar.open
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        Object.assign({}, AdminNavbarActions, LoginActions),
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);
