import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#0C3270", "#fa2c37", "#00c950", "#DAED38"];
//   CCCBA9
const RecentIncomeWithChart = ({ data, totalIncome }) => {
    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));
        setChartData(dataArr);
    };

    useEffect(() => {
        prepareChartData();
        return () => {};
    }, [data]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg"> Last 60 Days Income</h5>
            </div>
            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                colors={COLORS}
            />
        </div>
    );
};

export default RecentIncomeWithChart;
