import { useState } from 'react';

const EMICalculator: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState<number>(100000);
    const [interestRate, setInterestRate] = useState<number>(9);
    const [loanTenure, setLoanTenure] = useState<number>(12);
    const [emi, setEmi] = useState<number>(0);

    const calculateEMI = () => {
        const monthlyInterestRate = interestRate / 12 / 100;
        const numberOfPayments = loanTenure * 12;
        const emiValue = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        setEmi(emiValue);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">EMI Calculator</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Loan Amount:</label>
                <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Interest Rate (%):</label>
                <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Loan Tenure (years):</label>
                <input type="number" value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <button onClick={calculateEMI} className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600">Calculate EMI</button>
            <div className="mt-4 text-lg font-semibold">Monthly EMI: ₹{emi.toFixed(2)}</div>
        </div>
    );
};

export default EMICalculator;