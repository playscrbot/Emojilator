import React, { useState } from 'react';

const prompts = [
  {
    text: "You just spilled coffee on your keyboard 💻☕",
    options: ["😭", "🤬", "😐", "😂"],
    popular: "😭"
  },
  {
    text: "Your dog ran into fresh mud 🐶🌧️",
    options: ["🤣", "😩", "🤷", "🫠"],
    popular: "😩"
  },
  {
    text: "Your crush liked your selfie ❤️📸",
    options: ["😳", "😎", "😍", "😬"],
    popular: "😍"
  },
  {
    text: "You accidentally sent a message to the wrong group chat 📱😳",
    options: ["😬", "😱", "🤣", "🤦"],
    popular: "😬"
  },
  {
    text: "Your favorite show just got canceled 📺💔",
    options: ["😭", "😤", "😢", "🤷"],
    popular: "😭"
  },
  {
    text: "You aced an exam you didn’t study for 🧠🎉",
    options: ["😎", "😲", "💃", "😅"],
    popular: "😎"
  },
  {
    text: "You walked into a glass door 🚪😅",
    options: ["🤕", "😂", "😑", "😬"],
    popular: "😂"
  },
  {
    text: "Your sibling ate your leftovers 😡🍕",
    options: ["🤬", "😢", "😐", "🤣"],
    popular: "🤬"
  },
  {
    text: "You just got a surprise day off 🏖️🎉",
    options: ["🥳", "🕺", "🛌", "😎"],
    popular: "🥳"
  },
  {
    text: "You forgot it was your best friend’s birthday 🎂😬",
    options: ["😱", "😔", "🫣", "🤦"],
    popular: "🫣"
  },
  {
    text: "You woke up 5 minutes before your meeting 😴📞",
    options: ["😳", "🏃", "😵", "🤷"],
    popular: "🏃"
  },
  {
    text: "Your package got delivered to the wrong address 📦❌",
    options: ["😡", "😭", "😑", "🤷"],
    popular: "😑"
  },
  {
    text: "You saw a spider in your bed 🕷️🛏️",
    options: ["😱", "🕳️", "🏃", "🤯"],
    popular: "😱"
  },
  {
    text: "You found money in your old jeans 💸👖",
    options: ["🤑", "😄", "😲", "💃"],
    popular: "🤑"
  },
  {
    text: "You got rickrolled again 🎵😅",
    options: ["😂", "😐", "🙄", "🕺"],
    popular: "😂"
  },
  {
    text: "You forgot to hit 'Save' before your laptop died 💾🔋",
    options: ["😩", "🤬", "😭", "😵"],
    popular: "😭"
  },
  {
    text: "Your cat knocked over your water glass 🐱💧",
    options: ["🙄", "🤣", "😤", "😐"],
    popular: "🤣"
  },
  {
    text: "You got stuck in the rain without an umbrella 🌧️🚶",
    options: ["😩", "😂", "☔", "😒"],
    popular: "😂"
  },
  {
    text: "You accidentally liked a post from 2013 📲👀",
    options: ["😬", "😳", "🫣", "😭"],
    popular: "😳"
  },
  {
    text: "You got called on in a meeting while daydreaming 🧠💭",
    options: ["😵", "😳", "🤣", "😐"],
    popular: "😳"
  },
  {
    text: "You stepped on a LEGO 🧱🦶",
    options: ["🤬", "😭", "😤", "🫠"],
    popular: "🫠"
  },
  {
    text: "You tried to be cool and tripped in front of everyone 😎➡️🤕",
    options: ["😳", "🤣", "😬", "🫠"],
    popular: "🤣"
  },
  {
    text: "You forgot your laptop at home on a workday 💼🏠",
    options: ["😱", "😩", "🤦", "😭"],
    popular: "🤦"
  },
  {
    text: "You cooked something new and it actually turned out amazing 🍳👏",
    options: ["😲", "🤤", "👨‍🍳", "🥳"],
    popular: "🥳"
  },
  {
    text: "You were singing with headphones on... and forgot you're in public 🎧🎤",
    options: ["😅", "😂", "😳", "🤷"],
    popular: "😂"
  },
  {
    text: "Your phone slipped and landed face down 📱💥",
    options: ["😨", "😬", "🫣", "😭"],
    popular: "🫣"
  },
  {
    text: "You nailed your presentation without even trying 🎤😎",
    options: ["🔥", "👏", "😌", "😎"],
    popular: "😎"
  },
  {
    text: "You got caught taking a selfie in public 🤳👀",
    options: ["😳", "🤣", "🫣", "😐"],
    popular: "🤣"
  },
  {
    text: "You laughed so hard you snorted 🤧😂",
    options: ["😂", "😳", "😅", "🤣"],
    popular: "😂"
  },
  {
    text: "Your pizza arrived cold 🍕🥶",
    options: ["😩", "🤬", "🤷", "😭"],
    popular: "😩"
  },
  {
    text: "You overslept and missed the train 🚆🛌",
    options: ["😱", "🤦", "😵", "😭"],
    popular: "🤦"
  },
  {
    text: "You accidentally replied all to a work email 📧😬",
    options: ["🫣", "😐", "😭", "😵"],
    popular: "🫣"
  },
  {
    text: "You saw your favorite artist live 🎶🎤",
    options: ["😍", "🥳", "😭", "🕺"],
    popular: "😍"
  },
  {
    text: "You realized it’s Sunday and tomorrow’s Monday 😩📆",
    options: ["😢", "😭", "🫠", "😐"],
    popular: "🫠"
  },
  {
    text: "You dropped your snack and the floor ate it 🍪🫥",
    options: ["😭", "😤", "😢", "🫠"],
    popular: "😭"
  },
  {
    text: "Your internet disconnected right before saving 💻🚫",
    options: ["😤", "😭", "🫠", "😱"],
    popular: "😤"
  },
  {
    text: "You accidentally wore mismatched socks 🧦🤔",
    options: ["🤣", "😐", "🫠", "🤷"],
    popular: "🤣"
  },
  {
    text: "You found your childhood toy 🎁😌",
    options: ["🥹", "😊", "😍", "😭"],
    popular: "🥹"
  },
  {
    text: "You realized you’ve been on mute the whole time 🧏🔇",
    options: ["😳", "🤣", "😭", "🫣"],
    popular: "🫣"
  },
  {
    text: "You bit your tongue while eating 🥴🍽️",
    options: ["😤", "😭", "😖", "😐"],
    popular: "😖"
  },
  {
    text: "You got stuck behind a slow walker 🚶🐢",
    options: ["😒", "😤", "🤷", "🙄"],
    popular: "🙄"
  },
  {
    text: "You remembered something embarrassing from years ago 😳🧠",
    options: ["🫣", "😭", "😂", "😩"],
    popular: "🫣"
  },
  {
    text: "Your crush waved... but it wasn’t at you 🧍👋",
    options: ["😬", "😳", "😭", "🫠"],
    popular: "🫠"
  },
  {
    text: "You spilled something on your white shirt 👕☕",
    options: ["🤦", "🫣", "😤", "😂"],
    popular: "🤦"
  },
  {
    text: "You got tagged in an old awkward photo 🖼️😅",
    options: ["😭", "🤣", "😳", "🙈"],
    popular: "😳"
  },
  {
    text: "You made it just in time for the last train 🏃🚆",
    options: ["😮‍💨", "👏", "🔥", "😎"],
    popular: "😮‍💨"
  },
  {
    text: "You opened the fridge and forgot what you wanted 🧊🤔",
    options: ["😐", "🙄", "🫠", "😂"],
    popular: "🫠"
  },
  {
    text: "You got a compliment from a stranger 🥰🙌",
    options: ["😊", "😍", "😳", "😌"],
    popular: "😊"
  }
];

export default function MoodMapper() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleEmojiClick = (emoji) => {
    const correct = prompts[current].popular;
    if (emoji === correct) {
      setScore(prev => prev + 1);
      setFeedback(`✅ Great! ${emoji} was the most chosen!`);
    } else {
      setFeedback(`😅 Oops! ${correct} was more popular.`);
    }

    setTimeout(() => {
      setFeedback('');
      setCurrent((prev) => (prev + 1) % prompts.length);
    }, 2000);
  };

  return (
    <div className="emoji-mood-mapper">
      <h2>🎭 Mood Mapper</h2>
      <p className="mood-prompt">💬 {prompts[current].text}</p>

      <div className="emoji-mood-options">
        {prompts[current].options.map((emoji, i) => (
          <button key={i} className="emoji-mood-btn" onClick={() => handleEmojiClick(emoji)}>
            {emoji}
          </button>
        ))}
      </div>

      {feedback && <div className="emoji-mood-feedback">{feedback}</div>}
      <div className="game-scoreboard">🧠 Score: {score}</div>
    </div>
  );
}