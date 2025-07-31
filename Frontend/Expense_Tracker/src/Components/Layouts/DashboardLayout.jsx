import { useContext } from "react";
import { userContext } from "../../Context/UserContext";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(userContext);
    // console.log(user);

    return (
        <div>
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <SideMenu activeMenu={activeMenu}></SideMenu>
                    </div>
                    <div className="grow mx-5"> {children} </div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
