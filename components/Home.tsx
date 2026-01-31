
import React from 'react';
import { Page } from '../types.ts';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="pt-24 pb-12 px-6 max-w-4xl mx-auto space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-block p-4 rounded-full bg-rose-50 text-rose-500 mb-4 animate-bounce">
          <i className="fa-solid fa-thermometer-half text-4xl"></i>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
          오늘 당신의 <span className="text-rose-500 underline underline-offset-8">마음 온도</span>는<br/>몇 도인가요?
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          마음온도 프로젝트는 우리 학교 학생들의 마음 건강을 살피고<br/>
          따뜻한 위로와 에너지를 나누는 힐링 캠페인입니다.
        </p>
        <button 
          onClick={onStart}
          className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          지금 내 온도 측정하기
        </button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-white/50 text-center">
          <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-500 mx-auto mb-4">
            <i className="fa-solid fa-user-secret text-xl"></i>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">익명성 보장</h3>
          <p className="text-sm text-gray-600">개인정보를 묻지 않아요. 당신의 고민을 안심하고 털어놓으세요.</p>
        </div>
        <div className="glass-card p-6 rounded-3xl border border-white/50 text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-500 mx-auto mb-4">
            <i className="fa-solid fa-face-smile text-xl"></i>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">따뜻한 공감</h3>
          <p className="text-sm text-gray-600">AI 운영자가 당신의 마음 온도에 맞는 진실된 응원을 건넵니다.</p>
        </div>
        <div className="glass-card p-6 rounded-3xl border border-white/50 text-center">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-500 mx-auto mb-4">
            <i className="fa-solid fa-leaf text-xl"></i>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">작은 실천</h3>
          <p className="text-sm text-gray-600">오늘 바로 시작할 수 있는 간단한 행동 미션을 제안합니다.</p>
        </div>
      </div>

      <div className="relative h-64 rounded-3xl overflow-hidden shadow-xl">
        <img 
          src="https://picsum.photos/id/400/1200/600" 
          alt="Peaceful Landscape" 
          className="w-full h-full object-cover grayscale-[0.2] brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
          <p className="text-white text-xl font-medium italic">
            "가장 추운 날에도 우리 안에는 무너지지 않는 따뜻함이 있습니다."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
