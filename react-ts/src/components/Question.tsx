// src/components/Question.tsx
import React, { useState, useEffect } from 'react';
import { Response } from '../types';

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

const Question: React.FC<QuestionProps> = ({ id, text, onNext, onPrevious, response }) => {
    const [enfance, setEnfance] = useState<string>('');
    const [maintenant, setMaintenant] = useState<string>('');

    useEffect(() => {
        if (response) {
            setEnfance(response.enfance);
            setMaintenant(response.maintenant);
        }
    }, [response]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (enfance && maintenant) {
            onNext(id, enfance, maintenant);
        } else {
            alert("Please provide ratings for both fields.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{text}</h2>
            <label>
                Enfance:
                <select value={enfance} onChange={(e) => setEnfance(e.target.value)}>
                    <option value="">Select</option>
                    {ratingLabels.map((label, index) => (
                        <option key={index} value={index + 1}>
                            {index + 1} - {label}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Maintenant:
                <select value={maintenant} onChange={(e) => setMaintenant(e.target.value)}>
                    <option value="">Select</option>
                    {ratingLabels.map((label, index) => (
                        <option key={index} value={index + 1}>
                            {index + 1} - {label}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <button type="button" onClick={onPrevious}>Previous</button>
            <button type="submit">Next</button>
        </form>
    );
};

export default Question;
