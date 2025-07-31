import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Label,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";
import { addThousandsSeperator } from "../../Utils/helper";

const CustomPieChart = ({
    data,
    label,
    totalAmount,
    colors,
    showTextAnchor,
}) => {
    // console.log("totalAmount:", totalAmount);
    const amount = addThousandsSeperator(totalAmount);
    // console.log(amount);
    return (
        <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                        />
                    ))}

                    {showTextAnchor && (
                        <Label
                            position="center"
                            content={() => (
                                <g>
                                    <text
                                        x="50%"
                                        y="50%"
                                        dy={-25}
                                        textAnchor="middle"
                                        fill="#666"
                                        fontSize="14px"
                                    >
                                        {label}
                                    </text>
                                    <text
                                        x="50%"
                                        y="50%"
                                        dy={8}
                                        textAnchor="middle"
                                        fill="#333"
                                        fontSize="24px"
                                        fontWeight="600"
                                    >
                                        ${amount}
                                    </text>
                                </g>
                            )}
                        />
                    )}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
