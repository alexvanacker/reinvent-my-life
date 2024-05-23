// src/components/Results.tsx
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
        <div>
            <h2>Results</h2>
            <table>
                <thead>
                    <tr>
                        <th>Schema</th>
                        <th>Côte la plus haute</th>
                        <th>Checkmark</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryResults.map((result, index) => (
                        <tr key={index}>
                            <td>{result.category}</td>
                            <td>{result.highestScore}</td>
                            <td>{result.checkmark ? "✔️" : ""}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Results;
