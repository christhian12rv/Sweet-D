import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiCookie, BiPlusCircle } from "react-icons/bi";
import { FiUsers, FiShoppingBag } from "react-icons/fi";

import { connect } from "react-redux";
import Logo from "../../../../Logo";

import "./index.scss";

const AdminSidebar = ({ activePage, open }) => {
    const navigate = useNavigate();

    return (
        <div className={"admin-sidebar " + (open ? "open" : "closed")}>
            <Logo />

            <div
                className={
                    "item dashboard " + (activePage === "1" ? "active" : "")
                }
                onClick={() => navigate("/admin/dashboard")}
            >
                <div className="content">
                    <MdOutlineSpaceDashboard className="icon" />
                    <p>Painel de Controle</p>
                </div>
            </div>

            <hr />

            <div className="title">
                <p>Produtos</p>
            </div>

            <div
                className={"item " + (activePage === "2" ? "active" : "")}
                onClick={() => navigate("/admin/products")}
            >
                <div className="content">
                    <BiCookie className="icon" />
                    <p>Listar produtos</p>
                </div>
            </div>
            <div
                className={"item " + (activePage === "3" ? "active" : "")}
                onClick={() => navigate("/admin/products/add")}
            >
                <div className="content">
                    <BiPlusCircle className="icon" />
                    <p>Adicionar produto</p>
                </div>
            </div>

            <div className="title">
                <p>Usuários</p>
            </div>

            <div
                className={"item " + (activePage === "4" ? "active" : "")}
                onClick={() => navigate("/admin/users")}
            >
                <div className="content">
                    <FiUsers className="icon" />
                    <p>Listar Usuários</p>
                </div>
            </div>

            <div className="title">
                <p>Pedidos</p>
            </div>

            <div
                className={"item " + (activePage === "5" ? "active" : "")}
                onClick={() => navigate("/admin/orders")}
            >
                <div className="content">
                    <FiShoppingBag className="icon" />
                    <p>Listar Pedidos</p>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    open: state.adminSidebar.open
});

export default connect(mapStateToProps)(AdminSidebar);
