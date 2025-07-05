import { useState, useContext } from "react";
import AuthLayout from "../../Components/Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Components/Inputs/Input";
import { validateEmail } from "../../Utils/helper";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPaths";
import { userContext } from "../../Context/UserContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { updateUser } = useContext(userContext);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Enter a valid email address");
            return;
        }

        if (!password) {
            setError("Enter a password");
            return;
        }

        setError("");

        //Login API call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });
            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. please try again");
            }
        }
    };

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">
                    Welcome back!
                </h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Please enter your details to login
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email Address"
                        placeholder="aria@gmail.com"
                        type="text"
                    />

                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password "
                        placeholder="Minimum 8 characters"
                        type="password"
                    />

                    {error && (
                        <p className="text-red-500 text-xs pb-2.5"> {error} </p>
                    )}

                    <button type="submit" className="btn-primary">
                        LOGIN
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-medium text-primary underline"
                        >
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;
