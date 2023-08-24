import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Chat from "../chat/Chat";


const RootRouter = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Layout/>}>
                <Route exact path="/" element={<Chat />} />
            </Route>
            </Routes>
        </Router>
    );
};

export default RootRouter;