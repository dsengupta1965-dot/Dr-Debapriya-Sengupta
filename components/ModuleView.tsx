import React, { useState } from 'react';
import { Module } from '../types';
import { ChevronRight, CheckCircle, AlertTriangle, Book, ArrowRight } from 'lucide-react';

interface ModuleViewProps {
  module: Module;
  onComplete: () => void;
}

export const ModuleView: React.FC<ModuleViewProps> = ({ module, onComplete }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleNextSection = () => {
    if (activeSection < module.sections.length - 1) {
      setActiveSection(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setShowQuiz(true);
      window.scrollTo(0, 0);
    }
  };

  const handleQuizSubmit = () => {
    let score = 0;
    module.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    setQuizScore(score);
    setSubmitted(true);
    if (score === module.quiz.length) {
      onComplete();
    }
  };

  if (showQuiz) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-blue-900 p-6 text-white">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle className="text-green-400" />
              Module Assessment
            </h2>
            <p className="text-blue-200 mt-2">Test your understanding of {module.title}</p>
          </div>
          
          <div className="p-8 space-y-8">
            {module.quiz.map((q, idx) => (
              <div key={q.id} className="border-b border-slate-100 pb-6 last:border-0">
                <p className="text-lg font-medium text-slate-800 mb-4">
                  <span className="text-slate-400 mr-2">{idx + 1}.</span>
                  {q.question}
                </p>
                <div className="space-y-3">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        submitted
                          ? optIdx === q.correctAnswer
                            ? 'bg-green-50 border-green-500 text-green-800'
                            : selectedAnswers[q.id] === optIdx
                            ? 'bg-red-50 border-red-500 text-red-800'
                            : 'bg-slate-50 border-slate-200 text-slate-500'
                          : selectedAnswers[q.id] === optIdx
                          ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-sm ring-1 ring-blue-500'
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {submitted && (
                  <div className={`mt-4 p-4 rounded-lg text-sm ${
                    selectedAnswers[q.id] === q.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            {!submitted ? (
              <button
                onClick={handleQuizSubmit}
                className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors ml-auto"
              >
                Submit Assessment
              </button>
            ) : (
              <div className="w-full text-center">
                <p className="text-xl font-bold mb-4">
                  Score: {quizScore} / {module.quiz.length}
                </p>
                <button
                  onClick={onComplete}
                  className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const section = module.sections[activeSection];

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 pb-24">
      {/* Header */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{module.title}</h1>
        <p className="text-slate-500 text-lg">{module.description}</p>
        
        {/* Learning Outcomes */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-5">
          <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-3 flex items-center">
            <Book size={16} className="mr-2" />
            Learning Outcomes
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {module.learningOutcomes.map((lo, idx) => (
              <li key={idx} className="flex items-start text-blue-800 text-sm">
                <span className="mr-2 text-blue-400">•</span>
                {lo}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
          <span className="bg-slate-200 text-slate-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
            {activeSection + 1}
          </span>
          {section.title}
        </h2>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 mb-8 leading-relaxed text-slate-700 whitespace-pre-line">
          {section.content}
        </div>

        {section.keyPoints && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <h3 className="font-bold text-amber-900 mb-3 flex items-center">
              <AlertTriangle size={20} className="mr-2" />
              Key Administrative Points
            </h3>
            <ul className="space-y-2">
              {section.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-center text-amber-900">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-slate-200 p-4 flex justify-between items-center z-10">
        <div className="text-sm text-slate-500 px-8">
          Section {activeSection + 1} of {module.sections.length}
        </div>
        <button
          onClick={handleNextSection}
          className="mr-8 flex items-center bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20"
        >
          {activeSection < module.sections.length - 1 ? 'Next Section' : 'Take Quiz'}
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
};