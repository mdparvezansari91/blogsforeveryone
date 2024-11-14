import { useState } from 'react';

const BMICalculator: React.FC = () => {
    const [weight, setWeight] = useState<number>(70);
    const [height, setHeight] = useState<number>(1.75);
    const [bmi, setBmi] = useState<number | null>(null);

    const calculateBMI = () => {
        const bmiValue = weight / (height * height);
        setBmi(bmiValue);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">BMI Calculator</h1>
 <div className="mb-4">
                <label className="block text-gray-700">Weight (kg):</label>
                <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Height (m):</label>
                <input type="number" step="0.01" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <button onClick={calculateBMI} className="w-full bg-green-500 text-white rounded-md py-2 hover:bg-green-600">Calculate BMI</button>
            <div className="mt-4 text-lg font-semibold">Your BMI: {bmi !== null ? bmi.toFixed(2) : 'N/A'}</div>
        </div>
    );
};

export default BMICalculator;