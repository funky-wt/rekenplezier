import React, { useState } from 'react';
import { Trophy, RefreshCw, ArrowRight, Target, Plus, X, Home, Minus, Divide } from 'lucide-react';

/**
 * REKEN CHALLENGE - Educatieve app voor kinderen
 * Versie: Frameloos met sticky header en Challenge branding
 * Update: X-icoon verplaatst naar de rechter-onderhoek van de header.
 */

export default function App() {
  const [view, setView] = useState('menu'); // 'menu', 'game', 'results'
  const [category, setCategory] = useState(null); 
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct', 'wrong', null
  const [score, setScore] = useState(0);
  const [illustrationUrl, setIllustrationUrl] = useState('');

  const generateQuestions = (type) => {
    const newQuestions = [];
    for (let i = 0; i < 10; i++) {
      let a, b, op, answer;
      
      if (type === 'addition-20') {
        a = Math.floor(Math.random() * 19) + 1;
        b = Math.floor(Math.random() * (20 - a)) + 1;
        op = '+';
        answer = a + b;
      } else if (type === 'addition-100') {
        a = Math.floor(Math.random() * 99) + 1;
        b = Math.floor(Math.random() * (100 - a)) + 1;
        op = '+';
        answer = a + b;
      } else if (type === 'addition-200') {
        a = Math.floor(Math.random() * 199) + 1;
        b = Math.floor(Math.random() * (200 - a)) + 1;
        op = '+';
        answer = a + b;
      } else if (type === 'multiplication') {
        a = Math.floor(Math.random() * 12) + 1;
        b = Math.floor(Math.random() * 12) + 1;
        op = 'x';
        answer = a * b;
      } else if (type === 'minus-100') {
        a = Math.floor(Math.random() * 99) + 2; 
        b = Math.floor(Math.random() * (a - 1)) + 1; 
        op = '-';
        answer = a - b;
      } else if (type === 'division-12') {
        const result = Math.floor(Math.random() * 12) + 1;
        b = Math.floor(Math.random() * 11) + 2; 
        a = result * b;
        op = '÷';
        answer = result;
      }
      newQuestions.push({ a, b, op, answer });
    }
    return newQuestions;
  };

  const startGame = (type) => {
    setCategory(type);
    setQuestions(generateQuestions(type));
    setCurrentIndex(0);
    setScore(0);
    setUserInput('');
    setFeedback(null);
    setView('game');
    window.scrollTo(0, 0);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    if (!userInput || feedback === 'correct') return;

    const currentQ = questions[currentIndex];
    const isCorrect = parseInt(userInput) === currentQ.answer;

    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
      setIllustrationUrl(`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${Math.random()}&backgroundColor=b6e3f4`);
    } else {
      setFeedback('wrong');
    }
  };

  const nextQuestion = () => {
    if (currentIndex < 9) {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
      setFeedback(null);
      setIllustrationUrl('');
    } else {
      setView('results');
    }
    window.scrollTo(0, 0);
  };

  const reset = () => {
    setView('menu');
    setCategory(null);
    setFeedback(null);
    setScore(0);
    setCurrentIndex(0);
    setUserInput('');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-indigo-600 shadow-lg text-white">
        <div className="max-w-md mx-auto p-6 relative flex flex-col items-center justify-center">
          {view !== 'menu' && (
            <button 
              onClick={reset}
              className="absolute bottom-2 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              title="Terug naar menu"
            >
              <X size={20} />
            </button>
          )}
          <h1 className="text-2xl font-black tracking-tight flex items-center justify-center gap-2">
            <Target className="w-6 h-6 text-yellow-300" />
            REKEN CHALLENGE
          </h1>
          {view === 'game' && (
            <div className="mt-2 inline-block bg-indigo-500 px-4 py-1 rounded-full text-xs font-bold border border-indigo-400">
              Vraag {currentIndex + 1} van 10
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-md mx-auto p-6">
        
        {/* VIEW: MENU */}
        {view === 'menu' && (
          <div className="space-y-4 pb-10">
            <p className="text-slate-500 text-center font-bold uppercase tracking-wider text-[10px] mb-4">Kies een categorie</p>
            
            <button 
              onClick={() => startGame('addition-20')}
              className="w-full group flex items-center justify-between p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl transition-all hover:border-green-300 active:scale-[0.98]"
            >
              <div className="text-left pr-2">
                <h3 className="text-sm font-bold text-slate-800 leading-tight">Optellen (20)</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Sommen tot 20</p>
              </div>
              <div className="bg-green-500 text-white p-2 rounded-xl group-hover:rotate-6 transition-transform shrink-0">
                <Plus size={18} strokeWidth={3} />
              </div>
            </button>

            <button 
              onClick={() => startGame('addition-100')}
              className="w-full group flex items-center justify-between p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl transition-all hover:border-emerald-300 active:scale-[0.98]"
            >
              <div className="text-left pr-2">
                <h3 className="text-sm font-bold text-slate-800 leading-tight">Optellen (100)</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Sommen tot 100</p>
              </div>
              <div className="bg-emerald-500 text-white p-2 rounded-xl group-hover:rotate-6 transition-transform shrink-0">
                <Plus size={18} strokeWidth={3} />
              </div>
            </button>

            <button 
              onClick={() => startGame('addition-200')}
              className="w-full group flex items-center justify-between p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl transition-all hover:border-teal-300 active:scale-[0.98]"
            >
              <div className="text-left pr-2">
                <h3 className="text-sm font-bold text-slate-800 leading-tight">Optellen (200)</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Sommen tot 200</p>
              </div>
              <div className="bg-teal-600 text-white p-2 rounded-xl group-hover:rotate-6 transition-transform shrink-0">
                <Plus size={18} strokeWidth={3} />
              </div>
            </button>

            <button 
              onClick={() => startGame('minus-100')}
              className="w-full group flex items-center justify-between p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl transition-all hover:border-orange-300 active:scale-[0.98]"
            >
              <div className="text-left pr-2">
                <h3 className="text-sm font-bold text-slate-800 leading-tight">Aftrekken (100)</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Min-sommen tot 100</p>
              </div>
              <div className="bg-orange-500 text-white p-2 rounded-xl group-hover:rotate-6 transition-transform shrink-0">
                <Minus size={18} strokeWidth={3} />
              </div>
            </button>

            <button 
              onClick={() => startGame('multiplication')}
              className="w-full group flex items-center justify-between p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl transition-all hover:border-blue-300 active:scale-[0.98]"
            >
              <div className="text-left pr-2">
                <h3 className="text-sm font-bold text-slate-800 leading-tight">Vermenigvuldigen</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Tafels 1 tot 12</p>
              </div>
              <div className="bg-blue-500 text-white p-2 rounded-xl group-hover:rotate-6 transition-transform shrink-0">
                <X size={18} strokeWidth={3} />
              </div>
            </button>

            <button 
              onClick={() => startGame('division-12')}
              className="w-full group flex items-center justify-between p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl transition-all hover:border-purple-300 active:scale-[0.98]"
            >
              <div className="text-left pr-2">
                <h3 className="text-sm font-bold text-slate-800 leading-tight">Delen</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Tot 12 ÷ 12</p>
              </div>
              <div className="bg-purple-500 text-white p-2 rounded-xl group-hover:rotate-6 transition-transform shrink-0">
                <Divide size={18} strokeWidth={3} />
              </div>
            </button>
          </div>
        )}

        {/* VIEW: GAME */}
        {view === 'game' && (
          <div className="flex flex-col items-center space-y-8 animate-fade-in">
            <div 
              className={`w-full py-12 px-6 rounded-3xl border-4 transition-all duration-300 flex flex-col items-center justify-center gap-8 relative
              ${feedback === 'correct' ? 'border-green-400 bg-green-50' : 
                feedback === 'wrong' ? 'border-red-400 bg-red-50 animate-shake' : 
                'border-slate-100 bg-slate-50'}`}
            >
              <div className="text-5xl font-black text-slate-800 flex items-center gap-4">
                <span>{questions[currentIndex].a}</span>
                <span className="text-indigo-500">{questions[currentIndex].op}</span>
                <span>{questions[currentIndex].b}</span>
                <span className="text-slate-400">=</span>
              </div>

              <form onSubmit={handleCheck} className="w-full flex justify-center">
                <input
                  autoFocus
                  type="number"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={feedback === 'correct'}
                  className={`w-40 text-center text-5xl font-black p-5 rounded-3xl outline-none transition-all no-spinner
                    ${feedback === 'wrong' ? 'text-red-600 bg-red-100' : 'bg-white text-slate-800 shadow-md focus:ring-4 focus:ring-indigo-200'}`}
                  placeholder="?"
                />
              </form>

              {feedback === 'correct' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-50/95 rounded-3xl animate-pop-in">
                  <img src={illustrationUrl} alt="Beloning" className="w-32 h-32 rounded-full mb-4 bg-white p-3 shadow-lg border-2 border-green-200" />
                  <p className="text-green-600 font-black text-xl uppercase tracking-widest text-center px-4">Goed gedaan!</p>
                </div>
              )}

              {feedback === 'wrong' && (
                <p className="text-red-500 font-bold animate-pulse text-center">Probeer het nog eens!</p>
              )}
            </div>

            <div className="w-full flex gap-4">
              {feedback !== 'correct' ? (
                <>
                  <button 
                    onClick={handleCheck}
                    className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm shadow-lg hover:bg-indigo-700 active:scale-95 transition-all"
                  >
                    CONTROLEER
                  </button>
                  <button 
                    onClick={nextQuestion}
                    className="flex-1 bg-slate-200 text-slate-600 py-4 rounded-2xl font-bold text-xs hover:bg-slate-300 active:scale-95 transition-all flex items-center justify-center gap-1"
                  >
                    OVERSLAAN <ArrowRight size={12} />
                  </button>
                </>
              ) : (
                <button 
                  onClick={nextQuestion}
                  className="w-full bg-green-500 text-white py-5 rounded-2xl font-black text-base shadow-lg hover:bg-green-600 animate-bounce-subtle flex items-center justify-center gap-3"
                >
                  VOLGENDE VRAAG <ArrowRight size={20} strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* VIEW: RESULTS */}
        {view === 'results' && (
          <div className="text-center space-y-8 py-4 animate-fade-in">
            <div className="relative inline-block">
              <div className="bg-yellow-100 p-8 rounded-full animate-bounce-subtle">
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto" />
              </div>
              <div className="absolute -top-1 -right-1 bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg border-4 border-white shadow-lg">
                {score}
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Geweldig!</h2>
              <p className="text-slate-500 text-lg font-medium">Je hebt er <span className="text-indigo-600 font-bold">{score}</span> van de 10 goed!</p>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => startGame(category)}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm shadow-lg hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <RefreshCw size={16} /> OPNIEUW SPELEN
              </button>
              <button 
                onClick={reset}
                className="w-full bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold text-xs hover:bg-slate-200 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Home size={14} /> HOOFDMENU
              </button>
            </div>
          </div>
        )}

      </main>

      <style>{`
        .no-spinner::-webkit-inner-spin-button,
        .no-spinner::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-spinner {
          -moz-appearance: textfield;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }

        @keyframes pop-in {
          0% { transform: scale(0.8); opacity: 0; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in { animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle { animation: bounce-subtle 2s infinite ease-in-out; }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}