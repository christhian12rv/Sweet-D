import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./store";

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
import Error404 from "./components/Pages/Error404";
import Error500 from "./components/Pages/Error500";
import RequiredAuth from "./components/RequiredAuth";

import "./App.scss";

function App() {
    let productId;
    return (
        <div className="App" id="app">
            <Provider store={store}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
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
                                <RequiredAuth>
                                    <Layout>
                                        <Cart />
                                    </Layout>
                                </RequiredAuth>
                            </>
                        }
                    />
                    <Route
                        path="/products/:slug"
                        element={
                            <>
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

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/recovery-password"
                        element={<RecoveryPassword />}
                    />
                    <Route
                        path="/recovery-password/change/:id"
                        element={<RecoveryPasswordChange />}
                    />

                    <Route
                        path="/error/404"
                        element={
                            <>
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
