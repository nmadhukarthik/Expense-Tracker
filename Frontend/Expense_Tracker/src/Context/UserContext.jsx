import React, { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // On initial load, restore user from localStorage if available
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

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
            }}
        >
            {children}
        </userContext.Provider>
    );
};

export default UserProvider;
