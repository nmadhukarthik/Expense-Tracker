import React from "react";
import pic from "../../assets/Images/graphs.webp";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row w-full ">
            <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 relative z-10 ">
                <h2 className="text-6xl font-medium text-black ">
                    Expense Tracker
                </h2>
                {children}
            </div>
            <div className="hidden  md:block  md:w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative z-0 ">
                <div className="w-48 h-48 rounded-[40px] bg-[#0c3270] absolute -top-7 -left-5 -z-10 animate-float"></div>
                {/* -z-10 means negative z index z = -10 which places it behind z-0 or z default  */}
                <div className="w-48 h-48 rounded-[40px] border-[20px] border-[#0c3270] absolute top-[30%] right-[10px] -z-10 animate-float"></div>
                <div className="w-48 h-48 rounded-[40px] bg-[#0c3270] absolute -bottom-7 -left-5 -z-10 animate-float"></div>
                <div className="grid grid-cols-1 z-20">
                    <StatsInfoCard
                        icon={<LuTrendingUpDown />}
                        label="Track your income and expenses"
                        value="Master your money, all in one spot"
                        color="bg-[#0b61e5]"
                    />
                </div>
                <img
                    src={pic}
                    className="w-64 lg:w-[90%] rounded-[40px] absolute bottom-10 sladow-lg opacity-85 shadow-blue-400/10 hover:scale-105 hover:shadow-xl"
                />
            </div>
        </div>
    );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border-gray-200/50 hover:scale-105 hover:shadow-xl">
            <div
                className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
            >
                {icon}
            </div>
            <div>
                <h6 className="text-xs text-gray-500 mb-1"> {label}</h6>
                <span className=" text-[20px]"> {value}</span>
            </div>
        </div>
    );
};
