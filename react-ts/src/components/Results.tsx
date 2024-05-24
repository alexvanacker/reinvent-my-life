import React, { useEffect, useState } from 'react';
import { categories } from '../assets/categories';
import { Question as QuestionType, Responses } from '../types';

interface ResultsProps {
  questions: QuestionType;
}

const Results: React.FC<ResultsProps> = ({ questions }) => {
  const [responses, setResponses] = useState<Responses>({});

  useEffect(() => {
    const loadResponsesFromLocalStorage = () => {
      const loadedResponses: Responses = {};
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('global-questions-')) {
          const [x, _, id, type] = key.split('-');
          if (!loadedResponses[id]) {
            loadedResponses[id] = { enfance: '', maintenant: '' };
          }
          loadedResponses[id][type] = localStorage.getItem(key) || '';
        }
      });
      setResponses(loadedResponses);
    };

    loadResponsesFromLocalStorage();
  }, []);

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
      <h2 className="text-2xl font-semibold mb-4">Résultats</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Schéma</th>
            <th className="py-2">Plus haute côte</th>
            <th className="py-2"></th>
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
