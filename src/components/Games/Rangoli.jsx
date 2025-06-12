import  { useState } from 'react';

// Define the initial rangoli pattern with color names for a house design using squares, triangles, and circles
const initialPattern = [
  // Square Base (House body)
  { 
    id: 1, 
    name: 'Yellow', 
    fill: 'white', 
    path: 'M150,150 h100 v100 h-100 Z' // Square
  },
  // Roof (Triangle)
  { 
    id: 2, 
    name: 'Red', 
    fill: 'white', 
    path: 'M150,150 L200,100 L250,150 Z' // Triangle (Roof)
  },
  // Roof (Triangle - other side)
  { 
    id: 3, 
    name: 'Purple', 
    fill: 'white', 
    path: 'M150,150 L100,100 L50,150 Z' // Triangle (Roof - other side)
  },
  // Circle at the top left
  { 
    id: 4, 
    name: 'Blue', 
    fill: 'white', 
    path: 'M50,150 m0,-30 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0' // Circle
  },
  // Circle at the top right
  { 
    id: 5, 
    name: 'Green', 
    fill: 'white', 
    path: 'M250,150 m0,-30 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0' // Circle
  },
  // Decorative elements (optional)
  {
    id: 6,
    name: 'Orange',
    fill: 'white',
    path: 'M150,150 m-20,-20 l-20,-20 a10,10 0 1,1 20,-20 l20,20'
  },
  {
    id: 7,
    name: 'Pink',
    fill: 'white',
    path: 'M150,150 m20,-20 l20,-20 a10,10 0 1,0 20,20 l-20,20'
  },
  {
    id: 8,
    name: 'Purple',
    fill: 'white',
    path: 'M150,150 m20,20 l20,20 a10,10 0 1,1 -20,20 l-20,-20'
  }
];

const availableColors = [
  { name: 'Yellow', value: '#FFD700' },
  { name: 'Red', value: '#FF4444' },
  { name: 'Purple', value: '#8844FF' },
  { name: 'Blue', value: '#4444FF' },
  { name: 'Green', value: '#44FF44' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Pink', value: '#FF69B4' }
];

const RangoliGame = () => {
  const [pattern, setPattern] = useState(initialPattern);
  const [selectedColor, setSelectedColor] = useState(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setMessage('');
  };

  const handlePatternClick = (section) => {
    if (!selectedColor) {
      setMessage('Please select a color first!');
      return;
    }

    const newPattern = pattern.map((item) => {
      if (item.id === section.id) {
        const isCorrect = selectedColor.name === item.name;
        if (isCorrect && item.fill === 'white') {
          setScore(score + 1);
          setMessage('Correct color!');
        } else if (!isCorrect) {
          setMessage('Try a different color!');
        }
        return {
          ...item,
          fill: selectedColor.value
        };
      }
      return item;
    });

    setPattern(newPattern);
  };

  const resetGame = () => {
    setPattern(initialPattern);
    setScore(0);
    setSelectedColor(null);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-yellow-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-orange-800 mb-4">House Rangoli</h1>
      <p className="text-lg text-orange-600 mb-8">Fill in the pattern with correct colors</p>
      
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 relative">
        <svg width="400" height="400" viewBox="50,50 200,200" className="mb-4">
          {pattern.map((section) => (
            <g key={section.id}>
              <path
                d={section.path}
                fill={section.fill}
                stroke="black"
                strokeWidth="1"
                onClick={() => handlePatternClick(section)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <title>{section.name}</title>
            </g>
          ))}
        </svg>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8 max-w-md">
        {availableColors.map((color) => (
          <button
            key={color.name}
            onClick={() => handleColorSelect(color)}
            className={`w-16 h-16 rounded-full shadow-md transition-transform ${
              selectedColor?.name === color.name ? 'scale-110 ring-4 ring-black' : 'hover:scale-105'
            }`}
            style={{ backgroundColor: color.value }}
          >
            <span className="sr-only">{color.name}</span>
          </button>
        ))}
      </div>

      {message && (
        <div className={`text-lg font-semibold mb-4 ${
          message.includes('Correct') ? 'text-green-600' : 'text-orange-600'
        }`}>
          {message}
        </div>
      )}

      <div className="flex gap-4">
        <div className="bg-white rounded-lg px-6 py-3 shadow-md">
          <span className="text-xl font-semibold">Score: {score}/{initialPattern.length}</span>
        </div>
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default RangoliGame;