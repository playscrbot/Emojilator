import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export default function VRHome() {
    const floatingEmojis = [
        { emoji: '📅', label: 'Introduced in 2010' },
        { emoji: '😂', label: 'Most used emoji' },
        { emoji: '🧠', label: 'Represents intellect' },
    ];
    
    const dataPanels = [
        { title: "Total Emojis", value: "3,633" },
        { title: "Oldest Emoji", value: "💩 (1999)" },
        { title: "Unicode Version", value: "15.1" },
    ];
    
    const navigate = useNavigate();

    return (
      <div className="vr-home">
        <div className="floating-orbs">
          {floatingEmojis.map((item, i) => (
            <motion.div
              key={i}
              className="orb"
              initial={{ y: 0 }}
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4 + i }}
            >
              <span className="tooltip">{item.label}</span>
              <span className="orb-emoji">{item.emoji}</span>
            </motion.div>
          ))}
        </div>
        <h1 className="vr-h1">✨ Welcome to the EmojiVerse</h1>
        <p className="vr-p">Explore the journey of emojis like never before</p>
        <motion.button
          className="enter-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/museum/enter')}
        >
         🚪 Enter the Museum
        </motion.button>
        <div className="data-panels">
          {dataPanels.map((item, i) => (
            <motion.div
              key={i}
              className="data-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <h4>{item.title}</h4>
              <p className="data-value">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
}