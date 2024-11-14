import { useState } from 'react';

const TaxCalculator: React.FC = () => {
    const [annualIncome, setAnnualIncome] = useState<number>(50000);
    const [taxRate, setTaxRate] = useState<number>(20);
    const [totalTax, setTotalTax] = useState<number | null>(null);

    const calculateTax = () => {
        const tax = (annualIncome * taxRate) / 100;
        setTotalTax(tax);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Tax Calculator</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Annual Income (₹):</label>
                <input 
                    type="number" 
                    value={annualIncome} 
                    onChange={(e) => setAnnualIncome(Number(e.target.value))} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Tax Rate (%):</label>
                <input 
                    type="number" 
                    step="0.01"
                    value={taxRate} 
                    onChange={(e) => setTaxRate(Number(e.target.value))} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />
            </div>
            <button 
                onClick={calculateTax} 
                className="w-full bg-red-500 text-white rounded-md py-2 hover:bg-red-600"
            >
                Calculate Total Tax Owed
            </button>
            <div className="mt-4 text-lg font-semibold">
                Total Tax Owed: ₹{totalTax !== null ? totalTax.toFixed(2) : 'N/A'}
            </div>
        </div>
    );
};

export default TaxCalculator;