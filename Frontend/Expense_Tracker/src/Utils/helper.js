import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
};

export const addThousandsSeperator1 = (num) => {
    console.log("Input to addThousandsSeperator:", num);
    if (num === null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger;
};

export const addThousandsSeperator = (num) => {
    console.log("Input to addThousandsSeperator:", num);

    if (num === null || num === undefined) return "";

    // Remove all characters except digits and decimal point
    const cleaned = String(num).replace(/[^\d.]/g, "");

    const numberValue = Number(cleaned);

    if (isNaN(numberValue)) {
        console.warn("Invalid number after cleaning:", cleaned);
        return "";
    }

    const [integerPart, fractionalPart] = numberValue.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));
    return chartData;
};

export const prepareIncomeChartData = (data = []) => {
    const sortedData = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        source: item?.source,
    }));
    return chartData;
};

export const prepareExpenseLineChartData1 = (data = []) => {
    const sortedData = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        category: item?.category,
    }));
    return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
    // Step 1: Sort data by date
    const sortedData = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Step 2: Group by day and sum amounts
    const grouped = sortedData.reduce((acc, curr) => {
        const day = moment(curr.date).format("YYYY-MM-DD");
        if (!acc[day]) {
            acc[day] = {
                date: curr.date,
                amount: 0,
            };
        }
        acc[day].amount += curr.amount;
        return acc;
    }, {});

    // Step 3: Convert to chart format

    const chartData = Object.entries(grouped).map(
        ([day, { date, amount }]) => ({
            month: moment(date).format("Do MMM"),
            amount: amount,
        })
    );

    return chartData;
};
