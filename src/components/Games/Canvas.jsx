import  { useState } from 'react';

const DrawingCanvas = () => {
  const dots = [
    { id: 1, x: 100, y: 50 },
    { id: 2, x: 130, y: 75 },
    { id: 3, x: 100, y: 100 },
    { id: 4, x: 130, y: 125 },
    { id: 5, x: 100, y: 150 },
    { id: 6, x: 175, y: 100 },
    { id: 7, x: 175, y: 40 },
    { id: 8, x: 175, y: 160 },
    { id: 9, x: 140, y: 40 },
    { id: 10, x: 205, y: 40 }
  ];

  // Define the correct sequence with backtracking
  const correctSequence = [1, 2, 3, 4, 5, 4, 3, 6, 8, 6, 7, 9, 10];
  
  const [selectedDot, setSelectedDot] = useState(null);
  const [lines, setLines] = useState([]);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const getCurveControlPoint = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    
    // First curve: 1-2-3
    if ((start.id === 1 && end.id === 2) || (start.id === 2 && end.id === 3)) {
      return {
        x: midX + 30,
        y: midY
      };
    }
    // Second curve: 3-4-5 and backtracking 5-4-3
    if ((start.id === 3 && end.id === 4) || 
        (start.id === 4 && end.id === 5) ||
        (start.id === 5 && end.id === 4) ||
        (start.id === 4 && end.id === 3)) {
      return {
        x: midX + 30,
        y: midY
      };
    }
    return null;
  };

  const isValidConnection = (start, end) => {
    const expectedStart = correctSequence[currentStep];
    const expectedEnd = correctSequence[currentStep + 1];
    
    return start.id === expectedStart && end.id === expectedEnd;
  };

  const handleDotClick = (dot) => {
    setError(''); // Clear any previous error
    
    if (!selectedDot) {
      // If this is the first dot overall, it must be dot 1
      if (lines.length === 0 && dot.id !== 1) {
        setError('Start with dot 1');
        return;
      }
      // If it's not the expected next dot in the sequence
      if (dot.id !== correctSequence[currentStep]) {
        setError(`Connect dot ${correctSequence[currentStep]} next`);
        return;
      }
      setSelectedDot(dot);
    } else {
      if (!isValidConnection(selectedDot, dot)) {
        setError(`Connect dot ${correctSequence[currentStep]} to dot ${correctSequence[currentStep + 1]}`);
        setSelectedDot(null);
        return;
      }

      const newConnection = {
        id: `${selectedDot.id}-${dot.id}-${currentStep}`, // Added step to allow duplicate lines
        start: selectedDot,
        end: dot,
        controlPoint: getCurveControlPoint(selectedDot, dot)
      };

      setLines([...lines, newConnection]);
      setCurrentStep(currentStep + 1);
      setSelectedDot(null);

      // Check if sequence is complete
      if (currentStep === correctSequence.length - 2) {
        setError('Success! You completed the sequence correctly!');
      }
    }
  };

  const getPathData = (connection) => {
    if (connection.controlPoint) {
      return `M ${connection.start.x} ${connection.start.y} 
              Q ${connection.controlPoint.x} ${connection.controlPoint.y} 
              ${connection.end.x} ${connection.end.y}`;
    } else {
      return `M ${connection.start.x} ${connection.start.y} 
              L ${connection.end.x} ${connection.end.y}`;
    }
  };

  const handleReset = () => {
    setLines([]);
    setSelectedDot(null);
    setError('');
    setCurrentStep(0);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Connect the Dots: अ</h2>
      <div className="relative w-96 h-64 border border-gray-300 rounded-lg">
        <svg className="w-full h-full" viewBox="50 0 200 200">
          {lines.map((connection) => (
            <path
              key={connection.id}
              d={getPathData(connection)}
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
          ))}
          {dots.map((dot) => (
            <g key={dot.id}>
              <circle
                cx={dot.x}
                cy={dot.y}
                r="6"
                fill={selectedDot?.id === dot.id ? 'red' : 'blue'}
                onClick={() => handleDotClick(dot)}
                className="cursor-pointer"
              />
              <text
                x={dot.x}
                y={dot.y - 10}
                textAnchor="middle"
                className="text-xs fill-black"
              >
                {dot.id}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset
        </button>
        <p className={`text-sm ${error.includes('Success') ? 'text-green-500' : 'text-red-500'} font-medium`}>
          {error}
        </p>
        <p className="text-sm text-gray-600">
          Connect dots in sequence: 1 → 2 → 3 → 4 → 5 → 4 → 3 → 6 → 8 → 6 → 7 → 9 → 10
        </p>
      </div>
    </div>
  );
};

export default DrawingCanvas;