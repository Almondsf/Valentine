import React, { useState } from "react";
import { Heart, HeartCrack, Heart as Hearts, PartyPopper } from "lucide-react";

function App() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [noCount, setNoCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Make the no button shrink faster and eventually disappear
  const noButtonSize = Math.max(0, 100 - noCount * 15);
  const noButtonOpacity = Math.max(0, 1 - noCount * 0.1);
  // Make the yes button grow more dramatically
  const yesButtonSize = Math.min(300, 100 + noCount * 20);

  const handleNoHover = () => {
    const maxWidth = window.innerWidth - 300;
    const maxHeight = window.innerHeight - 100;

    const newX = Math.random() * maxWidth;
    const newY = Math.random() * maxHeight;

    setTimeout(() => {
      setPosition({
        x: Math.max(50, Math.min(newX, maxWidth)),
        y: Math.max(50, Math.min(newY, maxHeight)),
      });
      setNoCount((prev) => prev + 1);
    }, 100);
  };

  const getNoButtonText = () => {
    const texts = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely sure?",
      "This could be a mistake!",
      "Don't do this!",
      "I'm fading away...",
      "Almost gone...",
      "Bye bye...",
    ];
    return texts[Math.min(noCount, texts.length - 1)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {answer === null ? (
          <>
            <div className="mb-8 animate-bounce">
              <Hearts className="w-20 h-20 mx-auto text-red-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Will you be my Valentine?
            </h1>
            <p className="text-lg text-gray-600 mb-8 italic">
              - With love, Oluwafemi 💝
            </p>
            <div className="space-y-4">
              <button
                onClick={() => setAnswer("yes")}
                style={{
                  fontSize: `${yesButtonSize}%`,
                  transform: `scale(${1 + noCount * 0.1})`,
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-110"
              >
                Yes! <Heart className="inline ml-2" />
              </button>

              {noButtonSize > 0 && (
                <button
                  onClick={() => handleNoHover()}
                  onMouseEnter={handleNoHover}
                  style={{
                    position: "absolute",
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    fontSize: `${noButtonSize}%`,
                    opacity: noButtonOpacity,
                    transition: "all 0.5s ease-out",
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full whitespace-nowrap"
                >
                  {getNoButtonText()} <HeartCrack className="inline ml-2" />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="animate-fadeIn">
            <PartyPopper className="w-20 h-20 mx-auto text-yellow-500 animate-bounce" />
            <h1 className="text-4xl font-bold text-gray-800 mt-8 mb-4">
              {answer === "yes"
                ? "Yay! You've made me the happiest! 💖"
                : "Maybe next time! 💔"}
            </h1>
            <p className="text-gray-600 text-lg">
              {answer === "yes"
                ? "I promise to make this Valentine's Day special!"
                : "I'll keep trying to win your heart!"}
            </p>
            <p className="text-gray-600 mt-4 italic">- Oluwafemi😎</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
