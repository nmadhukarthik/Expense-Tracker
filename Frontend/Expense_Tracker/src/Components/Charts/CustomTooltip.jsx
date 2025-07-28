import React from "react";
import { addThousandsSeperator } from "../../Utils/helper";

const CustomTooltip = ({ active, payload }) => {
    const amount = addThousandsSeperator(
        payload[0]?.value || payload[0]?.payload.amount
    );
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-md rounded-lg p-2 boreder border-gray-300">
                <p className="text-xs font-semibold text-blue-900 mb-1">
                    {payload[0]?.payload.name ||
                        payload[0]?.payload.category ||
                        payload[0]?.payload.source}
                </p>
                <p className="text-sm text-gray-600">
                    Amount:{" "}
                    <span className="text-sm font-medium text-gray-900">
                        ${amount}
                    </span>
                </p>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;
