import React, { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import './QuizComponent.css';

const QuizComponent = ({ question, options, correctAnswer, explanation }) => {
    const [selected, setSelected] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSelect = (idx) => {
        if (isSubmitted) return;
        setSelected(idx);
    };

    const handleSubmit = () => {
        if (selected === null) return;
        setIsSubmitted(true);
    };

    const handleReset = () => {
        setSelected(null);
        setIsSubmitted(false);
    };

    const isCorrect = selected === correctAnswer;

    return (
        <div className="quiz-component glass-panel p-6 mb-6">
            <h4 className="quiz-question-text mb-6">{question}</h4>

            <div className="quiz-options-list flex flex-col gap-3">
                {options.map((option, idx) => (
                    <button
                        key={idx}
                        className={`quiz-option-btn ${selected === idx ? 'selected' : ''} ${isSubmitted && idx === correctAnswer ? 'correct' : ''
                            } ${isSubmitted && selected === idx && idx !== correctAnswer ? 'incorrect' : ''
                            }`}
                        onClick={() => handleSelect(idx)}
                        disabled={isSubmitted}
                    >
                        <div className="option-indicator">
                            {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="option-text">{option}</span>
                        {isSubmitted && idx === correctAnswer && <CheckCircle2 size={16} className="text-accent-green" />}
                        {isSubmitted && selected === idx && idx !== correctAnswer && <XCircle size={16} className="text-accent-red" />}
                    </button>
                ))}
            </div>

            <div className="quiz-actions mt-8 flex justify-between items-center">
                {!isSubmitted ? (
                    <button
                        className="primary-btn"
                        onClick={handleSubmit}
                        disabled={selected === null}
                    >
                        Submit Answer
                    </button>
                ) : (
                    <button className="secondary-btn flex items-center gap-2" onClick={handleReset}>
                        <RefreshCw size={16} /> Try Again
                    </button>
                )}
            </div>

            {isSubmitted && (
                <div className={`quiz-feedback mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-900/20' : 'bg-red-900/20'} animate-fade-in`}>
                    <p className="font-bold mb-1">
                        {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                    </p>
                    <p className="text-sm text-muted">{explanation}</p>
                </div>
            )}
        </div>
    );
};

export default QuizComponent;
