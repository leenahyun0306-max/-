
import React from 'react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-gray-100 px-6 py-4 flex justify-between items-center">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => setPage(Page.Home)}
      >
        <i className="fa-solid fa-heart-pulse text-rose-400 text-2xl"></i>
        <span className="text-xl font-bold text-gray-800 hidden sm:inline">마음온도 프로젝트</span>
      </div>
      <div className="flex gap-6 sm:gap-10">
        <button 
          onClick={() => setPage(Page.Home)}
          className={`text-sm font-medium transition-colors ${currentPage === Page.Home ? 'text-rose-500' : 'text-gray-500 hover:text-rose-400'}`}
        >
          캠페인 소개
        </button>
        <button 
          onClick={() => setPage(Page.Participate)}
          className={`text-sm font-medium transition-colors ${currentPage === Page.Participate ? 'text-rose-500' : 'text-gray-500 hover:text-rose-400'}`}
        >
          온도 참여하기
        </button>
        <button 
          onClick={() => setPage(Page.Wall)}
          className={`text-sm font-medium transition-colors ${currentPage === Page.Wall ? 'text-rose-500' : 'text-gray-500 hover:text-rose-400'}`}
        >
          응원 게시판
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
