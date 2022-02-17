import React, { Fragment } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Layout from "./components/Pages/Layout";
import Home from "./components/Pages/Home";
import ProductsPage from "./components/Pages/ProductsPage";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import RecoveryPassword from "./components/Pages/RecoveryPassword";
import RecoveryPasswordChange from "./components/Pages/RecoveryPasswordChange";
import Cart from "./components/Pages/Cart";
import UserSettings from "./components/Pages/User/Settings";
import UserOrders from "./components/Pages/User/Orders";
import OrderDetails from "./components/Pages/User/OrderDetails";
import AdminLayout from "./components/Pages/Admin/Layout";
import Dashboard from "./components/Pages/Admin/Dashboard";
import ListProducts from "./components/Pages/Admin/ListProducts";
import ListUsers from "./components/Pages/Admin/ListUsers";

import "./App.scss";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Layout>
                                <Home />
                            </Layout>
                        </>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <>
                            <Layout>
                                <ProductsPage />
                            </Layout>
                        </>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <>
                            <Layout>
                                <Cart />
                            </Layout>
                        </>
                    }
                />
                <Route
                    path="/user/settings"
                    element={
                        <>
                            <Layout>
                                <UserSettings />
                            </Layout>
                        </>
                    }
                />
                <Route
                    path="/user/orders"
                    element={
                        <>
                            <Layout>
                                <UserOrders />
                            </Layout>
                        </>
                    }
                />
                <Route
                    path="/user/orders/:id"
                    element={
                        <>
                            <Layout>
                                <OrderDetails />
                            </Layout>
                        </>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <>
                            <AdminLayout
                                activePage="1"
                                title={"Painel de Controle"}
                            >
                                <Dashboard />
                            </AdminLayout>
                        </>
                    }
                />
                <Route
                    path="/admin/products"
                    element={
                        <>
                            <AdminLayout activePage="2" title="Produtos">
                                <ListProducts />
                            </AdminLayout>
                        </>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <>
                            <AdminLayout activePage="4" title="Usuários">
                                <ListUsers />
                            </AdminLayout>
                        </>
                    }
                />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/recovery-password/:id"
                    element={<RecoveryPassword />}
                />
                <Route
                    path="/recovery-password/change/:id"
                    element={<RecoveryPasswordChange />}
                />
            </Routes>
        </div>
    );
}

export default App;
