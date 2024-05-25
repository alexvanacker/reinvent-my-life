import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavigateFunction } from 'react-router-dom';
import Question from './components/Question';
import Results from './components/Results';
import Home from './components/Home';
import questionsData from './assets/global-questions.json';

const questionsArray = Object.entries(questionsData).map(([id, text]) => ({ id, text }));
const App: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = (navigate: NavigateFunction) => {
    if (currentQuestionIndex === questionsArray.length - 1) {
      // If it's the last question, navigate to the result page
      navigate('/result');
    } else {
    // Move to the next question
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    // Move to the previous question
    setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reinvent-my-life" element={<Home />} />
        <Route
          path="/questionnaire"
          element={
            <Question
              {...questionsArray[currentQuestionIndex]}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          }
        />
        <Route path="/result" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
