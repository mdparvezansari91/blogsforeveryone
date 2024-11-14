import { useState } from 'react';

const RetirementCalculator: React.FC = () => {
    const [currentAge, setCurrentAge] = useState<number>(30);
    const [retirementAge, setRetirementAge] = useState<number>(65);
    const [currentSavings, setCurrentSavings] = useState<number>(50000);
    const [annualContribution, setAnnualContribution] = useState<number>(10000);
    const [annualReturnRate, setAnnualReturnRate] = useState<number>(5);
    const [totalSavings, setTotalSavings] = useState<number | null>(null);

    const calculateRetirementSavings = () => {
        const yearsToRetirement = retirementAge - currentAge;
        let futureValue = currentSavings;

        for (let i = 0; i < yearsToRetirement; i++) {
            futureValue = (futureValue + annualContribution) * (1 + annualReturnRate / 100);
        }

        setTotalSavings(futureValue);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Retirement Calculator</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Current Age:</label>
                <input 
                    type="number" 
                    value={currentAge} 
                    onChange={(e) => setCurrentAge(Number(e.target.value))} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Retirement Age:</label>
                <input 
                    type="number" 
                    value={retirementAge} 
                    onChange={(e) => setRetirementAge(Number(e.target.value))} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Current Savings (₹):</label>
                <input 
                    type="number" 
                    value={currentSavings} 
                    onChange={(e) => setCurrentSavings(Number(e.target.value))} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Annual Contribution (₹):</label>
                <input 
                    type="number" 
                    value={annualContribution} 
                    onChange={(e) => setAnnualContribution(Number(e.target.value))} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Expected Annual Return Rate (%):</label>
                <input 
                    type="number" 
                    step="0.01"
                    value={annualReturnRate} 
                    onChange={(e) => setAnnualReturnRate(Number(e.target.value))} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />
            </div>
            <button 
                onClick={calculateRetirementSavings} 
                className="w-full bg-orange-500 text-white rounded-md py-2 hover:bg-orange-600"
            >
                Calculate Total Savings at Retirement
            </button>
            <div className="mt-4 text-lg font-semibold">
                Total Savings at Retirement: ₹{totalSavings !== null ? totalSavings.toFixed(2) : 'N/A'}
            </div>
        </div>
    );
};

export default RetirementCalculator;