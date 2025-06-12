import  { useState } from "react";

export const GolcondaFortStory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      title: "Golconda Fort",
      image: "story/image_1.png",
      description:
        "Once upon a time... On a green hill near a little village, there stood nothing but goats and trees. One day, a clever king rode by and thought, 'This hill is perfect for a fort!'",
      hindiDescription:
        "एक समय की बात है... एक हरे-भरे पहाड़ी पर, एक छोटे से गाँव के पास, केवल बकरियाँ और पेड़ थे। एक दिन, एक समझदार राजा वहाँ से गुजरा और सोचा, 'यह पहाड़ी एक किले के लिए एकदम सही है!'",
    },
    {
      title: "Building The Fort",
      image: "story/image_2.png",
      description:
        "With hammers and shovels, workers built a big mud fort on the hill. Tap, tap, tap! The walls grew higher, and soon it became a mighty fort, strong enough to protect the king’s treasures!",
      hindiDescription:
        "हथौड़े और फावड़े लेकर, मजदूरों ने पहाड़ी पर एक बड़ा मिट्टी का किला बनाया। ठक-ठक-ठक! दीवारें ऊँची होती गईं, और जल्द ही यह एक शक्तिशाली किला बन गया, जो राजा के खजानों की रक्षा करने के लिए काफी मजबूत था!",
    },
    {
      title: "The Famous Diamond",
      image: "story/image_3.png",
      description:
        "The fort housed the famous Koh-i-Noor diamond, one of the largest in the world. It became a symbol of the fort's wealth and the king's power.",
      hindiDescription:
        "किले में प्रसिद्ध कोहिनूर हीरा रखा गया था, जो दुनिया के सबसे बड़े हीरों में से एक है। यह किले की संपत्ति और राजा की शक्ति का प्रतीक बन गया।",
    },
    {
      title: "The Mighty Cannon",
      image: "story/image.png",
      description:
        "The fort was also home to a massive cannon that could protect the kingdom from enemies far away. It was so powerful that its sound echoed across the hills!",
      hindiDescription:
        "किला एक विशाल तोप का घर भी था, जो दुश्मनों को दूर से ही हरा सकता था। यह इतनी शक्तिशाली थी कि इसकी गूंज पहाड़ियों में गूँजती थी!",
    },
    {
      title: "A Place of Wonder",
      image: "/path/to/image5.png",
      description:
        "Today, Golconda Fort is a place of wonder. Tourists visit from all over the world to explore its majestic walls and hear the stories of its glorious past.",
      hindiDescription:
        "आज, गोलकुंडा किला एक आश्चर्यजनक स्थान है। पर्यटक इसकी भव्य दीवारों को देखने और इसके शानदार अतीत की कहानियाँ सुनने के लिए दुनिया भर से आते हैं।",
    },
  ];

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const readAloud = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-blue-100 p-5 pt-18">
      <div className="w-96 bg-gradient-to-b from-blue-300 to-blue-100 shadow-xl rounded-lg overflow-hidden">
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{cards[currentIndex].title}</h1>
          <img
            src={cards[currentIndex].image}
            alt="Story Illustration"
            className="w-full rounded-lg mb-4"
          />
          <p className="text-gray-600 text-lg mb-4">{cards[currentIndex].description}</p>
          <button
            onClick={() => readAloud(cards[currentIndex].hindiDescription)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Read Aloud
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-6 gap-4">
        <button
          onClick={prevCard}
          className="px-4 py-2 bg-gray-300 rounded-lg text-gray-800 hover:bg-gray-400"
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={nextCard}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          disabled={currentIndex === cards.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GolcondaFortStory;