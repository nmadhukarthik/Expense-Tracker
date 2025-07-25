import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPaths";
import toast from "react-hot-toast";
import ExpenseOverview from "../../Components/Expense/ExpenseOverview";

const Expense = () => {
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    // Get all expense details
    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(
                API_PATHS.EXPENSE.GET_ALL_EXPENSE
            );
            // console.log("Fetched expense:", response.data);
            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    // Add Expense
    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = expense;

        // validation checks
        if (!category.trim()) {
            toast.error("Category is required.");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) === 0) {
            toast.error("Amount should be a valid number greater then 0.");
            return;
        }
        if (!date) {
            toast.error("Date is required.");
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amount,
                date,
                icon,
            });

            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.error(
                "Error adding expense:",
                error.response?.data?.message || error.message
            );
        }
    };

    useEffect(() => {
        fetchExpenseDetails();

        return () => {};
    }, []);
    // console.log("ExpenseData before render:", expenseData);

    return (
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="">
                    {loading ? (
                        <div className="text-center py-10 text-gray-400">
                            Loading expense data...
                        </div>
                    ) : (
                        <ExpenseOverview
                            transactions={expenseData}
                            onAddExpense={() => setOpenAddExpenseModal(true)}
                        />
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Expense;
