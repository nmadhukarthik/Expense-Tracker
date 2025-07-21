import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import IncomeOverview from "../../Components/Income/IncomeOverview";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPaths";
import Modal from "../../Components/Modal";
import AddIncomeForm from "../../Components/Income/AddIncomeForm";

const Income = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(true);

    // Get all incomes details
    const fetchIncomeDetails = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(
                API_PATHS.INCOME.GET_ALL_INCOME
            );
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
    const handleAddIncome = async (income) => {};

    // Delete Income
    const deleteIncome = async (id) => {};

    // Download Income Details
    const handleDownloadIncomeDetails = async () => {};

    useEffect(() => {
        fetchIncomeDetails();

        return () => {};
    }, []);

    return (
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
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
