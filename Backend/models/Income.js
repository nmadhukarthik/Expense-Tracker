import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        icon: {
            type: String,
        },
        source: {
            type: String, // Eg: Salary, Freelancer etc...
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

const IncomeModel = mongoose.model("Income", IncomeSchema);

export default IncomeModel;
