import { useState } from 'react';

const SavingsCalculator: React.FC = () => {
    const [monthlyDeposit, setMonthlyDeposit] = useState<number>(1000);
    const [annualInterestRate, setAnnualInterestRate] = useState<number>(5);
    const [years, setYears] = useState<number>(10);
    const [totalSavings, setTotalSavings] = useState<number>(0);

    const calculateSavings = () => {
        const monthlyInterestRate = annualInterestRate / 12 / 100;
        const totalMonths = years * 12;
        const futureValue = monthlyDeposit * ((Math.pow(1 + monthlyInterestRate, totalMonths) - 1) / monthlyInterestRate) * (1 + monthlyInterestRate);
        setTotalSavings(futureValue);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Savings Calculator</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Monthly Deposit (₹):</label>
                <input type="number" value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(Number(e.target.value))} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Annual Interest Rate (%):</label>
                <input type="number" value={annualInterestRate} onChange={(e) => setAnnualInterestRate(Number(e.target.value))} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Years:</label>
                <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <button onClick={calculateSavings} className="w-full bg-purple-500 text-white rounded-md py-2 hover:bg-purple-600">Calculate Savings</button>
            <div className="mt-4 text-lg font-semibold">Total Savings: ₹{totalSavings.toFixed(2)}</div>
        </div>
    );
};

export default SavingsCalculator;