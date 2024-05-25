import React, { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/localStorage';

interface QuestionProps {
  id: string;
  text: string;
  onNext: (navigate: NavigateFunction ) => void;
  onPrevious: () => void;
}

const ratingLabels = [
  "Absolument faux",
  "Faux dans l'ensemble",
  "Plus faux que vrai",
  "Modérément vrai",
  "Vrai dans l'ensemble",
  "Absolument vrai"
];

const getKidQuestionId = (id: string) => `global-questions-${id}-enfance`;
const getNowQuestionId = (id: string) => `global-questions-${id}-maintenant`;

const Question: React.FC<QuestionProps> = ({ id, text, onNext, onPrevious }) => {
  const kidKey = getKidQuestionId(id);
  const nowKey = getNowQuestionId(id);

  const [enfance, setEnfance] = useLocalStorage(kidKey, '');
  const [maintenant, setMaintenant] = useLocalStorage(nowKey, '');

  const navigate = useNavigate();

  useEffect(() => {
    // Initialize state from local storage on mount
    const storedEnfance = localStorage.getItem(kidKey);
    const storedMaintenant = localStorage.getItem(nowKey);

    if (storedEnfance) {
      setEnfance(storedEnfance);
    } else if (id) {
      setEnfance('');
    }
    if (storedMaintenant) {
      setMaintenant(storedMaintenant);
    } else if (id) {
      setMaintenant('');
    }
  }, [kidKey, nowKey, setEnfance, setMaintenant]);

  const handleEnfanceClick = (index: number) => {
    setEnfance(index.toString());
  };

  const handleMaintenantClick = (index: number) => {
    setMaintenant(index.toString());
  };

  const handleNextClick = () => {
    if (enfance && maintenant) {
      localStorage.setItem(kidKey, enfance);
      localStorage.setItem(nowKey, maintenant);
      onNext(navigate);
    } else {
      alert("Please provide ratings for both fields.");
    }
  };

  const goHome = () => {
    navigate("/");
  }

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md w-full mx-auto">
      <div className="h-32 overflow-y-auto mb-4">
        <h2 className="text-2xl font-semibold text-center">{text}</h2>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Enfance
          <div>
            {ratingLabels.map((label, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleEnfanceClick(index + 1)}
                className={`${
                  enfance === (index + 1).toString() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                } py-2 px-3 rounded mr-2 mb-2`}
              >
                {index + 1} - {label}
              </button>
            ))}
          </div>
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Maintenant
          <div>
            {ratingLabels.map((label, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleMaintenantClick(index + 1)}
                className={`${
                  maintenant === (index + 1).toString() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                } py-2 px-3 rounded mr-2 mb-2`}
              >
                {index + 1} - {label}
              </button>
            ))}
          </div>
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
          type="button"
          onClick={handleNextClick}
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
        <button
          type="button"
          onClick={goHome}
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
        Home
        </button>
      </div>
    </div>
  );
};

export default Question;
