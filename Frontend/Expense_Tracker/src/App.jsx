import React, { useContext } from "react";
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
import { userContext } from "./Context/UserContext";
import { Toaster } from "react-hot-toast";
import Logout from "./Pages/Auth/Logout";

const App = () => {
    const { user, loading } = useContext(userContext);

    if (loading) return <div>Loading...</div>; // prevents redirect loop
    return (
        <>
            <Router>
                <Routes>
                    <Route path="*" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <Navigate to={user ? "/dashboard" : "/login"} />
                        }
                    />
                    <Route
                        path="/login"
                        exact
                        element={
                            user ? <Navigate to="/dashboard" /> : <Login />
                        }
                    />
                    <Route
                        path="/signup"
                        exact
                        element={
                            !user ? <SignUp /> : <Navigate to="/dashboard" />
                        }
                    />
                    <Route path="/dashboard" exact element={<Home />} />
                    <Route path="/income" exact element={<Income />} />
                    <Route path="/expense" exact element={<Expense />} />
                    <Route path="/logout" element={<Logout />} />
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
        </>
    );
};

export default App;
