import React, { useState, useEffect, useCallback } from 'react';
import { CellType, GameStatus } from './types';
import type { Position } from './types';
import { 
  STRENGTH_PER_CAKE, 
  STRENGTH_LOSS_PER_BROCCOLI, 
  STRENGTH_TO_OPEN_SAFE,
  GAME_TICK_MS,
  STRENGTH_LOSS_PER_CARROT,
  GAME_DURATION_SECONDS,
  LEVEL_CONFIGS,
  TOTAL_LEVELS,
  INITIAL_LIVES,
  TOTAL_CAKES_PER_LEVEL
} from './constants';
import GameBoard from './components/GameBoard';
import GameStatusUI from './components/GameStatusUI';
import Modal from './components/Modal';
import WeightLossAnimation from './components/WeightLossAnimation';
import Confetti from './components/Confetti';
import TransformationAnimation from './components/TransformationAnimation';

type Direction = 'w' | 'a' | 's' | 'd';

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.START);
  const [maze, setMaze] = useState<CellType[][]>(LEVEL_CONFIGS[0].layout);
  const [pandaPosition, setPandaPosition] = useState<Position>(LEVEL_CONFIGS[0].start);
  const [strength, setStrength] = useState<number>(0);
  const [cakesCollected, setCakesCollected] = useState<number>(0);
  const [message, setMessage] = useState<string>("Use Arrow Keys to move.");
  const [direction, setDirection] = useState<Direction | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION_SECONDS);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [lives, setLives] = useState<number>(INITIAL_LIVES);
  const [isPandaGlowing, setIsPandaGlowing] = useState<boolean>(false);
  const [lostMessage, setLostMessage] = useState<string>('');

  const startLevel = useCallback((level: number) => {
    const levelIndex = level - 1;
    if (levelIndex < 0 || levelIndex >= LEVEL_CONFIGS.length) {
      console.error("Invalid level number:", level);
      return;
    }
    
    const config = LEVEL_CONFIGS[levelIndex];
    setMaze(config.layout.map(row => [...row])); // Ensure a fresh copy of the maze
    setPandaPosition(config.start);

    setStrength(0);
    setCakesCollected(0);
    setTimeLeft(GAME_DURATION_SECONDS);
    setMessage("Use Arrow Keys to move.");
    setDirection(null);
    setGameStatus(GameStatus.PLAYING);
  }, []);

  const handleNextLevel = () => {
    const nextLevel = currentLevel + 1;
    if (nextLevel <= TOTAL_LEVELS) {
      setCurrentLevel(nextLevel);
      startLevel(nextLevel);
    }
  };

  const handleRestartGame = () => {
      setCurrentLevel(1);
      setLives(INITIAL_LIVES);
      startLevel(1);
  };

  const handleVoluntaryRestart = () => {
    if (gameStatus !== GameStatus.PLAYING) return;
    setDirection(null); // Stop movement
    setLostMessage("You chose to restart the level.");
    setLives(l => Math.max(0, l - 1));
    setGameStatus(GameStatus.LOST);
  };


  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameStatus !== GameStatus.PLAYING) return;
    
    let newDirection: Direction | null = null;
    switch (e.key) {
        case 'ArrowUp':
            newDirection = 'w';
            break;
        case 'ArrowLeft':
            newDirection = 'a';
            break;
        case 'ArrowDown':
            newDirection = 's';
            break;
        case 'ArrowRight':
            newDirection = 'd';
            break;
    }

    if (newDirection) {
      setDirection(newDirection);
    }
  }, [gameStatus]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  useEffect(() => {
    if (gameStatus !== GameStatus.PLAYING) return;

    const timer = setInterval(() => {
        setTimeLeft(prevTime => {
            if (prevTime <= 1) {
                clearInterval(timer);
                setLostMessage("Oh no! You ran out of time.");
                setLives(l => Math.max(0, l - 1));
                setGameStatus(GameStatus.LOST);
                return 0;
            }
            return prevTime - 1;
        });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus !== GameStatus.PLAYING || !direction || maze.length === 0) {
      return;
    }

    const gameInterval = setInterval(() => {
      let newPosition = { ...pandaPosition };
      switch (direction) {
        case 'w': newPosition.y -= 1; break;
        case 'a': newPosition.x -= 1; break;
        case 's': newPosition.y += 1; break;
        case 'd': newPosition.x += 1; break;
      }

      if (
        newPosition.y < 0 || newPosition.y >= maze.length ||
        newPosition.x < 0 || newPosition.x >= maze[0].length
      ) {
        setDirection(null);
        return;
      }
      
      const cellType = maze[newPosition.y][newPosition.x];
      
      if (cellType === CellType.WALL) {
        setDirection(null);
        return;
      }

      if (cellType === CellType.CARROT) {
        setStrength(s => Math.max(0, s - STRENGTH_LOSS_PER_CARROT));
        setMessage(`Ouch! Evil carrots! -${STRENGTH_LOSS_PER_CARROT} strength.`);
        setDirection(null);
        setIsPandaGlowing(true);
        setTimeout(() => setIsPandaGlowing(false), 3000);
        return;
      }
      
      let newStrength = strength;
      let newCakeCount = cakesCollected;
      let newMaze = maze.map(row => [...row]);
      let newMessage = "";
      let shouldStop = false;

      switch (cellType) {
        case CellType.CAKE:
          newStrength += STRENGTH_PER_CAKE;
          newCakeCount += 1;
          newMaze[newPosition.y][newPosition.x] = CellType.PATH;
          newMessage = `Yum, birthday cake! +${STRENGTH_PER_CAKE} strength.`;

          if (newCakeCount === TOTAL_CAKES_PER_LEVEL && newStrength < STRENGTH_TO_OPEN_SAFE) {
            clearInterval(gameInterval);
            setTimeout(() => {
                setLostMessage("Not enough strength! You've collected all the cakes.");
                setLives(l => Math.max(0, l - 1));
                setGameStatus(GameStatus.LOST);
            }, 50);
            return;
          }
          break;
        case CellType.BROCCOLI:
          newStrength = Math.max(0, strength - STRENGTH_LOSS_PER_BROCCOLI);
          newMaze[newPosition.y][newPosition.x] = CellType.PATH;
          newMessage = `Yuck, broccoli! -${STRENGTH_LOSS_PER_BROCCOLI} strength.`;
          break;
        case CellType.SAFE:
          if (strength >= STRENGTH_TO_OPEN_SAFE) {
            setGameStatus(GameStatus.WON);
            newMaze[newPosition.y][newPosition.x] = CellType.SAFE_OPEN;
            newMessage = "You opened the safe! What's inside?";
            shouldStop = true;
          } else {
            newMessage = `Need ${STRENGTH_TO_OPEN_SAFE} strength. You have ${strength}.`;
            shouldStop = true;
            newPosition = pandaPosition; // Don't move
          }
          break;
      }
      
      if (newMessage) setMessage(newMessage);
      setStrength(newStrength);
      setCakesCollected(newCakeCount);
      setMaze(newMaze);
      setPandaPosition(newPosition);
      if (shouldStop) setDirection(null);

    }, GAME_TICK_MS);

    return () => clearInterval(gameInterval);
  }, [gameStatus, direction, pandaPosition, maze, strength, cakesCollected, startLevel, currentLevel]);


  return (
    <main className="bg-rose-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-mono select-none relative overflow-hidden">
        <Confetti />
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-2 text-pink-300 drop-shadow-lg">Panda's Birthday Maze</h1>
          <p className="text-rose-200 mb-6">Collect birthday cakes to get the panda's birthday gift!</p>
          
          <div className="flex flex-col lg:flex-row items-center gap-6">
              <GameBoard 
                maze={maze} 
                pandaPosition={pandaPosition} 
                gameStatus={gameStatus} 
                strength={strength}
                cakesCollected={cakesCollected}
                isPandaGlowing={isPandaGlowing}
              />
              <div className="w-full lg:w-80 flex flex-col gap-4">
                <GameStatusUI strength={strength} cakesCollected={cakesCollected} message={message} timeLeft={timeLeft} currentLevel={currentLevel} lives={lives} />
                <div className="bg-gray-800 p-4 rounded-lg border-2 border-gray-700 text-center">
                    <h3 className="font-bold text-lg mb-2">Controls</h3>
                    <p className="text-gray-400">Use <kbd className="p-1 bg-gray-700 rounded">↑</kbd> <kbd className="p-1 bg-gray-700 rounded">←</kbd> <kbd className="p-1 bg-gray-700 rounded">↓</kbd> <kbd className="p-1 bg-gray-700 rounded">→</kbd> to move.</p>
                </div>
                <button 
                  onClick={handleVoluntaryRestart}
                  disabled={gameStatus !== GameStatus.PLAYING}
                  className="w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed">
                  Restart Level (Cost: 1 Life)
                </button>
              </div>
          </div>
        </div>
        
        <Modal
            isOpen={gameStatus === GameStatus.START}
            title="Welcome!"
            buttonText="Start Game"
            onButtonClick={() => handleRestartGame()}
        >
            <p className="font-bold text-lg">Help the Panda celebrate her 28th birthday!</p>
            <ol className="list-decimal list-inside space-y-2 mt-4 text-left">
                <li>Collect birthday cakes to earn points.</li>
                <li>Avoid annoying Broccoli or you lose points.</li>
                <li>Don't touch the evil carrots at the border!</li>
                <li>Collect points and unlock the safe before time runs out!</li>
            </ol>
            <p className="mt-4">A special surprise awaits if you beat all <span className="font-bold text-pink-400">{TOTAL_LEVELS} levels</span>!</p>
        </Modal>

        <Modal
            isOpen={gameStatus === GameStatus.WON && currentLevel < TOTAL_LEVELS}
            title={`Level ${currentLevel} Complete!`}
            buttonText="Next Level"
            onButtonClick={handleNextLevel}
        >
            <p>On to the next challenge!</p>
            {gameStatus === GameStatus.WON && <WeightLossAnimation levelCompleted={currentLevel} />}
        </Modal>

        <Modal
            isOpen={gameStatus === GameStatus.WON && currentLevel === TOTAL_LEVELS}
            title="You Did It!"
            buttonText="Play Again From Start"
            onButtonClick={handleRestartGame}
        >
            <WeightLossAnimation levelCompleted={currentLevel} />
            <TransformationAnimation />
            <p className="text-center font-bold text-lg text-yellow-300">Congratulations, you are now thinner than Pancy and can join the deer herd!</p>
        </Modal>

        <Modal
            isOpen={gameStatus === GameStatus.LOST}
            title={lives > 0 ? "You Lost a Life!" : "Game Over"}
            buttonText={lives > 0 ? `Try Level ${currentLevel} Again` : 'Start from Level 1'}
            onButtonClick={ lives > 0 ? () => startLevel(currentLevel) : () => handleRestartGame() }
        >
            {lives > 0 ? (
                <>
                    <p>{lostMessage}</p>
                    <p className="font-bold text-xl my-2">You have {lives} {lives === 1 ? 'life' : 'lives'} left.</p>
                </>
            ) : (
                <>
                    <p className="font-bold text-xl my-2">Game over, you're too fat!</p>
                    <p className="text-gray-400 my-2">Try again from level 1 and FF (Full Focus).</p>
                </>
            )}
        </Modal>

    </main>
  );
};

export default App;