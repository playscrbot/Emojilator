// utils/emojiConfetti.js
import confetti from 'canvas-confetti';

export function emojiConfetti() {
  const end = Date.now() + 1000;

  const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      emojis: ['🎉', '✨', '😂', '🔥', '🥳'],
      colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      emojis: ['🌍', '❤️', '🎊', '💫', '🌟'],
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}