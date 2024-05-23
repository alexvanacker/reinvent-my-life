import React from 'react';
import { Question as QuestionType, Responses } from '../types';
import { categories } from '../assets/categories';

interface ResultsProps {
    responses: Responses;
    questions: QuestionType;
}

const Results: React.FC<ResultsProps> = ({ responses, questions }) => {
    const getCategoryResults = () => {
        return Object.entries(categories).map(([category, questionIds]) => {
            let highestScore = 0;
            let checkmark = false;

            questionIds.forEach(id => {
                const response = responses[id];
                if (response) {
                    const enfanceScore = parseInt(response.enfance, 10);
                    const maintenantScore = parseInt(response.maintenant, 10);
                    highestScore = Math.max(highestScore, enfanceScore, maintenantScore);
                }
            });

            if (highestScore >= 4) {
                checkmark = true;
            }

            return { category, highestScore, checkmark };
        });
    };

    const categoryResults = getCategoryResults();

    return (
        <div className="bg-white p-6 rounded shadow-md max-w-4xl w-full mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Results</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Category</th>
                        <th className="py-2">Highest Score</th>
                        <th className="py-2">Checkmark</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryResults.map((result, index) => (
                        <tr key={index} className="text-center">
                            <td className="border px-4 py-2">{result.category}</td>
                            <td className="border px-4 py-2">{result.highestScore}</td>
                            <td className="border px-4 py-2">{result.checkmark ? "✔️" : ""}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Results;
