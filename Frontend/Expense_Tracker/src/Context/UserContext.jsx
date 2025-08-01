import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATHS } from "../Utils/apiPaths";

export const userContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        // console.log("Token found:", token);
        const storedUser = localStorage.getItem("user");

        // console.log("UserProvider useEffect, token:", token);
        // console.log("UserProvider useEffect, storedUser:", storedUser);

        if (token && storedUser) {
            setUser(JSON.parse(storedUser)); // Optimistic render
        }

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        axiosInstance
            .get(API_PATHS.VERIFY.VERIFY, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log("Verify API response:", res);
                setUser(res.data.user);
                localStorage.setItem("user", JSON.stringify(res.data.user)); // update localStorage if backend returns a fresh copy
            })
            .catch((err) => {
                console.error(
                    "Token verification failed:",
                    err.response?.data?.message
                );
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         setUser(null);
    //         setLoading(false);
    //         return;
    //     }

    //     axiosInstance
    //         .get(API_PATHS.VERIFY, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //         .then((res) => {
    //             console.log(res);
    //             setUser(res.data.user);
    //         })
    //         .catch((err) => {
    //             console.error(
    //                 "Token verification failed:",
    //                 err.response?.data?.message
    //             );
    //             localStorage.removeItem("token");
    //             localStorage.removeItem("user");
    //             setUser(null);
    //         })
    //         .finally(() => setLoading(false));
    // }, []);

    // useEffect(() => {
    //      On initial load, restore user from localStorage if available
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     }
    // }, []);

    // Function to update user data

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // Function to clear user data ie, on logout
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <userContext.Provider
            value={{
                user,
                updateUser,
                clearUser,
                loading,
            }}
        >
            {children}
        </userContext.Provider>
    );
};

export default UserProvider;
