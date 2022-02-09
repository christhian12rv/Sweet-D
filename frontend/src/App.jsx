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
