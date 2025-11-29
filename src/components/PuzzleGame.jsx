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
    let shuffled = [...winState];
    // Perform only 10-15 random moves for an easier puzzle
    const shuffleCount = 10 + Math.floor(Math.random() * 6);
    for (let i = 0; i < shuffleCount; i++) {
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
      setSecretDate('DECEMBER 12TH, 2025');
    }, 500);
  };
  
  const getTileDisplay = (value) => {
    // Display cryptic symbols instead of numbers
    const symbols = ['', 'Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ'];
    return symbols[value];
  };
  
  return (
    <div className="relative z-10 flex flex-col items-center px-4 py-8 md:py-12">
      {/* Puzzle Container - weathered wanted poster style */}
      <div className="bg-stone-900/90 border-2 border-amber-800/50 rounded-lg p-4 md:p-6 backdrop-blur-sm" style={{boxShadow: '0 0 30px rgba(139, 69, 19, 0.2), inset 0 0 60px rgba(0,0,0,0.4)'}}>
        <h3 className="text-amber-500 font-mono text-center mb-4 text-lg md:text-xl">
          ✧ DECODE THE TRANSMISSION ✧
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
                  ? 'bg-stone-950 border border-stone-800' 
                  : 'bg-gradient-to-br from-stone-700 to-stone-800 border-2 border-amber-700/40 hover:border-amber-500 hover:from-stone-600 hover:to-stone-700 active:scale-95 cursor-pointer text-amber-500 shadow-lg'
                }
              `}
              style={tile !== 0 ? {boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.5)'} : {}}
              disabled={tile === 0 || isSolved}
            >
              {getTileDisplay(tile)}
            </button>
          ))}
        </div>
        
        {/* Game Stats */}
        <div className="mt-4 text-center font-mono">
          <p className="text-stone-500 text-sm">
            MOVES: <span className="text-amber-500">{moves}</span>
          </p>
        </div>
        
        {/* Solved State */}
        {isSolved && (
          <div className="mt-4 text-center animate-pulse">
            <p className="text-amber-500 font-mono text-lg mb-2">
              ✧ TRANSMISSION DECODED ✧
            </p>
            <p className="text-orange-400 font-mono text-xl font-bold">
              THE REAL DATE: {secretDate}
            </p>
            <p className="text-red-800 font-mono text-sm mt-2">
              REMEMBER: DO NOT TELL ANYONE
            </p>
          </div>
        )}
        
        {/* Reset Button */}
        <div className="mt-4 text-center">
          <button
            onClick={shuffleTiles}
            className="px-6 py-2 bg-stone-800 border border-amber-700/50 rounded-md text-amber-500 font-mono text-sm hover:bg-stone-700 hover:border-amber-500 transition-all active:scale-95"
          >
            ▶ RESET TRANSMISSION
          </button>
        </div>
        
        {/* Instructions */}
        <p className="text-stone-600 text-xs font-mono text-center mt-4 max-w-xs">
          [TAP OR CLICK TILES TO SLIDE THEM INTO ORDER]
        </p>
      </div>
      
      {/* Placeholder indicator */}
    </div>
  );
};

export default PuzzleGame;
