"use client"
import React, { useState } from 'react';

export default function DocxToPdf() {
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            alert('Please upload a DOCX file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/convert', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'converted_file.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            const errorText = await response.text();
            alert(`Error: ${errorText}`);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-6">DOCX to PDF Converter</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="file">
                            Upload DOCX File
                        </label>
                        <input
                            type="file"
                            accept=".docx"
                            onChange={handleChange}
                            required
                            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Convert
                    </button>
                </form>
            </div>
        </div>
    );
}