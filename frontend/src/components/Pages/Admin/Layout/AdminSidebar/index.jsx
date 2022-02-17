import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiCookie } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import { FiUsers, FiShoppingBag } from "react-icons/fi";

import Logo from "../../../../Logo";

import "./index.scss";

const Layout = ({ activePage }) => {
    return (
        <div className="admin-sidebar">
            <Logo />

            <div
                className={
                    "item dashboard " + (activePage === "1" ? "active" : "")
                }
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

            <div className={"item " + (activePage === "2" ? "active" : "")}>
                <div className="content">
                    <BiCookie className="icon" />
                    <p>Listar produtos</p>
                </div>
            </div>
            <div className={"item " + (activePage === "3" ? "active" : "")}>
                <div className="content">
                    <GrAddCircle className="icon" />
                    <p>Adicionar produto</p>
                </div>
            </div>

            <div className="title">
                <p>Usuários</p>
            </div>

            <div className={"item " + (activePage === "4" ? "active" : "")}>
                <div className="content">
                    <FiUsers className="icon" />
                    <p>Listar Usuários</p>
                </div>
            </div>

            <div className="title">
                <p>Pedidos</p>
            </div>

            <div className={"item " + (activePage === "5" ? "active" : "")}>
                <div className="content">
                    <FiShoppingBag className="icon" />
                    <p>Listar Pedidos</p>
                </div>
            </div>
        </div>
    );
};

export default Layout;
