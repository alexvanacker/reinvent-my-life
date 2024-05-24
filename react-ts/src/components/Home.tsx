import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/questionnaire');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Je réinvente ma vie: les questionnaires</h1>
      <button
        onClick={handleStart}
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Premier questionnaire
      </button>
    </div>
  );
};

export default Home;
