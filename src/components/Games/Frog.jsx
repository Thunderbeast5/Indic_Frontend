import  { useState, useEffect, useCallback, useRef, useMemo } from 'react';

export default function Frog() {
  const hindi_vowels = useMemo(() => [
    'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 
    'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'
  ], []);

  const [currentTarget, setCurrentTarget] = useState('');
  const [score, setScore] = useState(0);
  const [canJump, setCanJump] = useState(true);
  const [frogPosition, setFrogPosition] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);

  const characterRef = useRef(null);
  const platformsContainerRef = useRef(null);
  
  const soundsRef = useRef({
    correct: new Audio('data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjIwLjEwMAAAAAAAAAAAAAAA//tUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFWgDMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjM1AAAAAAAAAAAAAAAAJAAAAAAAAAAAAQVa+I2kXwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sUZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU='),
    wrong: new Audio('data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjIwLjEwMAAAAAAAAAAAAAAA//tUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFWgDMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjM1AAAAAAAAAAAAAAAAJAAAAAAAAAAAAQVa+I2kXwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sUZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=')
  });

  const setNewTarget = useCallback(() => {
    setCurrentTarget(prevTarget => {
      if (!prevTarget) {
        return hindi_vowels[Math.floor(Math.random() * hindi_vowels.length)];
      }
      return prevTarget;
    });
  }, [hindi_vowels]);

  const jumpToPlatform = useCallback((platform) => {
    if (!canJump) return;
    
    setCanJump(false);
    setIsJumping(true);

    const platformRect = platform.getBoundingClientRect();
    const containerRect = platformsContainerRef.current.getBoundingClientRect();
    
    const targetX = platformRect.left - containerRect.left;
    const targetY = containerRect.height - (platformRect.bottom - containerRect.top);

    let startTime = null;
    const duration = 600;
    const jumpHeight = 150;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;
      
      if (progress < 1) {
        const x = frogPosition.x + (targetX - frogPosition.x) * progress;
        const y = targetY + Math.sin(progress * Math.PI) * jumpHeight;
        
        setFrogPosition({ x, y });
        requestAnimationFrame(animate);
      } else {
        setFrogPosition({ x: targetX, y: targetY });
        setIsJumping(false);
        soundsRef.current.correct.play();
        setScore(prev => prev + 1);
        
        setTimeout(() => {
          setCurrentTarget(hindi_vowels[Math.floor(Math.random() * hindi_vowels.length)]);
          setCanJump(true);
        }, 500);
      }
    };

    requestAnimationFrame(animate);
  }, [canJump, frogPosition, hindi_vowels]);

  const handleJump = useCallback((platform) => {
    if (!canJump) return;
    
    const vowel = platform.dataset.vowel;
    
    if (vowel === currentTarget) {
      jumpToPlatform(platform);
    } else {
      soundsRef.current.wrong.play();
      platform.classList.add('animate-shake');
      setTimeout(() => platform.classList.remove('animate-shake'), 500);
    }
  }, [canJump, currentTarget, jumpToPlatform]);

  const handleKeyDown = useCallback((e) => {
    const index = '1234567890qwe'.indexOf(e.key);
    if (index >= 0 && index < hindi_vowels.length) {
      const platform = platformsContainerRef.current?.children[index];
      if (platform) handleJump(platform);
    }
  }, [hindi_vowels, handleJump]);

  useEffect(() => {
    setNewTarget();
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setNewTarget, handleKeyDown]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-white flex flex-col items-center justify-center py-5">
      <div className="flex gap-4 mb-5">
        <div className="bg-white/90 px-8 py-3 rounded-lg shadow-lg text-2xl w-48">
          Score: <span className="text-sky-600">{score}</span>
        </div>
        <div className="bg-white/90 px-8 py-3 rounded-lg shadow-lg text-2xl w-48">
          Jump to: <span className="text-sky-800">{currentTarget}</span>
        </div>
      </div>
      
      <div className="relative w-[90%] max-w-4xl h-[70vh] bg-gradient-to-b from-sky-400 to-sky-600 rounded-2xl overflow-hidden shadow-xl">
        <div 
          ref={characterRef}
          style={{
            transform: `translate(${frogPosition.x}px, ${-frogPosition.y}px) ${isJumping ? 'rotate(180deg)' : 'rotate(0deg)'}`,
            bottom: 0,
            left: 0,
            position: 'absolute'
          }}
          className="w-16 h-16 text-5xl transition-transform duration-100"
        >
          🐸
        </div>
        <div 
            ref={platformsContainerRef}
            className="absolute bottom-10 grid grid-cols-5 gap-6 p-6 w-full"
            style={{ top: '20px' }} // Adjusting the position to move platforms down
          >
            {hindi_vowels.map((vowel, index) => (
              <div
                key={index}
                data-vowel={vowel}
                onClick={(e) => handleJump(e.currentTarget)}
                className="aspect-square cursor-pointer group"
              >
                <div className="w-full h-full bg-pink-200 rounded-full flex items-center justify-center text-2xl font-bold shadow-md transition-transform duration-300 group-hover:-translate-y-1">
                  {vowel}
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}