import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

const Logout = () => {
    const { user, clearUser } = useContext(userContext);
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    });
    return <div>Logout</div>;
};

export default Logout;
