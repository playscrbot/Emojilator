import React, { useState } from "react";

const emojiTraitsMap = {
  '😀': {
    mood: 'Joyful',
    vibe: 'Classic',
    signature: 'Cheer Up Icon',
    meter: ['energetic']
  },
  '😢': {
    mood: 'Sad',
    vibe: 'Blue Hue',
    signature: 'Tear Drop',
    meter: ['sad']
  },
  '❤️': {
    mood: 'Loving',
    vibe: 'Warm & Caring',
    signature: 'Heart Core',
    meter: ['happy']
  },
  '🤖': {
    mood: 'Neutral',
    vibe: 'Futuristic',
    signature: 'Bot Pulse',
    meter: ['expressionless']
  },
  '😎': {
    mood: 'Cool',
    vibe: 'Confident',
    signature: 'Stylish',
    meter: ['calm']
  },
  '🍕🧢': {
    mood: 'Playful',
    vibe: 'Casual Fun',
    signature: 'Slice of Style',
    meter: ['energetic']
  },
  '🪞🐍': {
    mood: 'Mysterious',
    vibe: 'Dual Nature',
    signature: 'Reflection Deception',
    meter: ['sad']
  },
  '🐔💼': {
    mood: 'Ambitious',
    vibe: 'Corporate Quirky',
    signature: 'Business Clucker',
    meter: ['energetic']
  },
  '🧃🛸': {
    mood: 'Whimsical',
    vibe: 'Out of This World',
    signature: 'Alien Refreshment',
    meter: ['expressionless']
  },
  '📞💀': {
    mood: 'Dark Humor',
    vibe: 'Edgy Retro',
    signature: 'Final Call',
    meter: ['sad']
  },
  '😂': {
    mood: 'Hilarious',
    vibe: 'Laughing Fit',
    signature: 'Tears of Joy',
    meter: ['energetic', 'happy']
  },
  '🔥': {
    mood: 'Intense',
    vibe: 'Hot & Bold',
    signature: 'Blazing Spirit',
    meter: ['exciting', 'powerful']
  },
  '✨': {
    mood: 'Magical',
    vibe: 'Sparkly & Bright',
    signature: 'Shimmer Effect',
    meter: ['happy', 'calm']
  },
  '🤯': {
    mood: 'Mind-Blown',
    vibe: 'Explosive',
    signature: 'Brain Melt',
    meter: ['shocked', 'energetic']
  },
  '🥺': {
    mood: 'Pleading',
    vibe: 'Soft & Vulnerable',
    signature: 'Puppy Eyes',
    meter: ['sad', 'emotional']
  },
  '🤔': {
    mood: 'Thoughtful',
    vibe: 'Pensive',
    signature: 'Deep Thinker',
    meter: ['neutral', 'curious']
  },
  '🥰': {
    mood: 'Adoring',
    vibe: 'Loving Bliss',
    signature: 'Heart Eyes',
    meter: ['happy', 'loving']
  },
  '😤': {
    mood: 'Frustrated',
    vibe: 'Steamed Up',
    signature: 'Puffed Cheeks',
    meter: ['angry', 'annoyed']
  },
  '🤩': {
    mood: 'Starstruck',
    vibe: 'Dazzled',
    signature: 'Sparkle Gaze',
    meter: ['excited', 'happy']
  },
  '😴': {
    mood: 'Sleepy',
    vibe: 'Drowsy',
    signature: 'Zzz Effect',
    meter: ['calm', 'tired']
  },
  '🤪': {
    mood: 'Zany',
    vibe: 'Wild & Crazy',
    signature: 'Goofy Grin',
    meter: ['energetic', 'silly']
  },
  '😈': {
    mood: 'Mischievous',
    vibe: 'Devilish',
    signature: 'Little Horns',
    meter: ['playful', 'sly']
  },
  '🙄': {
    mood: 'Unimpressed',
    vibe: 'Sarcastic',
    signature: 'Eye Roll',
    meter: ['annoyed', 'neutral']
  },
  '🤑': {
    mood: 'Greedy',
    vibe: 'Money Hungry',
    signature: 'Dollar Eyes',
    meter: ['excited', 'playful']
  },
  '🤮': {
    mood: 'Disgusted',
    vibe: 'Revolting',
    signature: 'Green Gag',
    meter: ['sick', 'unhappy']
  },
  '🥶': {
    mood: 'Freezing',
    vibe: 'Icy Chill',
    signature: 'Frostbite',
    meter: ['shocked', 'uncomfortable']
  },
  '🤬': {
    mood: 'Furious',
    vibe: 'Explosive Rage',
    signature: 'Symbol Mouth',
    meter: ['angry', 'intense']
  },
  '🫠': {
    mood: 'Melting',
    vibe: 'Overwhelmed',
    signature: 'Gooey Drip',
    meter: ['sad', 'exhausted']
  },
  '🤫': {
    mood: 'Secretive',
    vibe: 'Hush-Hush',
    signature: 'Shushing Lips',
    meter: ['mysterious', 'calm']
  },
  '🫡': {
    mood: 'Respectful',
    vibe: 'Saluting',
    signature: 'Honor Gesture',
    meter: ['neutral', 'formal']
  },
  '😇': {  
    mood: 'Innocent',  
    vibe: 'Angel Aura',  
    signature: 'Halo Glow',  
    meter: ['pure', 'calm']  
  },  
  '🤠': {  
    mood: 'Adventurous',  
    vibe: 'Wild West',  
    signature: 'Cowboy Swagger',  
    meter: ['confident', 'playful']  
  },  
  '🧐': {  
    mood: 'Analytical',  
    vibe: 'Investigative',  
    signature: 'Monocle Gaze',  
    meter: ['curious', 'serious']  
  },  
  '🥴': {  
    mood: 'Woozy',  
    vibe: 'Dizzy Spell',  
    signature: 'Spinning Eyes',  
    meter: ['confused', 'silly']  
  },  
  '😏': {  
    mood: 'Smug',  
    vibe: 'Sly Grin',  
    signature: 'Knowing Look',  
    meter: ['playful', 'confident']  
  },  
  '🤢': {  
    mood: 'Nauseous',  
    vibe: 'Sickly',  
    signature: 'Green Tinge',  
    meter: ['unwell', 'disgusted']  
  },  
  '😵': {  
    mood: 'Dizzy',  
    vibe: 'Spaced Out',  
    signature: 'X Eyes',  
    meter: ['confused', 'exhausted']  
  },  
  '🫣': {  
    mood: 'Shy',  
    vibe: 'Peek-a-Boo',  
    signature: 'Hidden Face',  
    meter: ['nervous', 'playful']  
  },  
  '🤓': {  
    mood: 'Nerdy',  
    vibe: 'Brainy',  
    signature: 'Taped Glasses',  
    meter: ['smart', 'quirky']  
  },  
  '🥱': {  
    mood: 'Bored',  
    vibe: 'Uninterested',  
    signature: 'Yawn Effect',  
    meter: ['tired', 'unimpressed']  
  },  
  '😒': {  
    mood: 'Unamused',  
    vibe: 'Dry Humor',  
    signature: 'Flat Expression',  
    meter: ['annoyed', 'neutral']  
  },  
  '🤥': {  
    mood: 'Deceitful',  
    vibe: 'Pinocchio Vibe',  
    signature: 'Growing Nose',  
    meter: ['sly', 'playful']  
  },  
  '🫢': {  
    mood: 'Shocked',  
    vibe: 'Gasping',  
    signature: 'Covered Mouth',  
    meter: ['surprised', 'speechless']  
  },  
  '😌': {  
    mood: 'Content',  
    vibe: 'Peaceful',  
    signature: 'Soft Smile',  
    meter: ['calm', 'happy']  
  },  
  '🤭': {  
    mood: 'Flustered',  
    vibe: 'Blushing',  
    signature: 'Hand Over Mouth',  
    meter: ['shy', 'embarrassed']  
  },  
  '😑': {  
    mood: 'Expressionless',  
    vibe: 'Blank Stare',  
    signature: 'Deadpan',  
    meter: ['neutral', 'unimpressed']  
  },  
  '🤤': {  
    mood: 'Desiring',  
    vibe: 'Drooling',  
    signature: 'Hungry Eyes',  
    meter: ['excited', 'playful']  
  },  
  '😠': {  
    mood: 'Angry',  
    vibe: 'Steaming Mad',  
    signature: 'Furrowed Brow',  
    meter: ['frustrated', 'intense']  
  },  
  '🤗': {  
    mood: 'Warm',  
    vibe: 'Huggable',  
    signature: 'Open Arms',  
    meter: ['happy', 'loving']  
  },  
  '🫤': {  
    mood: 'Unsure',  
    vibe: 'Hesitant',  
    signature: 'Sideways Mouth',  
    meter: ['confused', 'neutral']  
  },
  '🫥': {  
    mood: 'Blank',  
    vibe: 'Emotionless',  
    signature: 'Dotted Line Face',  
    meter: ['neutral', 'detached']  
  },  
  '🫨': {  
    mood: 'Shaken',  
    vibe: 'Vibrating Shock',  
    signature: 'Rippling Effect',  
    meter: ['surprised', 'anxious']  
  },  
  '🥸': {  
    mood: 'Disguised',  
    vibe: 'Incognito',  
    signature: 'Fake Mustache',  
    meter: ['sly', 'playful']  
  },  
  '😙': {  
    mood: 'Whimsical',  
    vibe: 'Cheeky',  
    signature: 'Playful Wink',  
    meter: ['flirty', 'happy']  
  },  
  '👺': {  
    mood: 'Mischievous',  
    vibe: 'Trickster',  
    signature: 'Oni Mask',  
    meter: ['sly', 'aggressive']  
  },  
  '😶‍🌫️': {  
    mood: 'Lost in Thought',  
    vibe: 'Clouded Mind',  
    signature: 'Foggy Head',  
    meter: ['confused', 'introspective']  
  },
  '🤙': {  
    mood: 'Chill',  
    vibe: 'Hang Loose',  
    signature: 'Surfer Sign',  
    meter: ['calm', 'friendly']  
  },  
  '😵‍💫': {  
    mood: 'Disoriented',  
    vibe: 'Hypnotized',  
    signature: 'Spiral Eyes',  
    meter: ['dizzy', 'confused']  
  },  
  '🙃': {  
    mood: 'Silly',  
    vibe: 'Topsy-Turvy',  
    signature: 'Upside-Down',  
    meter: ['playful', 'confusing']  
  },  
  '👻': {  
    mood: 'Playful',  
    vibe: 'Spectral',  
    signature: 'Boo Effect',  
    meter: ['fun', 'mysterious']  
  },  
  '💀': {  
    mood: 'Edgy',  
    vibe: 'Dark Humor',  
    signature: 'Skull Grin',  
    meter: ['intense', 'humorous']  
  },  
  '🫶': {  
    mood: 'Affectionate',  
    vibe: 'Warm Embrace',  
    signature: 'Heart Hands',  
    meter: ['loving', 'supportive']  
  },  
  '🤌': {  
    mood: 'Expressive',  
    vibe: 'Italian Gesture',  
    signature: 'Pinched Fingers',  
    meter: ['passionate', 'animated']  
  },
  '🫦': {  
    mood: 'Nervous',  
    vibe: 'Biting Lip',  
    signature: 'Anxious Bite',  
    meter: ['tense', 'flustered']  
  },
  '🫳': {
    mood: 'Open',
    vibe: 'Releasing',
    signature: 'Palm Down',
    meter: ['calm', 'letting go']
  },
  '🫴': {
    mood: 'Receiving',
    vibe: 'Accepting',
    signature: 'Palm Up',
    meter: ['welcoming', 'patient']
  },
  '🫰': {
    mood: 'Clever',
    vibe: 'Snappy',
    signature: 'Finger Snap',
    meter: ['quick', 'stylish']
  },
  '🫵': {
    mood: 'Accusatory',
    vibe: 'Direct',
    signature: 'Pointing At You',
    meter: ['confrontational', 'bold']
  },
  '🫲': {
    mood: 'Dismissive',
    vibe: 'Brushing Off',
    signature: 'Backhand',
    meter: ['uninterested', 'cool']
  },
  '🫱': {
    mood: 'Offering',
    vibe: 'Presenting',
    signature: 'Front Hand',
    meter: ['giving', 'helpful']
  }
};


const defaultTraits = () => {
  const moods = ['Chill', 'Happy', 'Curious', 'Bored', 'Goofy'];
  const vibes = ['Mysterious', 'Unknown Signal', 'Hidden Gem'];
  const tags = ['Wildcard', 'Undefined Spark', 'Ghost Pixel'];
  const meterTypes = ['happy', 'calm', 'expressionless', 'sad', 'energetic'];

  return {
    mood: moods[Math.floor(Math.random() * moods.length)],
    vibe: vibes[Math.floor(Math.random() * vibes.length)],
    signature: tags[Math.floor(Math.random() * tags.length)],
    meter: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
      meterTypes[Math.floor(Math.random() * meterTypes.length)]
    )
  };
};

const rejectedEmojis = [
  {
    emoji: "🍕🧢",
    reason: "Too much drip for Unicode standards.",
  },
  {
    emoji: "🪞🐍",
    reason: "Turned 3 devs into stone during testing. Medusa incident.",
  },
  {
    emoji: "🐔💼",
    reason: "Chicken CEO had conflict of interest with 🐣 Startups.",
  },
  {
    emoji: "🧃🛸",
    reason: "Violated the Beverage-Airspace Act of 2021.",
  },
  {
    emoji: "📞💀",
    reason: "Caused mass ghosting. Literally.",
  }
];

const UnicodeLab = () => {
  const [inputEmoji, setInputEmoji] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [traits, setTraits] = useState(null);

  const [open, setOpen] = useState(false);

  const handleScan = (e) => {
    e.preventDefault();
    if (!inputEmoji.trim()) return;
    setIsScanning(true);
    setScanned(false);

    setTimeout(() => {
      setIsScanning(false);
      const traits = emojiTraitsMap[inputEmoji] || defaultTraits();
      setTraits(traits);
      setScanned(true);
    }, 2000); // simulate scan
  };

  const handleReanalyze = (emoji) => {
    setInputEmoji(emoji);
    handleScan({ preventDefault: () => {} });
  };  

  return (
    <section className="unicode-lab">
      <header className="unicode-lab-header">
        <h1>🔬 Welcome to Unicode Lab</h1>
        <p>
          Explore. Experiment. Imagine the future of emojis — you’re the lead researcher here (But Still Under Development!) 🧪
        </p>
      </header>

      <div className="emoji-scanner-container">
        <h2>Emoji Scanner 🎞️</h2>
        <span className="scanner-id">Scan ID: #{Math.floor(Math.random() * 9000 + 1000)}</span>
        <form className="emoji-scanner-form" onSubmit={handleScan}>
          <input
            type="text"
            maxLength={2}
            placeholder="Paste an emoji"
            value={inputEmoji}
            onChange={(e) => setInputEmoji(e.target.value)}
          />
          <button>Scan</button>
        </form>

        <div className="emoji-scanner-window">
          {isScanning && (
            <div className="emoji-scanner-beam">
              <div className="emoji-scanner-slide">{inputEmoji}</div>
              <div className="scanner-laser-line" />
              <div className="side-tube left" />
            <div className="side-tube right" />
            </div>
          )}

          {scanned && traits && (
            <div className="scan-result">
              <div className="scan-result-profile">
                <div className="scan-result-big">{inputEmoji}</div>
                <p className="scan-result-tagline">Scan complete.</p>
                <p>-----</p>
                <p className="scan-result-tag">Mood: {traits.mood}</p>
                <p className="scan-result-tag">Vibe: {traits.vibe}</p>
                <p className="scan-result-tag">Signature: {traits.signature}</p>
                <div className="result-mood-meter">
                  {traits.meter.map((type, idx) => (
                    <div key={idx} className={`bar ${type}`} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rejected-drawer">
        <h2>🗃️ Rejected Drawer</h2>
        <p>Peek into the emoji experiments that didn’t make it.</p>

        <button className="drawer-toggle" onClick={() => setOpen(!open)}>
          {open ? "Close Drawer" : "Open Drawer"}
        </button>

        {open && (
          <div className="rejected-grid">
            {rejectedEmojis.map((item, index) => (
              <div key={index} className="rejected-card">
                <div className="rejected-emoji">{item.emoji}</div>
                <p className="rejection-reason">{item.reason}</p>
                <button className="reanalyze-btn" onClick={() => handleReanalyze(item.emoji)}>🧪 Re-analyze</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="lab-fusion-soon-container">
        <h1 className="lab-glitch-text">☢️ FUSION CHAMBER</h1>
        <div className="lab-hazard-zone">
          <p className="lab-hazard-warning">⚠️ CAUTION: UNDER CONSTRUCTION ⚠️</p>
          <div className="lab-warning-strip">
            <div className="lab-tape">☣️☢️ DANGER ZONE ☢️☣️</div>
            <div className="lab tape flip">☣️☢️ DANGER ZONE ☢️☣️</div>
          </div>
          <div className="lab-coming-soon-text">
            <p>I am still decoding emoji DNA strands…</p>
            <p className="lab-glow">Stand back! And Wait for the Blast 💥</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnicodeLab;