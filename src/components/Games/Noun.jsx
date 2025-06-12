import  { useState, useEffect } from 'react';

const GuessTheEmoji = () => {
  const questions = [
    { emoji: "🏡", english: "House", correct: "घर", options: ["विद्यालय", "बाजार", "घर"] },
    { emoji: "🏫", english: "School", correct: "विद्यालय", options: ["घर", "विद्यालय", "लड़का"] },
    { emoji: "🛍", english: "Market", correct: "बाजार", options: ["शिक्षक", "बाजार", "पुस्तक"] },
    { emoji: "🍏", english: "Apple", correct: "सेब", options: ["सेब", "लड़की", "कुर्सी"] },
    { emoji: "📚", english: "Book", correct: "पुस्तक", options: ["पुस्तक", "घर", "विद्यालय"] },
    { emoji: "🪑", english: "Chair", correct: "कुर्सी", options: ["लड़का", "कुर्सी", "शिक्षक"] },
    { emoji: "👦", english: "Boy", correct: "लड़का", options: ["लड़का", "बाजार", "विद्यालय"] },
    { emoji: "👩", english: "Girl", correct: "लड़की", options: ["घर", "लड़की", "कुर्सी"] },
    { emoji: "👨‍🏫", english: "Teacher", correct: "शिक्षक", options: ["शिक्षक", "बाजार", "सेब"] },
    { emoji: "🚗", english: "Car", correct: "गाड़ी", options: ["गाड़ी", "घर", "विद्यालय"] }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [canAnswer, setCanAnswer] = useState(true);

  const playSound = (word) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const msg = new SpeechSynthesisUtterance(word);
      msg.lang = "hi-IN";
      
      // Get available voices and set Hindi voice if available
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find(voice => voice.lang.includes('hi-IN'));
      if (hindiVoice) {
        msg.voice = hindiVoice;
      }
      
      window.speechSynthesis.speak(msg);
    }
  };

  const checkAnswer = (selected) => {
    if (!canAnswer || gameOver) return;
    
    setCanAnswer(false);
    const question = questions[currentQuestionIndex];
    
    if (selected === question.correct) {
      setResult("सही उत्तर! 🎉");
      setScore(prevScore => prevScore + 1);
      playSound(question.correct);
    } else {
      setResult("गलत उत्तर! ❌");
      playSound(question.correct); // Play correct answer for learning
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setResult('');
        setCanAnswer(true);
      } else {
        setGameOver(true);
        setResult(`खेल समाप्त! 🎉 आपका स्कोर: ${score + (selected === question.correct ? 1 : 0)}/10`);
      }
    }, 1500);
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setResult('');
    setGameOver(false);
    setCanAnswer(true);
  };

  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-purple-800 mb-8">Emoji पहचानो</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
        <div className="text-8xl mb-6 animate-bounce">{currentQuestion.emoji}</div>
        
        <div className="text-xl font-medium mb-6 flex items-center justify-center gap-2">
          {currentQuestion.english}
          <button
            onClick={() => playSound(currentQuestion.correct)}
            className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Play sound"
          >
            🔊
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => checkAnswer(option)}
              disabled={!canAnswer || gameOver}
              className={`px-6 py-3 text-lg font-medium text-white 
                ${!canAnswer && option === currentQuestion.correct 
                  ? 'bg-green-500' 
                  : 'bg-blue-500 hover:bg-blue-600'} 
                rounded-lg transition-all focus:outline-none 
                disabled:opacity-75 disabled:cursor-not-allowed`}
            >
              {option}
            </button>
          ))}
        </div>

        {result && (
          <p className={`text-xl font-bold mb-4 ${
            result.includes('सही') ? 'text-green-500' : 
            result.includes('गलत') ? 'text-red-500' : 
            'text-purple-600'
          }`}>
            {result}
          </p>
        )}

        <p className="text-xl font-bold text-gray-700">
          स्कोर: {score}/{questions.length}
        </p>

        {gameOver && (
          <button
            onClick={restartGame}
            className="mt-6 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            फिर से खेलें
          </button>
        )}
      </div>
    </div>
  );
};

export default GuessTheEmoji;