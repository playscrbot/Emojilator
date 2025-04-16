import React, { useState } from 'react';

const questions = [
  {
    question: "How often do you use emojis in a single message?",
    options: [
      { text: "Never", score: 1 },
      { text: "occasionally", score: 2 },
      { text: "Every message!", score: 3 }
    ]
  },
  {
    question: "Do you think emojis replace emotions better than text?",
    options: [
      { text: "Nope, words matter more", score: 2 },
      { text: "They help a lot", score: 2 },
      { text: "They say it *better* than words!", score: 1 }
    ]
  },
  {
    question: "What type of emoji are you?",
    options: [
      { text: "💀", score: 1 },
      { text: "👽", score: 1 },
      { text: "🤖", score: 2 },
      { text: "🤡", score: 2 },
      { text: "👻", score: 2 },
      { text: "👾", score: 1 },
      { text: "👹", score: 1 },
      { text: "👺", score: 1 },
    ]
  },
];

const getResult = (score) => {
  if (score <= 4) return { type: "Silent Type", emoji: "🤐", description: "You prefer clarity and minimalism. Emojis are just a bonus, not a need." };
  if (score <= 6) return { type: "Reaction Fanatic", emoji: "😎", description: "You know how to drop the perfect emoji for every moment." };
  return { type: "Emoji Storyteller", emoji: "🎨", description: "You use emojis as a whole *language* — your DMs are practically emoji novels!" };
};

export default function EmojiQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleOption = (points) => {
    const newScore = score + points;
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setScore(newScore);
    } else {
      setScore(newScore);
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
  };

  const result = getResult(score);

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      {!finished ? (
        <>
          <h2 className="text-2xl font-bold mb-4">🧠 Emoji Communicator Quiz</h2>
          <p className="text-lg text-gray-300 mb-6">{questions[current].question}</p>
          <div className="space-y-4">
            {questions[current].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleOption(opt.score)}
                className="block w-full bg-purple-600 hover:bg-purple-500 transition px-4 py-2 rounded text-white"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4">🚀 Result: {result.type}</h2>
          <div className="text-6xl mb-4">{result.emoji}</div>
          <p className="text-lg text-gray-300 mb-6">{result.description}</p>
          <button
            onClick={restartQuiz}
            className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-300"
          >
            Try Again
          </button>
        </>
      )}
    </div>
  );
}