import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { BrainCircuit, RefreshCw, Check, X, ShieldAlert } from 'lucide-react';

interface SimulationScenario {
  scenario: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
}

export const AISimulation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [scenario, setScenario] = useState<SimulationScenario | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateScenario = async () => {
    setLoading(true);
    setScenario(null);
    setSelectedOption(null);
    setError(null);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key not found. Please ensure process.env.API_KEY is set.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        You are a Senior Indian Railway Stores & Audit Officer acting as an examiner for IRHS Probationers.
        Generate a challenging, realistic administrative scenario involving Medical Stores, Procurement, or Vigilance.
        The context must be strictly within Indian Railway Medical Manual rules.
        Focus on: Splitting of indents, PAC misuse, Emergency Purchase irregularities, or expiry management.
        Output MUST be valid JSON matching this schema:
        {
          "scenario": "Detailed description of the problem/situation...",
          "options": [
            {"id": "A", "text": "Action A..."},
            {"id": "B", "text": "Action B..."},
            {"id": "C", "text": "Action C..."},
            {"id": "D", "text": "Action D..."}
          ],
          "correctOptionId": "The ID of the best administrative decision",
          "explanation": "Detailed explanation citing principles of financial propriety and Railway rules."
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              scenario: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    text: { type: Type.STRING }
                  }
                }
              },
              correctOptionId: { type: Type.STRING },
              explanation: { type: Type.STRING }
            }
          }
        }
      });

      if (response.text) {
        setScenario(JSON.parse(response.text));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to contact the Audit Simulator. Please check your network or API key.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateScenario();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden min-h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <ShieldAlert className="text-amber-200" />
              Vigilance & Admin Simulator
            </h2>
            <p className="text-amber-200/80 text-sm mt-1">Powered by Google Gemini 2.5</p>
          </div>
          <button 
            onClick={generateScenario}
            disabled={loading}
            className="flex items-center gap-2 bg-amber-800 hover:bg-amber-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-amber-600"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            New Scenario
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex-1">
          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg border border-red-200 mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <BrainCircuit size={48} className="animate-pulse text-amber-500" />
              <p>Consulting Audit Manuals...</p>
            </div>
          ) : scenario ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="bg-slate-50 border-l-4 border-amber-600 p-6 rounded-r-lg">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Scenario</h3>
                <p className="text-lg text-slate-800 leading-relaxed font-medium">
                  {scenario.scenario}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Select Course of Action</h3>
                {scenario.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedOption(option.id)}
                    disabled={!!selectedOption}
                    className={`w-full text-left p-5 rounded-lg border-2 transition-all flex items-start gap-4 ${
                      selectedOption
                        ? option.id === scenario.correctOptionId
                          ? 'bg-green-50 border-green-500'
                          : selectedOption === option.id
                          ? 'bg-red-50 border-red-500'
                          : 'bg-slate-50 border-slate-100 opacity-50'
                        : 'bg-white border-slate-200 hover:border-amber-400 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm ${
                       selectedOption
                        ? option.id === scenario.correctOptionId
                          ? 'bg-green-200 text-green-800'
                          : 'bg-slate-200 text-slate-600'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {option.id}
                    </span>
                    <span className={`flex-1 ${
                       selectedOption && option.id === scenario.correctOptionId ? 'font-bold text-green-900' : 'text-slate-700'
                    }`}>
                      {option.text}
                    </span>
                    {selectedOption && option.id === scenario.correctOptionId && <Check className="text-green-600" />}
                    {selectedOption === option.id && option.id !== scenario.correctOptionId && <X className="text-red-600" />}
                  </button>
                ))}
              </div>

              {selectedOption && (
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg animate-in slide-in-from-bottom-4">
                  <h3 className="font-bold text-blue-900 mb-2">Examiner's Note:</h3>
                  <p className="text-blue-800 leading-relaxed">
                    {scenario.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
