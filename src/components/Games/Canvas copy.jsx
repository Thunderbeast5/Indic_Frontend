import  { useRef, useState, useEffect } from 'react';
import { motion } from "framer-motion";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('draw');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    context.lineWidth = lineWidth;
    context.strokeStyle = tool === 'erase' ? '#FFFFFF' : color;
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setShowAnimation(true);
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-b from-purple-300 via-pink-200 to-white0 p-4">
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg mt-15">
        <div className="flex flex-wrap gap-4 mb-4">
          <button
            onClick={() => setTool('draw')}
            className={`px-4 py-2 rounded transition-colors ${
              tool === 'draw' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Draw
          </button>
          <button
            onClick={() => setTool('erase')}
            className={`px-4 py-2 rounded transition-colors ${
              tool === 'erase' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Eraser
          </button>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-16 h-10 border rounded cursor-pointer"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Size:</span>
            <input
              type="range"
              min="1"
              max="20"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-32 cursor-pointer"
            />
          </div>
          <button
            onClick={clearCanvas}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Clear All
          </button>
        </div>
        
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="bg-white border-2 border-gray-300 rounded cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
          />
          
          {showAnimation && (
            <div 
              className="absolute top-4 left-4"
              onClick={() => setShowAnimation(false)}
            >
              <svg
                width="75"
                height="75"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M20.022,3h-5a1,1,0,0,0,0,2h1.5v6H11.57208a4.95124,4.95124,0,0,0,1.02558-3A5,5,0,0,0,3.26758,5.5.99974.99974,0,1,0,4.999,6.5,3.00021,3.00021,0,1,1,7.59766,11a1,1,0,0,0,0,2A3,3,0,1,1,4.999,17.5a.99974.99974,0,0,0-1.73144,1A5,5,0,0,0,12.59766,16a4.95124,4.95124,0,0,0-1.02558-3H16.522v7a1,1,0,0,0,2,0V5h1.5a1,1,0,0,0,0-2Z"
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0, strokeDasharray: 0, strokeDashoffset: 0 }}
                  animate={{ pathLength: 1, strokeDasharray: 1000, strokeDashoffset: 0 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;