
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Home from './components/Home.tsx';
import Participate from './components/Participate.tsx';
import Wall from './components/Wall.tsx';
import { Page } from './types.ts';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [isKeyReady, setIsKeyReady] = useState(true);

  // 배포 환경에서 키 선택 여부 확인
  useEffect(() => {
    const checkApiKey = async () => {
      // Accessing aistudio from window safely by casting to any to avoid conflict with predefined types
      const aistudio = (window as any).aistudio;
      if (aistudio) {
        const hasKey = await aistudio.hasSelectedApiKey();
        if (!hasKey) {
          setIsKeyReady(false);
        }
      }
    };
    checkApiKey();
  }, []);

  const handleOpenKeyPicker = async () => {
    // Accessing aistudio from window safely by casting to any to avoid conflict with predefined types
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      await aistudio.openSelectKey();
      setIsKeyReady(true); // 선택 후 즉시 진행 허용 (레이스 컨디션 방지)
    }
  };

  const renderPage = () => {
    if (!isKeyReady) {
      return (
        <div className="pt-32 px-6 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center animate-pulse">
            <i className="fa-solid fa-key text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">서비스 준비가 필요해요</h2>
          <p className="text-gray-600 max-w-md">
            이 캠페인은 학생들의 마음을 읽기 위해 안전한 연결이 필요합니다.<br/>
            아래 버튼을 눌러 API 키 설정을 완료해 주세요.
          </p>
          <button 
            onClick={handleOpenKeyPicker}
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg transition-all"
          >
            설정 시작하기
          </button>
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-gray-400 underline"
          >
            결제 및 키 정보 확인하기
          </a>
        </div>
      );
    }

    switch (currentPage) {
      case Page.Home:
        return <Home onStart={() => setCurrentPage(Page.Participate)} />;
      case Page.Participate:
        return <Participate />;
      case Page.Wall:
        return <Wall />;
      default:
        return <Home onStart={() => setCurrentPage(Page.Participate)} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      
      <main className="animate-in fade-in duration-700">
        {renderPage()}
      </main>

      <footer className="py-12 px-6 border-t border-gray-100 text-center space-y-4">
        <div className="flex justify-center gap-6 text-gray-400">
          <i className="fa-brands fa-instagram text-xl hover:text-rose-400 cursor-pointer"></i>
          <i className="fa-brands fa-twitter text-xl hover:text-rose-400 cursor-pointer"></i>
          <i className="fa-brands fa-youtube text-xl hover:text-rose-400 cursor-pointer"></i>
        </div>
        <p className="text-sm text-gray-400">
          &copy; 2024 마음온도 프로젝트 (Mindy On-do Project). 학교 보건실 및 상담실 공동 기획.
        </p>
        <p className="text-xs text-gray-300">
          이 사이트는 학생들의 정서적 지지를 돕기 위해 제작되었습니다. 심각한 위기 상황 시 1388 상담전화를 이용해 주세요.
        </p>
      </footer>
    </div>
  );
};

export default App;
