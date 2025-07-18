import { useContext, useEffect } from "react";
import { userContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATHS } from "../Utils/apiPaths";

export const useUserAuth = () => {
    const { user, updateUser, clearUser } = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) return;
        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(
                    API_PATHS.AUTH.GET_USER_INFO
                );

                if (isMounted && response.data) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch user info:", error);
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        };

        fetchUserInfo();
        return () => {
            isMounted = false;
        };
    }, [updateUser, clearUser, navigate]);
};
