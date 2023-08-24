import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Chat from "../chat/Chat";
import Signup from "../signup/Signup";
import Login from "../login/Login";

const RootRouter = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Layout/>}>
                <Route exact path="/" element={<Chat />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/login" element={<Login />} />
            </Route>
            </Routes>
        </Router>
    );
};

export default RootRouter;