import React from 'react';
import { CellType, GameStatus } from '../types';
import type { Position } from '../types';
import { PandaIcon, BirthdayCakeIcon, BroccoliIcon, SafeIcon, IceCreamIcon, EvilCarrotIcon, DumbbellIcon } from './Icons';
import { STRENGTH_TO_OPEN_SAFE } from '../constants';

interface GameBoardProps {
  maze: CellType[][];
  pandaPosition: Position;
  gameStatus: GameStatus;
  strength: number;
  cakesCollected: number;
  isPandaGlowing: boolean;
}

const CellContent: React.FC<{ type: CellType, strength: number }> = ({ type, strength }) => {
  switch (type) {
    case CellType.CAKE:
      return <div className="w-3/4 h-3/4"><BirthdayCakeIcon /></div>;
    case CellType.BROCCOLI:
      return <div className="w-3/4 h-3/4"><BroccoliIcon /></div>;
    case CellType.CARROT:
      return <div className="w-3/4 h-3/4 animate-pulse"><EvilCarrotIcon /></div>;
    case CellType.SAFE:
      const canOpen = strength >= STRENGTH_TO_OPEN_SAFE;
      return <div className={`w-3/4 h-3/4 transition-all duration-300 ${canOpen ? 'animate-pulse' : ''}`}><SafeIcon /></div>;
    case CellType.SAFE_OPEN:
      return <div className="w-full h-full animate-bounce"><IceCreamIcon /></div>;
    default:
      return null;
  }
};

const GameBoard: React.FC<GameBoardProps> = ({ maze, pandaPosition, gameStatus, strength, cakesCollected, isPandaGlowing }) => {
  const gridTemplateColumns = `repeat(${maze.length > 0 ? maze[0].length : 15}, minmax(0, 1fr))`;

  return (
    <div className="bg-gray-800 p-2 rounded-lg shadow-lg border-2 border-gray-700">
      <div 
        className="grid gap-0"
        style={{ gridTemplateColumns }}
        role="grid"
      >
        {maze.map((row, y) =>
          row.map((cell, x) => {
            const isPandaHere = pandaPosition.x === x && pandaPosition.y === y;
            const isWall = cell === CellType.WALL;
            const isCarrot = cell === CellType.CARROT;

            const pandaScale = Math.min(1, 0.6 + cakesCollected * 0.035);
            const hasMaxStrength = strength >= STRENGTH_TO_OPEN_SAFE;

            return (
              <div
                key={`${y}-${x}`}
                role="gridcell"
                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-colors duration-200
                  ${isWall ? 'bg-gray-700 rounded-sm' : isCarrot ? 'bg-orange-900/50' : 'bg-gray-900'}
                  ${gameStatus === GameStatus.WON && 'opacity-50'}`}
              >
                {isPandaHere && gameStatus === GameStatus.PLAYING && (
                  <div
                    className={`relative transition-transform duration-300 ease-out ${isPandaGlowing ? 'animate-red-glow' : ''}`}
                    style={{
                      width: `${pandaScale * 100}%`,
                      height: `${pandaScale * 100}%`,
                    }}
                  >
                    <div className={`w-full h-full p-0.5 rounded-full transition-all duration-300 ${hasMaxStrength ? 'border-4 border-yellow-400 shadow-lg' : ''}`}>
                      <PandaIcon />
                    </div>
                    {hasMaxStrength && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-900 rounded-full p-1 animate-pulse border-2 border-yellow-500">
                        <DumbbellIcon />
                      </div>
                    )}
                  </div>
                )}
                <CellContent type={cell} strength={strength} />
              </div>
            );
          })
        )}
      </div>
      <style>{`
        @keyframes red-glow {
          0%, 100% { filter: drop-shadow(0 0 0px #ef4444); }
          50% { filter: drop-shadow(0 0 10px #ef4444); }
        }
        .animate-red-glow {
          animation: red-glow 1.5s ease-in-out 2;
        }
      `}</style>
    </div>
  );
};

export default GameBoard;
