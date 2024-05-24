import React, { useState, useEffect } from 'react';
import { Response } from '../types';
import useLocalStorage from '../hooks/localStorage';

interface QuestionProps {
    id: string;
    text: string;
    onNext: (id: string, enfance: string, maintenant: string) => void;
    onPrevious: () => void;
    response: Response | undefined;
}

const ratingLabels = [
    "Absolument faux",
    "Faux dans l'ensemble",
    "Plus faux que vrai",
    "Modérément vrai",
    "Vrai dans l'ensemble",
    "Absolument vrai"
];

const getKidQuestionId = (id:string) => `global-questions-${id}-enfance`;
const getNowQuestionId = (id:string) => `global-questions-${id}-maintenant`;

const Question: React.FC<QuestionProps> = ({ id, text, onNext, onPrevious, response }) => {

    const kidKey = getKidQuestionId(id);
    const nowKey = getNowQuestionId(id);

    const [enfance, setEnfance] = useLocalStorage(kidKey, '');
    const [maintenant, setMaintenant] = useLocalStorage(nowKey, '');

    useEffect(() => {
        if (response) {
            setEnfance(response.enfance);
            setMaintenant(response.maintenant);
        }
    }, [response]);

    useEffect(() => {
    // Initialize state from local storage on mount
    const storedEnfance = localStorage.getItem(kidKey);
    const storedMaintenant = localStorage.getItem(nowKey);

    if (storedEnfance) {
      setEnfance(storedEnfance);
    }
    if (storedMaintenant) {
      setMaintenant(storedMaintenant);
    }
  }, [kidKey, nowKey, setEnfance, setMaintenant]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (enfance && maintenant) {
      // Update local storage before navigating to the next question
      localStorage.setItem(kidKey, enfance);
      localStorage.setItem(nowKey, maintenant);
      onNext(id, enfance, maintenant);
    } else {
      alert("Please provide ratings for both fields.");
    }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">{text}</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Enfance:
                    <select
                        value={enfance}
                        onChange={(e) => setEnfance(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select</option>
                        {ratingLabels.map((label, index) => (
                            <option key={index} value={index + 1}>
                                {index + 1} - {label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Maintenant:
                    <select
                        value={maintenant}
                        onChange={(e) => setMaintenant(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select</option>
                        {ratingLabels.map((label, index) => (
                            <option key={index} value={index + 1}>
                                {index + 1} - {label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onPrevious}
                    className="py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default Question;
