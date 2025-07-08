import { useState, useContext } from "react";
import AuthLayout from "../../Components/Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Components/Inputs/Input";
import { validateEmail } from "../../Utils/helper";
import ProfilePhotoSelector from "../../Components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPaths";
import { userContext } from "../../Context/UserContext";
import uploadImage from "../../Utils/uploadImage";

const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { updateUser } = useContext(userContext);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        let profileImageUrl = "";

        if (!fullName) {
            return setError("Please enter your name");
            // return;
        }
        if (!validateEmail(email)) {
            return setError("Please enter a valid email address");
            // return;
        }
        if (!password) {
            return setError("Please enter a password");
            // return;
        }

        setError("");

        //Signup API call

        try {
            // Upload image if present
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl,
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
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">
                    Create an account
                </h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Join us today by entering your details below
                </p>

                <form onSubmit={handleSignup}>
                    <ProfilePhotoSelector
                        image={profilePic}
                        setImage={setProfilePic}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            label="Full Name"
                            placeholder="Enter your name"
                            type="text"
                        />

                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            placeholder="aria@gmail.com"
                            type="text"
                        />
                    </div>
                    <div className="col-span-2">
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeholder="Minimum 8 characters"
                            type="password"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs pb-2.5">{error}</p>
                    )}

                    <button type="submit" className="btn-primary">
                        SIGNUP
                    </button>

                    <p className="text-[15px] text-slate-800 mt-3">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-[#0c3270] underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default SignUp;
