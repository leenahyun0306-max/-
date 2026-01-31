
import React, { useState, useEffect } from 'react';
import TemperatureControl from './TemperatureControl.tsx';
import { getMindFeedback } from '../services/geminiService.ts';
import { HistoryItem } from '../types.ts';

const Participate: React.FC = () => {
  const [temperature, setTemperature] = useState(60);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mindy_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim() || isLoading) return;

    setIsLoading(true);
    setFeedback(null);

    try {
      const result = await getMindFeedback(temperature, reason);
      setFeedback(result);

      const newItem: HistoryItem = {
        id: Date.now().toString(),
        temperature,
        reason,
        feedback: result,
        timestamp: Date.now()
      };

      const newHistory = [newItem, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem('mindy_history', JSON.stringify(newHistory));
      setReason('');
    } catch (err) {
      console.error("Submission failed", err);
      setFeedback("죄송해요, 지금은 이야기를 듣는 중에 오류가 생겼어요. 다시 시도해 주실래요?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-12 px-6 max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">나의 마음 온도 측정</h2>
        <p className="text-gray-500">지금 이 순간의 마음을 있는 그대로 기록해 보세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl shadow-lg border border-white space-y-8">
        <TemperatureControl value={temperature} onChange={setTemperature} />

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">그렇게 설정한 이유가 무엇인가요? (고민 또는 상태)</label>
          <textarea 
            className="w-full h-32 p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-rose-400 focus:outline-none transition-all resize-none text-gray-700"
            placeholder="예: 오늘 시험이 끝나서 홀가분해요! / 친구와 조금 다퉈서 마음이 무거워요..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit"
          disabled={isLoading || !reason.trim()}
          className="w-full bg-gray-800 hover:bg-black text-white py-4 rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <i className="fa-solid fa-spinner animate-spin"></i>
              마음 읽는 중...
            </>
          ) : (
            '마음 온도 나누기'
          )}
        </button>
      </form>

      {feedback && (
        <div className="glass-card p-8 rounded-3xl shadow-xl border-2 border-rose-200 bg-white animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-white shrink-0 shadow-md">
              <i className="fa-solid fa-heart text-lg"></i>
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-xl text-gray-800">AI 마음 가이드의 위로</h4>
                <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-bold">Today's Advice</span>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg font-medium">
                {feedback}
              </p>
              <div className="pt-4 border-t border-gray-50 flex justify-end">
                <button 
                  onClick={() => setFeedback(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-sm font-bold transition-colors"
                >
                  확인했어요
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="space-y-4 pt-8">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <i className="fa-solid fa-clock-rotate-left text-rose-400"></i>
            나의 지난 기록들
          </h3>
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="glass-card p-6 rounded-2xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-sm
                  ${item.temperature <= 30 ? 'bg-sky-400' : 
                    item.temperature <= 60 ? 'bg-emerald-400' : 
                    item.temperature <= 85 ? 'bg-amber-400' : 'bg-rose-500'}`}
                >
                  {item.temperature}°
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                  <p className="text-sm text-gray-700 font-medium line-clamp-1">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Participate;
