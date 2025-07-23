import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Home from "./Pages/Dashboard/Home";
import Income from "./Pages/Dashboard/Income";
import Expense from "./Pages/Dashboard/Expense";
import UserProvider from "./Context/UserContext";
import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/signup" exact element={<SignUp />} />
                    <Route path="/dashboard" exact element={<Home />} />
                    <Route path="/income" exact element={<Income />} />
                    <Route path="/expense" exact element={<Expense />} />
                </Routes>
            </Router>

            <Toaster
                toastOptions={{
                    classname: " ",
                    style: {
                        fontSize: "13px",
                    },
                }}
            />
        </UserProvider>
    );
};

export default App;

const Root = () => {
    const isAuthenticate = localStorage.getItem("token");
    return isAuthenticate ? (
        <Navigate to={"/dashboard"} />
    ) : (
        <Navigate to={"/login"} />
    );
};
