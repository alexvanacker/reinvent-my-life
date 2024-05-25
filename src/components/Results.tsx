import React, { useEffect, useState } from 'react';
import { categories } from '../assets/categories';
import { Responses, Response } from '../types';

const Results: React.FC = () => {
  const [responses, setResponses] = useState<Responses>({});

  useEffect(() => {
    const loadResponsesFromLocalStorage = () => {
      const loadedResponses: Responses = {};
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('global-questions-')) {
          const [_x, _, y, z] = key.split('-');
          const questionId: number = parseInt(y, 10);
          const childOrNow: string = z;
          if (!loadedResponses[questionId]) {
            loadedResponses[questionId] = { enfance: 0, maintenant: 0 };
          }

           // Safely convert localStorage string to number
          const value = parseInt(localStorage.getItem(key) || '0', 10);

          // Type guard to ensure childOrNow is either 'enfance' or 'maintenant'
          if (childOrNow === 'enfance' || childOrNow === 'maintenant') {
            loadedResponses[questionId][childOrNow] = value;
          }
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

      questionIds.forEach((_value, id: number) => {
        const response: Response = responses[id];
        if (response) {
          const enfanceScore = response.enfance;
          const maintenantScore = response.maintenant;
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
