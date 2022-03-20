import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./store";

import Title from "./components/Title";
import Layout from "./components/Pages/Layout";
import Home from "./components/Pages/Home";
import ProductsPage from "./components/Pages/ProductsPage";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import RecoveryPassword from "./components/Pages/RecoveryPassword";
import RecoveryPasswordChange from "./components/Pages/RecoveryPasswordChange";
import Cart from "./components/Pages/Cart";
import Product from "./components/Pages/Product";
import UserSettings from "./components/Pages/User/Settings";
import UserOrders from "./components/Pages/User/Orders";
import OrderDetails from "./components/Pages/User/OrderDetails";
import AdminLayout from "./components/Pages/Admin/Layout";
import AdminDashboard from "./components/Pages/Admin/Dashboard";
import AdminListProducts from "./components/Pages/Admin/ListProducts";
import AdminListUsers from "./components/Pages/Admin/ListUsers";
import AdminListOrders from "./components/Pages/Admin/ListOrders";
import AdminOrderDetails from "./components/Pages/Admin/OrderDetails";
import AdminAddProduct from "./components/Pages/Admin/AddProduct";
import AdminEditProduct from "./components/Pages/Admin/EditProduct";
import AboutUs from "./components/Pages/AboutUs";
import Contact from "./components/Pages/Contact";
import Error404 from "./components/Pages/Error404";
import Error500 from "./components/Pages/Error500";
import RequiredAuth from "./components/RequiredAuth";

import "./App.scss";

function App() {
    const [showModal, setShowModal] = useState(true);

    window.addEventListener("load", function () {
        const modal = document.getElementById("modal-on-page-loading");
        let opacity = 1;
        let fade = setInterval(() => {
            opacity -= 0.02;
            modal.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(fade);
            }
        }, 10);

        setTimeout(() => {
            setShowModal(false);
        }, 500);
    });

    return (
        <div className="App" id="app">
            <div
                className={"modal-on-page-loading" + (showModal ? " show" : "")}
                id="modal-on-page-loading"
            >
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            </div>
            <Provider store={store}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Title value="Sweet-D" />
                                <Layout activePage={1}>
                                    <Home />
                                </Layout>
                            </>
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            <>
                                <Title value="Produtos" />
                                <Layout activePage={2}>
                                    <ProductsPage />
                                </Layout>
                            </>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <>
                                <Title value="Carrinho de compras" />
                                <Layout>
                                    <Cart />
                                </Layout>
                            </>
                        }
                    />
                    <Route
                        path="/cart/:slug"
                        element={
                            <>
                                <RequiredAuth>
                                    <Title value="Sweet-D - Comprar produto" />
                                    <Layout isBuyOneProduct={true}>
                                        <Cart isBuyOneProduct={true} />
                                    </Layout>
                                </RequiredAuth>
                            </>
                        }
                    />
                    <Route
                        path="/products/:slug"
                        element={
                            <>
                                <Title value="Sweet-D" />
                                <Layout>
                                    <Product />
                                </Layout>
                            </>
                        }
                    />
                    <Route
                        path="/user/settings"
                        element={
                            <>
                                <RequiredAuth>
                                    <Title value="Meus dados" />
                                    <Layout>
                                        <UserSettings />
                                    </Layout>
                                </RequiredAuth>
                            </>
                        }
                    />
                    <Route
                        path="/user/orders"
                        element={
                            <>
                                <RequiredAuth>
                                    <Title value="Pedidos" />
                                    <Layout>
                                        <UserOrders />
                                    </Layout>
                                </RequiredAuth>
                            </>
                        }
                    />
                    <Route
                        path="/user/orders/:id"
                        element={
                            <>
                                <RequiredAuth>
                                    <Title value="Pedido #" param="id" />
                                    <Layout>
                                        <OrderDetails />
                                    </Layout>
                                </RequiredAuth>
                            </>
                        }
                    />

                    <Route
                        path="/admin/dashboard"
                        element={
                            <>
                                <RequiredAuth isAdmin={true}>
                                    <Title value="Sweet-D Admin - Painel de Controle" />
                                    <AdminLayout
                                        activePage="1"
                                        title={"Painel de Controle"}
                                    >
                                        <AdminDashboard />
                                    </AdminLayout>
                                </RequiredAuth>
                            </>
                        }
                    />
                    <Route
                        path="/admin/products"
                        element={
                            <>
                                <RequiredAuth isAdmin={true}>
                                    <Title value="Sweet-D Admin - Produtos" />
                                    <AdminLayout
                                        activePage="2"
                                        title="Produtos"
                                    >
                                        <AdminListProducts />
                                    </AdminLayout>
                                </RequiredAuth>
                            </>
                        }
                    />
                    <Route
                        path="/admin/products/add"
                        element={
                            <>
                                <RequiredAuth isAdmin={true}>
                                    <Title value="Sweet-D Admin - Adicionar produto" />
                                    <AdminLayout
                                        activePage="3"
                                        title="Adicionar Produto"
                                    >
                                        <AdminAddProduct />
                                    </AdminLayout>
                                </RequiredAuth>
                            </>
                        }
                    />
                    <Route
                        path="/admin/products/edit/:slug"
                        element={
                            <>
                                <RequiredAuth isAdmin={true}>
                                    <Title
                                        value="Sweet-D Admin - Editar produto #"
                                        param="slug"
                                    />
                                    <AdminLayout
                                        activePage="2"
                                        title="Editar produto #"
                                        titleParam={true}
                                    >
                                        <AdminEditProduct />
                                    </AdminLayout>
                                </RequiredAuth>
                            </>
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <>
                                <RequiredAuth isAdmin={true}>
                                    <Title value="Sweet-D Admin - Usuários" />
                                    <AdminLayout
                                        activePage="4"
                                        title="Usuários"
                                    >
                                        <AdminListUsers />
                                    </AdminLayout>
                                </RequiredAuth>
                            </>
                        }
                    />
                    <Route
                        path="/admin/orders"
                        element={
                            <>
                                <RequiredAuth isAdmin={true}>
                                    <Title value="Sweet-D Admin - Pedidos" />
                                    <AdminLayout activePage="5" title="Pedidos">
                                        <AdminListOrders />
                                    </AdminLayout>
                                </RequiredAuth>
                            </>
                        }
                    />
                    <Route
                        path="/admin/orders/:id"
                        element={
                            <>
                                <RequiredAuth isAdmin={true}>
                                    <Title
                                        value="Sweet-D Admin - Pedido #"
                                        param="id"
                                    />
                                    <AdminLayout
                                        activePage="5"
                                        title="Pedido #"
                                        titleParam={true}
                                    >
                                        <AdminOrderDetails />
                                    </AdminLayout>
                                </RequiredAuth>
                            </>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <>
                                <Title value="Login" />
                                <Login />
                            </>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <>
                                <Title value="Registrar" />
                                <Register />
                            </>
                        }
                    />
                    <Route
                        path="/recovery-password"
                        element={
                            <>
                                <Title value="Recuperação de senha" />
                                <RecoveryPassword />
                            </>
                        }
                    />
                    <Route
                        path="/recovery-password/change/:email/:token"
                        element={
                            <>
                                <Title
                                    value="Recuperação de senha - "
                                    param="email"
                                />
                                <RecoveryPasswordChange />
                            </>
                        }
                    />

                    <Route
                        path="/about-us"
                        element={
                            <>
                                <Title value="Quem somos" />
                                <Layout>
                                    <AboutUs />
                                </Layout>
                            </>
                        }
                    />

                    <Route
                        path="/contact"
                        element={
                            <>
                                <Title value="Contato" />
                                <Layout>
                                    <Contact />
                                </Layout>
                            </>
                        }
                    />

                    <Route
                        path="/error/404"
                        element={
                            <>
                                <Title value="Erro 404" />
                                <Layout>
                                    <Error404 />
                                </Layout>
                            </>
                        }
                    />
                    <Route
                        path="/error/500"
                        element={
                            <>
                                <Title value="Erro 500" />
                                <Layout>
                                    <Error500 />
                                </Layout>
                            </>
                        }
                    />
                    <Route path="*" element={<Navigate to="/error/404" />} />
                </Routes>
            </Provider>
            <ToastContainer transition={Slide} />
        </div>
    );
}

export default App;
