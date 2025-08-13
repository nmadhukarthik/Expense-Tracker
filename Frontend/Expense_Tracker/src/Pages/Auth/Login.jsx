import { useState, useContext } from "react";
import AuthLayout from "../../Components/Layouts/AuthLayout";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    const location = useLocation();
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
            // console.log(user);
            if (token && user) {
                // setTimeout(() => {
                //     if (
                //         window.location.pathname === "/login" ||
                //         window.location.pathname === "/signup"
                //     ) {
                //         navigate("/dashboard");
                //         window.location.reload();
                //     } else {
                //         window.location.reload();
                //     }
                // }, 1000);
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                // console.log("Token Saved:", localStorage.getItem("token"));
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
                <h3 className="text-xl font-semibold text-black">Welcome!</h3>
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

                    <p className="text-[15px] text-slate-800 mt-3">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-medium text-[#0c3270] underline"
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

// import { useState, useContext } from "react";
// import AuthLayout from "../../Components/Layouts/AuthLayout";
// import { Link, useNavigate } from "react-router-dom";
// import Input from "../../Components/Inputs/Input";
// import { validateEmail } from "../../Utils/helper";
// import axiosInstance from "../../Utils/axiosInstance";
// import { API_PATHS } from "../../Utils/apiPaths";
// import { userContext } from "../../Context/UserContext";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");

//     const { updateUser } = useContext(userContext);
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         if (!validateEmail(email))
//             return setError("Enter a valid email address");
//         if (!password) return setError("Enter a password");

//         setError("");

//         try {
//             const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
//                 email,
//                 password,
//             });
//             const { token, user } = res.data;

//             if (token && user) {
//                 localStorage.setItem("token", token);
//                 localStorage.setItem("user", JSON.stringify(user));
//                 updateUser(user);
//                 navigate("/dashboard");
//             }
//         } catch (error) {
//             const msg =
//                 error?.response?.data?.message ||
//                 "Something went wrong. Please try again.";
//             setError(msg);
//         }
//     };

//     const handleGoogleSuccess = async (credentialResponse) => {
//         try {
//             const tokenId = credentialResponse.credential;
//             const decoded = jwtDecode(tokenId);
//             console.log("Google User:", decoded); // optional

//             const res = await axiosInstance.post(API_PATHS.AUTH.GOOGLE_LOGIN, {
//                 token: tokenId,
//             });

//             const { token, user } = res.data;

//             if (token && user) {
//                 localStorage.setItem("token", token);
//                 localStorage.setItem("user", JSON.stringify(user));
//                 updateUser(user);
//                 navigate("/dashboard");
//             }
//         } catch (error) {
//             console.error("Google login failed:", error);
//             setError("Google login failed");
//         }
//     };

//     return (
//         <AuthLayout>
//             <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
//                 <h3 className="text-xl font-semibold text-black">Welcome!</h3>
//                 <p className="text-xs text-slate-700 mt-[5px] mb-6">
//                     Please enter your details to login
//                 </p>

//                 <form onSubmit={handleLogin}>
//                     <Input
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         label="Email Address"
//                         placeholder="aria@gmail.com"
//                         type="text"
//                     />
//                     <Input
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         label="Password"
//                         placeholder="Minimum 8 characters"
//                         type="password"
//                     />
//                     {error && (
//                         <p className="text-red-500 text-xs pb-2.5">{error}</p>
//                     )}

//                     <button type="submit" className="btn-primary w-full">
//                         LOGIN
//                     </button>

//                     <div className="my-4 text-center text-sm text-gray-600">
//                         OR
//                     </div>

//                     <div className="flex justify-center  ">
//                         <GoogleLogin
//                             onSuccess={handleGoogleSuccess}
//                             onError={() => setError("Google login failed")}
//                         />
//                     </div>

//                     <p className="text-[15px] text-slate-800 mt-3">
//                         Don't have an account?{" "}
//                         <Link
//                             to="/signup"
//                             className="font-medium text-[#0c3270] underline"
//                         >
//                             Signup
//                         </Link>
//                     </p>
//                 </form>
//             </div>
//         </AuthLayout>
//     );
// };

// export default Login;
