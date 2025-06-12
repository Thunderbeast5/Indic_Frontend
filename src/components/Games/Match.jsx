import { useEffect, useState } from 'react';
import grapesImage from "../../assets/grapes.png";
import bananaImage from "../../assets/banana.png";
import mangoImage from "../../assets/mango.png";
import watermelonImage from "../../assets/watermelon.png";
import orangeImage from "../../assets/orange.png";

const preMatchedData = [
  { fruit: <img src={grapesImage} alt="Grapes" className="w-10 h-10 object-cover rounded-lg" />, fruitHindi: "अंगूर" },
  { fruit: <img src={bananaImage} alt="Banana" className="w-10 h-10 object-cover rounded-lg" />, fruitHindi: "केला" },
  { fruit: <img src={mangoImage} alt="Mango" className="w-10 h-10 object-cover rounded-lg" />, fruitHindi: "आम" },
  { fruit: <img src={watermelonImage} alt="Watermelon" className="w-10 h-10 object-cover rounded-lg" />, fruitHindi: "तरबूज" },
  { fruit: <img src={orangeImage} alt="Orange" className="w-10 h-10 object-cover rounded-lg" />, fruitHindi: "संतरा" },
];

const shuffledArray = (matchingData) => {
  return matchingData.slice().sort(() => Math.random() - 0.5);
};

export default function Game() {
  const [shuffledMatchedData, setShuffledMatchedData] = useState([]);
  const [pairedData, setPairedData] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    setShuffledMatchedData(shuffledArray(preMatchedData));
  }, []);

  const handleCapitalClick = (match) => {
    if (selectedMatch && match.fruitHindi === selectedMatch.fruitHindi) {
      const newPairedMatch = [...pairedData, { fruit: selectedMatch.fruit, fruitHindi: match.fruitHindi }];
      setPairedData(newPairedMatch);
    }
    setSelectedMatch(null);
  };

  const isMatched = (match) => {
    return pairedData.some((pairedMatch) => pairedMatch.fruitHindi === match.fruitHindi);
  };

  // const win = pairedData.length === preMatchedData.length;

  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-gradient-to-b from-purple-300 via-pink-200 to-white overflow-auto flex items-center justify-center">
      <div className="relative w-full flex flex-col items-center">
        {/* {win && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-8 py-2.5 rounded-lg shadow-lg shadow-green-500/20 z-50">
            <h2 className="text-2xl m-0">You Win!</h2>
          </div>
        )}
         */}
        <div className="flex gap-5 justify-center p-5">
          <div className="flex flex-col gap-4">
            {preMatchedData.map((match, index) => (
              <button
                key={index}
                onClick={() => setSelectedMatch(match)}
                className={`
                  w-52 h-20 flex justify-center items-center
                  bg-white border border-black/10 rounded-2xl
                  text-lg text-gray-700 cursor-pointer
                  transition-all duration-200 outline-none
                  hover:translate-y-[-2px] hover:shadow-lg
                  ${isMatched(match) ? 'bg-green-500 text-black border-green-500' : ''}
                  ${selectedMatch === match ? 'bg-gray-600 text-white border-gray-600' : ''}
                  ${isMatched(match) ? '' : 'hover:shadow-black/10'}
                `}
              >
                {match.fruit}
              </button>
            ))}
          </div>
          
          <div className="flex flex-col gap-4">
            {shuffledMatchedData.map((match, index) => (
              <button
                key={index}
                onClick={() => handleCapitalClick(match)}
                disabled={selectedMatch === null}
                className={`
                  w-52 h-20 flex justify-center items-center
                  bg-white border border-black/10 rounded-2xl
                  text-lg text-gray-700
                  transition-all duration-200 outline-none
                  ${isMatched(match) ? 'bg-green-500 text-black border-green-500' : ''}
                  ${selectedMatch === null ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:translate-y-[-2px] hover:shadow-lg hover:shadow-black/10'}
                `}
              >
                {match.fruitHindi}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}