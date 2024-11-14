import { useState } from 'react';

const InvestmentCalculator: React.FC = () => {
    const [initialInvestment, setInitialInvestment] = useState<number>(10000);
    const [annualInterestRate, setAnnualInterestRate] = useState<number>(5);
    const [years, setYears] = useState<number>(10);
    const [futureValue, setFutureValue] = useState<number | null>(null);

    const calculateInvestment = () => {
        const rate = annualInterestRate / 100;
        const value = initialInvestment * Math.pow(1 + rate, years);
        setFutureValue(value);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Investment Calculator</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Initial Investment (₹):</label>
                <input 
                    type="number" 
                    value={initialInvestment} 
                    onChange={(e) => setInitialInvestment(Number(e.target.value))} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Annual Interest Rate (%):</label>
                <input 
                    type="number" 
                    step="0.01"
                    value={annualInterestRate} 
                    onChange={(e) => setAnnualInterestRate(Number(e.target.value))} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Investment Duration (years):</label>
                <input 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(Number(e.target.value))} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />
            </div>
            <button 
                onClick={calculateInvestment} 
                className="w-full bg-green-500 text-white rounded-md py-2 hover:bg-green-600"
            >
                Calculate Future Value
            </button>
            <div className="mt-4 text-lg font-semibold">
                Future Value: ₹{futureValue !== null ? futureValue.toFixed(2) : 'N/A'}
            </div>
        </div>
    );
};

export default InvestmentCalculator;