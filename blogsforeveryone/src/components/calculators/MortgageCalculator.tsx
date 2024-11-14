import { useState } from 'react';

const MortgageCalculator: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState<number>(300000);
    const [interestRate, setInterestRate] = useState<number>(3.5);
    const [loanTerm, setLoanTerm] = useState<number>(30);
    const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

    const calculateMortgage = () => {
        const monthlyInterestRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;
        const mortgagePayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        setMonthlyPayment(mortgagePayment);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Mortgage Calculator</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Loan Amount (₹):</label>
                <input 
                    type="number" 
                    value={loanAmount} 
                    onChange={(e) => setLoanAmount(Number(e.target.value))} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Interest Rate (%):</label>
                <input 
                    type="number" 
                    step="0.01"
                    value={interestRate} 
                    onChange={(e) => setInterestRate(Number(e.target.value))} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Loan Term (years):</label>
                <input 
                    type="number" 
                    value={loanTerm} 
                    onChange={(e) => setLoanTerm(Number(e.target.value))} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />
            </div>
            <button 
                onClick={calculateMortgage} 
                className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
            >
                Calculate Mortgage
            </button>
            <div className="mt-4 text-lg font-semibold">
                Monthly Payment: ₹{monthlyPayment !== null ? monthlyPayment.toFixed(2) : 'N/A'}
            </div>
        </div>
    );
};

export default MortgageCalculator;