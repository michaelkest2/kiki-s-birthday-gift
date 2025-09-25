import React from 'react';
import { STRENGTH_TO_OPEN_SAFE, TOTAL_LEVELS } from '../constants';

interface GameStatusUIProps {
  strength: number;
  cakesCollected: number;
  message: string;
  timeLeft: number;
  currentLevel: number;
  lives: number;
}

const GameStatusUI: React.FC<GameStatusUIProps> = ({ strength, cakesCollected, message, timeLeft, currentLevel, lives }) => {
  const strengthPercentage = Math.max(0, Math.min(100, (strength / STRENGTH_TO_OPEN_SAFE) * 100));

  const getStrengthColor = () => {
    if (strengthPercentage < 33) return 'bg-red-500';
    if (strengthPercentage < 66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full max-w-xl lg:max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg border-2 border-gray-700 text-white font-mono space-y-4">
      <div className="flex justify-between items-center text-lg">
        <h2 className="font-bold">Level: {currentLevel} / {TOTAL_LEVELS}</h2>
        <div className="flex items-center gap-3">
          <span>❤️: {lives}</span>
          <span>🎂: {cakesCollected}</span>
          <span>⏳: {timeLeft}s</span>
        </div>
      </div>
      
      <div>
        <label htmlFor="strength-bar" className="block text-sm font-medium text-gray-300 mb-1">Strength: {strength} / {STRENGTH_TO_OPEN_SAFE}</label>
        <div className="w-full bg-gray-700 rounded-full h-6 overflow-hidden">
          <div
            id="strength-bar"
            className={`h-6 rounded-full ${getStrengthColor()} transition-all duration-500 ease-out`}
            style={{ width: `${strengthPercentage}%` }}
          />
        </div>
      </div>
      
      <div className="h-6 text-center text-pink-300">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default GameStatusUI;