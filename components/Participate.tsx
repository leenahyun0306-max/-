
import React, { useState, useEffect } from 'react';
import TemperatureControl from './TemperatureControl.tsx';
import { getMindFeedback } from '../services/geminiService.ts';
import { HistoryItem } from '../types.ts';

// Main participation component for recording mind temperature and receiving AI feedback
const Participate: React.FC = () => {
  const [temperature, setTemperature] = useState(60);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage on component mount
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
      // Get empathetic feedback from Gemini API
      const result = await getMindFeedback(temperature, reason);
      setFeedback(result);

      // Create and save new history item
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
    } catch (err: any) {
      console.error("Submission failed", err);
      
      // Handle specific billing/project errors by prompting for a fresh key selection
      if (err?.message?.includes("Requested entity was not found")) {
        setFeedback("죄송해요, 서비스 연결(API 키)에 문제가 생겼어요. 결제가 활성화된 프로젝트의 API 키를 다시 선택해 주세요.");
        const aistudio = (window as any).aistudio;
        if (aistudio && typeof aistudio.openSelectKey === 'function') {
          aistudio.openSelectKey();
        }
      } else {
        setFeedback("죄송해요, 지금은 이야기를 듣는 중에 오류가 생겼어요. 잠시 후에 다시 시도해 주실래요? 💙");
      }
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
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
              <i className="fa-solid fa-comment-dots"></i>
            </div>
            <h3 className="font-bold text-gray-800">마음 전달자</h3>
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{feedback}</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mt-12">
            <i className="fa-solid fa-clock-rotate-left text-gray-400"></i>
            최근 나의 마음 기록
          </h3>
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="glass-card p-6 rounded-2xl border border-gray-100 flex gap-4 items-start hover:bg-gray-50 transition-colors">
                <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm ${
                  item.temperature <= 30 ? 'bg-sky-400' : 
                  item.temperature <= 60 ? 'bg-emerald-400' : 
                  item.temperature <= 85 ? 'bg-amber-400' : 'bg-rose-500'
                }`}>
                  {item.temperature}°
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleString()}</p>
                  <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.reason}</p>
                  <p className="text-xs text-gray-500 line-clamp-2">{item.feedback}</p>
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
