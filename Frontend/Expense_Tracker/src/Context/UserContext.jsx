import React, { createContext, useState } from "react";

export const userContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    // Function to clear user data ie, on logout
    const clearUser = () => {
        setUser(null);
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
