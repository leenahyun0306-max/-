
import React, { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Home from './components/Home.tsx';
import Participate from './components/Participate.tsx';
import Wall from './components/Wall.tsx';
import { Page } from './types.ts';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  const renderPage = () => {
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
