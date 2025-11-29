import React, { useState, useEffect } from 'react';

const PuzzleGame = () => {
  // 3x3 sliding puzzle (8-puzzle)
  const [tiles, setTiles] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0]); // 0 represents empty
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [secretDate, setSecretDate] = useState('');
  
  const winState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  
  // Shuffle tiles on mount
  useEffect(() => {
    shuffleTiles();
  }, []);
  
  // Check if puzzle is solved
  useEffect(() => {
    if (tiles.join('') === winState.join('') && moves > 0) {
      setIsSolved(true);
      revealSecret();
    }
  }, [tiles]);
  
  const shuffleTiles = () => {
    let shuffled = [...tiles];
    // Perform random valid moves to ensure solvability
    for (let i = 0; i < 100; i++) {
      const emptyIndex = shuffled.indexOf(0);
      const validMoves = getValidMoves(emptyIndex);
      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
      [shuffled[emptyIndex], shuffled[randomMove]] = [shuffled[randomMove], shuffled[emptyIndex]];
    }
    setTiles(shuffled);
    setMoves(0);
    setIsSolved(false);
    setSecretDate('');
  };
  
  const getValidMoves = (emptyIndex) => {
    const validMoves = [];
    const row = Math.floor(emptyIndex / 3);
    const col = emptyIndex % 3;
    
    if (row > 0) validMoves.push(emptyIndex - 3); // up
    if (row < 2) validMoves.push(emptyIndex + 3); // down
    if (col > 0) validMoves.push(emptyIndex - 1); // left
    if (col < 2) validMoves.push(emptyIndex + 1); // right
    
    return validMoves;
  };
  
  const handleTileClick = (index) => {
    if (isSolved) return;
    
    const emptyIndex = tiles.indexOf(0);
    const validMoves = getValidMoves(emptyIndex);
    
    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      setMoves(moves + 1);
    }
  };
  
  const revealSecret = () => {
    // Reveal the "secret date" when puzzle is solved
    setTimeout(() => {
      setSecretDate('??? / ?? / ????'); // Placeholder - replace with actual secret date
    }, 500);
  };
  
  const getTileDisplay = (value) => {
    // Display cryptic symbols instead of numbers
    const symbols = ['', 'Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ'];
    return symbols[value];
  };
  
  return (
    <div className="relative z-10 flex flex-col items-center px-4 py-8 md:py-12">
      {/* Puzzle Container */}
      <div className="bg-gray-900/80 border-2 border-green-500/50 rounded-lg p-4 md:p-6 backdrop-blur-sm">
        <h3 className="text-green-400 font-mono text-center mb-4 text-lg md:text-xl">
          ◈ DECODE THE TRANSMISSION ◈
        </h3>
        
        {/* Puzzle Grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-2 w-48 h-48 md:w-64 md:h-64 mx-auto">
          {tiles.map((tile, index) => (
            <button
              key={index}
              onClick={() => handleTileClick(index)}
              className={`
                w-14 h-14 md:w-20 md:h-20
                flex items-center justify-center
                text-xl md:text-2xl font-bold font-mono
                rounded-md
                transition-all duration-150
                ${tile === 0 
                  ? 'bg-gray-950 border border-gray-800' 
                  : 'bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-green-500/30 hover:border-green-400 hover:from-gray-600 hover:to-gray-700 active:scale-95 cursor-pointer text-green-400 shadow-lg'
                }
              `}
              disabled={tile === 0 || isSolved}
            >
              {getTileDisplay(tile)}
            </button>
          ))}
        </div>
        
        {/* Game Stats */}
        <div className="mt-4 text-center font-mono">
          <p className="text-gray-400 text-sm">
            MOVES: <span className="text-green-400">{moves}</span>
          </p>
        </div>
        
        {/* Solved State */}
        {isSolved && (
          <div className="mt-4 text-center animate-pulse">
            <p className="text-green-400 font-mono text-lg mb-2">
              ◈ TRANSMISSION DECODED ◈
            </p>
            <p className="text-yellow-400 font-mono text-xl font-bold">
              THE REAL DATE: {secretDate}
            </p>
            <p className="text-red-500 font-mono text-sm mt-2">
              REMEMBER: DO NOT TELL ANYONE
            </p>
          </div>
        )}
        
        {/* Reset Button */}
        <div className="mt-4 text-center">
          <button
            onClick={shuffleTiles}
            className="px-6 py-2 bg-gray-800 border border-green-500/50 rounded-md text-green-400 font-mono text-sm hover:bg-gray-700 hover:border-green-400 transition-all active:scale-95"
          >
            ▶ RESET TRANSMISSION
          </button>
        </div>
        
        {/* Instructions */}
        <p className="text-gray-500 text-xs font-mono text-center mt-4 max-w-xs">
          [TAP OR CLICK TILES TO SLIDE THEM INTO ORDER]
        </p>
      </div>
      
      {/* Placeholder indicator */}
      <p className="text-green-500/30 text-xs font-mono mt-4">
        [PUZZLE GAME PLACEHOLDER - CUSTOMIZE AS NEEDED]
      </p>
    </div>
  );
};

export default PuzzleGame;
