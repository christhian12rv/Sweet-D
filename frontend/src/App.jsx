import React, { Fragment } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Pages/Home";
import ProductsPage from "./components/Pages/ProductsPage";
import Login from "./components/Pages/Login";

import "./App.scss";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Navbar />
                            <Home />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <>
                            <Navbar />
                            <ProductsPage />
                            <Footer />
                        </>
                    }
                />

                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
