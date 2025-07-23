import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import IncomeOverview from "../../Components/Income/IncomeOverview";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPaths";
import Modal from "../../Components/Modal";
import AddIncomeForm from "../../Components/Income/AddIncomeForm";
import toast from "react-hot-toast";

const Income = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

    // Get all incomes details
    const fetchIncomeDetails = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(
                API_PATHS.INCOME.GET_ALL_INCOME
            );
            console.log("Fetched income:", response.data);
            if (response.data) {
                setIncomeData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    // Add Income
    const handleAddIncome = async (income) => {
        const { source, amount, date, icon } = income;

        // validation checks
        if (!source.trim()) {
            toast.error("Source is required.");
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
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                source,
                amount,
                date,
                icon,
            });

            setOpenAddIncomeModal(false);
            toast.success("Income added successfully");
            fetchIncomeDetails();
        } catch (error) {
            console.error(
                "Error adding income:",
                error.response?.data?.message || error.message
            );
        }
    };

    // Delete Income
    const deleteIncome = async (id) => {};

    // Download Income Details
    const handleDownloadIncomeDetails = async () => {};

    useEffect(() => {
        fetchIncomeDetails();

        return () => {};
    }, []);
    console.log("IncomeData before render:", incomeData);

    return (
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        {loading ? (
                            <div className="text-center py-10 text-gray-400">
                                Loading income data...
                            </div>
                        ) : (
                            <IncomeOverview
                                transactions={incomeData}
                                onAddIncome={() => setOpenAddIncomeModal(true)}
                            />
                        )}
                    </div>
                </div>

                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm onAddIncome={handleAddIncome} />
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Income;
