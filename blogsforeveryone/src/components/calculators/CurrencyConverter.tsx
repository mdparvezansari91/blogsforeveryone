import { useState } from 'react';

const CurrencyConverter: React.FC = () => {
    const [amount, setAmount] = useState<number>(1);
    const [exchangeRate, setExchangeRate] = useState<number>(1);
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

    const convertCurrency = () => {
        const result = amount * exchangeRate;
        setConvertedAmount(result);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Currency Converter</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Amount:</label>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Exchange Rate:</label>
                <input 
                    type="number" 
                    step="0.01"
                    value={exchangeRate} 
                    onChange={(e) => setExchangeRate(Number(e.target.value))} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />
            </div>
            <button 
                onClick={convertCurrency} 
                className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
            >
                Convert Currency
            </button>
            <div className="mt-4 text-lg font-semibold">
                Converted Amount: {convertedAmount !== null ? convertedAmount.toFixed(2) : 'N/A'}
            </div>
        </div>
    );
};

export default CurrencyConverter;