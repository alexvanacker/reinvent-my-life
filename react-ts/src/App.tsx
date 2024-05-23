import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import Results from './components/Results';
import { Question as QuestionType, Responses } from './types';
import questionsData from './assets/global-questions.json';

const App: React.FC = () => {
    const [questions, setQuestions] = useState<QuestionType>({});
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [responses, setResponses] = useState<Responses>({});

    useEffect(() => {
        setQuestions(questionsData);
    }, []);

    const handleNext = (id: string, enfance: string, maintenant: string) => {
        setResponses(prev => ({ ...prev, [id]: { enfance, maintenant } }));
        if (currentQuestion < Object.keys(questions).length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setCurrentQuestion(-1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            {currentQuestion !== -1 ? (
                <Question
                    id={Object.keys(questions)[currentQuestion]}
                    text={Object.values(questions)[currentQuestion]}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    response={responses[Object.keys(questions)[currentQuestion]]}
                />
            ) : (
                <Results responses={responses} questions={questions} />
            )}
        </div>
    );
};

export default App;
