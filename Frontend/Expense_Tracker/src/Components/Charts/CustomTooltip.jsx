import React from "react";

const CustomTooltip = ({ active, payload }) => {
    console.log(payload);
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-md rounded-lg p-2 boreder border-gray-300">
                <p className="text-xs font-semibold text-blue-900 mb-1">
                    {payload[0]?.payload.category || payload[0]?.name}
                </p>
                <p className="text-sm text-gray-600">
                    Amount:{" "}
                    <span className="text-sm font-medium text-gray-900">
                        ${payload[0]?.value || payload[0]?.payload.amount}
                    </span>
                </p>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;
