import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import { useUserAuth } from "../../Hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPaths";
import InfoCard from "../../Components/Cards/InfoCard";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeperator } from "../../Utils/helper";
import RecentTransactions from "../../Components/Dashboard/RecentTransactions";
import FinancialOverview from "../../Components/Dashboard/FinancialOverview";
import ExpenseTransactions from "../../Components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../Components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../Components/Dashboard/RecentIncomeWithChart";

const Home = () => {
    useUserAuth();

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(
                API_PATHS.DASHBOARD.GET_DATA
            );

            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        return () => {};
    }, []);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard
                        icon={<IoMdCard />}
                        label="Total Balance"
                        value={addThousandsSeperator(
                            dashboardData?.totalBalance || 0
                        )}
                        color="bg-primary"
                    />

                    <InfoCard
                        icon={<LuWalletMinimal />}
                        label="Total Income"
                        value={addThousandsSeperator(
                            dashboardData?.totalIncome || 0
                        )}
                        color="bg-green-500"
                    />

                    <InfoCard
                        icon={<LuHandCoins />}
                        label="Total Expense"
                        value={addThousandsSeperator(
                            dashboardData?.totalExpense || 0
                        )}
                        color="bg-red-500"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <RecentTransactions
                        transactions={dashboardData?.recentTransactions}
                        onSeeMore={() => navigate("/expense")}
                    />
                    <FinancialOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpense={dashboardData?.totalExpense || 0}
                    />
                    <ExpenseTransactions
                        transactions={
                            dashboardData?.last30DaysExpenses?.transactions ||
                            []
                        }
                        onSeeMore={() => navigate("/expense")}
                    />
                    <Last30DaysExpenses
                        data={
                            dashboardData?.last30DaysExpenses?.transactions ||
                            []
                        }
                    />
                    <RecentIncomeWithChart
                        data={
                            dashboardData?.last60DaysIncome?.transactions.slice(
                                0,
                                4
                            ) || []
                        }
                        totalIncome={dashboardData?.totalIncome || 0}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Home;
