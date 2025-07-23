import React, { useEffect, useState } from "react";
import { prepareIncomeChartData } from "../../Utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        console.log("Transactions passed to IncomeOverview:", transactions);
        const result = prepareIncomeChartData(transactions);
        setChartData(result);
        return () => {};
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">Income Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earnings over time and analyse your income
                    </p>
                </div>
                <button className="add-btn" onClick={onAddIncome}>
                    <LuPlus className="text-lg" />
                    Add Income
                </button>
            </div>

            <div className="mt-10">
                {chartData.length === 0 ? (
                    <div className="text-gray-400 text-center">
                        No income data to display
                    </div>
                ) : (
                    <CustomBarChart data={chartData} />
                )}
            </div>
        </div>
    );
};

export default IncomeOverview;
