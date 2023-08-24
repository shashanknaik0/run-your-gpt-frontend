import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Chat from "../chat/Chat";
import Signup from "../signup/Signup";
import Login from "../login/Login";
import ProtectedRoute from "../login/ProtectedRoute";

const RootRouter = () => {
    const [isAuthenticated, setAuthenticated] = useState(false)
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Layout/>}>
                <Route exact path="/" element={<ProtectedRoute setAuthenticated={setAuthenticated}/>} >
                    <Route exact path="/" element={<Chat />} />
                </Route>
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/login" element={<Login setAuthenticated={setAuthenticated}  />} />
            </Route>
            </Routes>
        </Router>
    );
};

export default RootRouter;