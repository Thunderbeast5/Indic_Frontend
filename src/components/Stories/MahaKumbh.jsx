// import { useState } from "react";

export const MahaKumbh = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-blue-100 p-5 pt-18">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">प्रतापपुर के नन्हे खोजी और महाकुंभ का रहस्य!</h1>
          <video
            src="story/videos/mahakumbh.mp4"  // Use the same video
            controls
            className="w-full h-auto rounded-lg mb-4"  // Adjusted width and height
          />
        </div>
      </div>
    </div>
  );
};

export default MahaKumbh;