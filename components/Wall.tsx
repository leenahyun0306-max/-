
import React, { useState, useEffect } from 'react';

interface CheerMessage {
  id: string;
  name: string;
  message: string;
  color: string;
  timestamp: number;
}

const INITIAL_CHEERS: CheerMessage[] = [
  { id: '1', name: "익명의 다람쥐", message: "모두 오늘 하루도 고생 많았어요! 포기하지 마세요!", color: "bg-rose-100 text-rose-700", timestamp: Date.now() - 100000 },
  { id: '2', name: "따뜻한 햇살", message: "당신의 존재만으로도 세상은 더 밝아집니다. ✨", color: "bg-amber-100 text-amber-700", timestamp: Date.now() - 200000 },
  { id: '3', name: "고래꿈", message: "잠깐 멈춰 서서 하늘을 한번 보세요. 구름이 예뻐요.", color: "bg-sky-100 text-sky-700", timestamp: Date.now() - 300000 },
];

const COLORS = [
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-sky-100 text-sky-700",
  "bg-emerald-100 text-emerald-700",
  "bg-indigo-100 text-indigo-700",
  "bg-purple-100 text-purple-700"
];

const ANIMALS = ["토끼", "사슴", "거북이", "쿼카", "판다", "펭귄", "강아지", "고양이", "햄스터"];

const Wall: React.FC = () => {
  const [messages, setMessages] = useState<CheerMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('mindy_wall_messages');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages(INITIAL_CHEERS);
    }
  }, []);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsPosting(true);

    const randomAnimal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    const newMessage: CheerMessage = {
      id: Date.now().toString(),
      name: `익명의 ${randomAnimal}`,
      message: inputText.trim(),
      color: randomColor,
      timestamp: Date.now()
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('mindy_wall_messages', JSON.stringify(updatedMessages));
    
    setInputText('');
    setTimeout(() => setIsPosting(false), 500);
  };

  return (
    <div className="pt-24 pb-12 px-6 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">응원 게시판: 마음을 나눠요</h2>
        <p className="text-gray-600">서로에게 건네는 따뜻한 말 한마디가 누군가에겐 큰 힘이 됩니다.</p>
      </div>

      {/* Message Input Section */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handlePost} className="glass-card p-6 rounded-3xl shadow-md border border-white space-y-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="친구들에게 전하고 싶은 따뜻한 응원을 적어주세요..."
            className="w-full h-24 p-4 rounded-2xl border border-gray-100 bg-white/50 focus:ring-2 focus:ring-rose-400 focus:outline-none transition-all resize-none text-gray-700"
            maxLength={100}
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">{inputText.length}/100</span>
            <button
              disabled={!inputText.trim() || isPosting}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isPosting ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-paper-plane"></i>}
              응원 남기기
            </button>
          </div>
        </form>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((cheer) => (
          <div 
            key={cheer.id} 
            className={`p-8 rounded-3xl shadow-sm border border-white transform hover:scale-105 transition-all duration-300 animate-in fade-in zoom-in-95 ${cheer.color}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
                <i className="fa-solid fa-user text-xs"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold opacity-70 uppercase tracking-tighter">{cheer.name}</span>
                <span className="text-[10px] opacity-50">{new Date(cheer.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
            <p className="text-lg font-medium leading-relaxed italic">"{cheer.message}"</p>
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="text-center py-20 text-gray-400 italic">
          아직 응원 메시지가 없어요. 첫 번째 응원을 남겨보세요! 🌿
        </div>
      )}
    </div>
  );
};

export default Wall;
