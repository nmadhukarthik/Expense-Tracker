import React, { useState } from "react";
import AuthLayout from "../../Components/Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Components/Inputs/Input";
import { validateEmail } from "../../Utils/helper";
import ProfilePhotoSelector from "../../Components/Inputs/ProfilePhotoSelector";

const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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

                        <div className="col-span-2">
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                placeholder="Minimum 8 characters"
                                type="password"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs pb-2.5">{error}</p>
                    )}

                    <button type="submit" className="btn-primary">
                        SIGNUP
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-primary underline"
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
