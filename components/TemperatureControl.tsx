
import React from 'react';

interface TemperatureControlProps {
  value: number;
  onChange: (val: number) => void;
}

const TemperatureControl: React.FC<TemperatureControlProps> = ({ value, onChange }) => {
  const getTempColor = (v: number) => {
    if (v <= 30) return 'bg-sky-400';
    if (v <= 60) return 'bg-emerald-400';
    if (v <= 85) return 'bg-amber-400';
    return 'bg-rose-500';
  };

  const getEmoji = (v: number) => {
    if (v <= 30) return '🥶';
    if (v <= 60) return '😐';
    if (v <= 85) return '😊';
    return '🔥';
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-end">
        <span className="text-4xl font-bold text-gray-800">{value}°C</span>
        <span className="text-5xl animate-bounce">{getEmoji(value)}</span>
      </div>
      
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`absolute h-full transition-all duration-300 ${getTempColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
      
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-transparent appearance-none cursor-pointer accent-gray-400"
      />
      
      <div className="flex justify-between text-xs text-gray-400 font-medium uppercase tracking-wider">
        <span>매우 낮음</span>
        <span>보통</span>
        <span>매우 좋음</span>
      </div>
    </div>
  );
};

export default TemperatureControl;
