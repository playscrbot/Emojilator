import AOS from 'aos';
import React, { useRef, useEffect } from 'react';
import Timeline from './Timeline';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { emojiConfetti } from './EmojiConfetti.jsx';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const events = [
    { id: 1, year: 1999, description: 'First emojis introduced', emojis: ['😀', '😎', '🙌'] },
    { id: 2, year: 2007, description: 'Emoji support on the iPhone', emojis: ['📱', '👏', '🎉'] },
    { id: 3, year: 2010, description: 'Unicode Standard includes emojis', emojis: ['🔤', '🆕', '🔣'] },
    { id: 4, year: 2011, description: 'Emoji on Android devices', emojis: ['🤖', '📱', '👾'] },
    { id: 5, year: 2015, description: 'Emoji diversity introduced', emojis: ['🌍', '👩‍🦱', '👨‍🦳'] },
    { id: 6, year: 2020, description: 'New emojis added to Unicode 13.0', emojis: ['🆕', '📅', '🎉'] },
    { id: 7, year: 2022, description: 'Meta introduces new emojis for Facebook', emojis: ['👍', '❤️', '😆'] },
    { id: 8, year: 2023, description: 'Emoji 14.0 Release', emojis: ['🆕', '📆', '🌟'] },
    { id: 9, year: 2025, description: 'Global Emoji Day established to celebrate the impact of emojis on communication.', emojis: ['🌎', '📅', '🎉'] },
    { id: 10, year: 2030, description: 'User-Generated Emojis become mainstream, allowing people to have more freedom in their conversations.', emojis: ['🎨', '🧑‍💻', '😊'] },
    // Add more events
  ];

  // 💡 Reusable fade-in animation
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  };

  const FactCard = ({ title, fact, detail, index }) => (
    <motion.div
      className="fact-card"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      <h2>{title}</h2>
      <p>{fact}</p>
      <p>{detail}</p>
    </motion.div>
  );

  const StatCard = ({ title, icon, chart }) => (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-icon">{icon}</span>
        <h3 className="stat-card-title">{title}</h3>
      </div>
      <div className="stat-card-body">{chart}</div>
    </div>
  );

  const historyRef = useRef(null);
  const confettiFired = useRef(false);

  const platformData = {
    labels: ['iOS', 'Android'],
    datasets: [{
      label: 'Emoji Usage (Billions)',
      data: [65, 85],
      backgroundColor: ['#f0c420', '#3ddc84']
    }]
  };

  const countryData = {
    labels: ['USA', 'India', 'Japan', 'Brazil', 'Germany'],
    datasets: [{
      label: 'Emoji Usage',
      data: [120, 150, 90, 80, 60],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff']
    }]
  };

  const ageGroupData = {
    labels: ['<18', '18-24', '25-34', '35-44', '45+'],
    datasets: [{
      label: 'Avg Emojis/Day',
      data: [50, 85, 60, 40, 20],
      backgroundColor: '#ff9f40'
    }]
  };

  const topEmojisData = {
    labels: ['😂', '❤️', '😍', '🔥', '😊', '🙏', '🥰', '🤣', '✨', '👍'],
    datasets: [{
      label: 'Usage (Millions)',
      data: [960, 850, 700, 680, 640, 620, 610, 600, 580, 570],
      backgroundColor: '#36a2eb'
    }]
  };

  const fastestGrowingEmoji = {
    labels: ['2022', '2023', '2024', '2025'],
    datasets: [{
      label: '🧠 Emoji Usage',
      data: [10, 30, 65, 130],
      fill: false,
      borderColor: '#9966ff',
      backgroundColor: '#9966ff',
      tension: 0.3
    }]
  };

  const steps = [
    {
      icon: '💡',
      title: 'Idea Spark',
      description: 'Anyone can think of a new emoji – the journey starts with a creative concept.'
    },
    {
      icon: '📄',
      title: 'Proposal Submitted',
      description: 'You submit a formal proposal to the Unicode Consortium.'
    },
    {
      icon: '👥',
      title: 'Review & Voting',
      description: 'The Emoji Subcommittee reviews your idea and votes on its viability.'
    },
    {
      icon: '✅',
      title: 'Approved',
      description: 'Once approved, it becomes part of the official Unicode Standard.'
    },
    {
      icon: '🧪',
      title: 'Added to Unicode',
      description: 'Technical implementation starts – platforms prepare to support the emoji.'
    },
    {
      icon: '📱',
      title: 'Released to Devices',
      description: 'Emoji rolls out via OS updates and becomes part of your keyboard!'
    },
  ];

  const emojiExamples = [
    {
      emoji: "🙏",
      cultureA: "Japan",
      meaningA: "Thank you",
      cultureB: "India",
      meaningB: "Namaste",
    },
    {
      emoji: "🐍",
      cultureA: "USA",
      meaningA: "Sneaky or evil (slang)",
      cultureB: "Ancient Egypt",
      meaningB: "Divine symbol (Uraeus cobra)",
    },
    {
      emoji: "🦋",
      cultureA: "Denmark",
      meaningA: "A Cute, Little Butterfly",
      cultureB: "Mexico",
      meaningB: "Returning souls during Día de Muertos",
    },
    {
      emoji: "🎭",
      cultureA: "Italy",
      meaningA: "Drama / theater masks",
      cultureB: "Nigeria",
      meaningB: "Ancestral spirits in masquerade rituals",
    },
    {
      emoji: "🐉",
      cultureA: "Europe",
      meaningA: "Dragon / Fire-monster",
      cultureB: "China",
      meaningB: "Symbol of power, luck, and imperial strength",
    },
    {
      emoji: "🌸",
      cultureA: "USA",
      meaningA: "Springtime or beauty",
      cultureB: "Japan",
      meaningB: "Sakura — cultural symbol of life and renewal",
    },
    {
      emoji: "🕷️",
      cultureA: "UK",
      meaningA: "Creepy bug or Halloween icon",
      cultureB: "Africa (Ghana)",
      meaningB: "Anansi — a trickster god of the folklore stories",
    },
    {
      emoji: "🧿",
      cultureA: "Western countries",
      meaningA: "Cool aesthetic / decorative",
      cultureB: "Turkey / Middle East",
      meaningB: "Protection from evil eye",
    },
  ];

  const impactPosts = [
    {
      quote: "We demand justice. ✊🏿 #BlackLivesMatter",
      author: "@activistdaily",
      img: "✊🏿",
    },
    {
      quote: "It's okay to be not okay 🧠❤️ #MentalHealthMatters",
      author: "@mindfulvoices",
      img: "🧠",
    },
    {
      quote: "Young people are rising up 🌎🔥 #ClimateStrike",
      author: "@gretafans",
      img: "🌍",
    },
    {
      quote: "Together, we heal. Together, we rise. 🤝 #Unity",
      author: "@humanitarianorg",
      img: "🤝",
    },
  ];

  const TimelineStep = ({ step, index }) => (
    <motion.div
      className="timeline-step"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        type: "spring",
        stiffness: 80,
      }}
      viewport={{ once: true }}
    >
      <div className="emoji-creation-icon">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1
          }}
        >
          {step.icon}
        </motion.div>
      </div>
      <div className="emoji-creation-content">
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
    </motion.div>
  );

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!historyRef.current || confettiFired.current) return;

      const rect = historyRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        emojiConfetti();
        confettiFired.current = true; // Avoid repeat
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Superhero Section */}
      <section>
        {/* Hero content */}
        <div className="superhero-content">
          {/* Section header */}
          <div className="superhero-header">
            <h1 className="superhero-h1" data-aos="fade-up">Express your Emotions with style</h1>
            <p className="superhero-p" data-aos="fade-up" data-aos-delay="200">Whether it is to celebrate parties and special occasions or to create a realtionship with the person you're interested in, We have an All-in-One solution for you.</p>
            <div className="superhero-section">
              <div data-aos="fade-up" data-aos-delay="400">
                <Link to="/emoji" className="superhero-a bg-purple-600 w-full mb-4 sm:w-auto">
                  Start My Story
                </Link>
              </div>
              <div data-aos="fade-up" data-aos-delay="600">
                <Link to="/analyze" className="superhero-b bg-gray-700">
                  Analyze Instead
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20 border-t border-gray-800">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="h2 mb-4">Unlimited Words, One Story</h1>
              <p className="text-xl text-gray-400">You can convert unlimited words to make your perfect story that will perfectly express your emotions.</p>
            </div>
          
            {/* 1st item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up" data-aos-delay="100">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src="banner-card.png" alt="Features 01" loading="lazy" />
              </div>

              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right" data-aos-delay="200">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter">More Results. Less Effort</div>
                  <h3 className="h3-mb-3">Express Anything in your own Style</h3>
                  <p className="text-xl text-gray-400 mb-4">With 1000+ Datasets on your choosen words, You can create your own story that will perfectly express your emotions.</p>
                  <ul className="text-lg text-gray-400 -mb-2">
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>1000+ Words filter</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Instant Voice-Typing</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Easy Share to Social Media</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* History Section */}
      <div ref={historyRef}>
        <h1>History of Emojis</h1>
        <Timeline events={events} />
      </div>
      {/* Psychology Hub Section */}
      <section className="psychology-hub-section" id="emoji-psychology">
        <div className="max-w-6xl mx-auto">
          <div className="text-center" data-aos="fade-up">
            <h2 className="psychology-hub-h2">The Psychology Behind</h2>
            <p className="psychology-hub-p">Why emojis make your words feel more human ✨</p>
          </div>

          <div className="text-center grid md:grid-cols-2 gap-10">
            <div data-aos="fade-right">
              <h3 className="text-2xl font-semibold mb-4">They’re emotional shortcodes</h3>
              <p className="psy-hub-p">
                Emojis work because our brains interpret them like real facial expressions.
              </p>
              <p className="psy-hub-p">
                When we see 😄 or 😢, our mirror neurons light up just like we were seeing a person’s face.
              </p>
              <ul className="psychology-hub-ul text-center">
                <li className="psychology-hub-li">
                  <span className="psychology-hub-span">🧠</span>
                  <span>
                    <strong>Mirror Neuron Trigger:</strong> 
                    <br />
                    Your brain reacts to emojis as if they're real faces - same zones light up!
                  </span>
                </li>
                <li className="psychology-hub-li">
                  <span className="psychology-hub-span">💬</span>
                  <span>
                    <strong>Context Enhancer:</strong> 
                    <br />
                    Adds tone to otherwise plain text.
                  </span>
                </li>
                <li className="psychology-hub-li">
                  <span className="psychology-hub-span">⏱️</span>
                  <span>
                    <strong>Faster Interpretation:</strong>
                    <br />
                    Your eyes can interpret emojis 60,000x faster than reading words.
                  </span>
                </li>
                <li className="psychology-hub-li">
                  <span className="psychology-hub-span">🌐</span>
                  <span>
                    <strong>Universal Understanding:</strong> 
                    <br />
                    Emojis are universal and has a global impact. Works across language barriers.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Emoji Communication Section */}
      <section className="emoji-quiz-row">
        <div className="emoji-test-section" data-aos="zoom-in">
          <h3 className="emoji-test-title">🌀 Quick Test</h3>
          <p className="emoji-test-subtitle">How does this emoji make you feel?</p>
          <div className="emoji-test-buttons">
            {['😂','🥺','🔥','😡','😴'].map((emoji, index) => (
              <button
                key={index}
                className="emoji-button"
                onClick={() => alert(`You feel something about ${emoji} — nice!`)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        <div className="quiz-card" data-aos="fade-up">
          <h3 className="quiz-title">🧪 Emoji Quiz</h3>
          <p className="quiz-description">Are you a Silent Type? or an expert in Communication?</p>
          <Link
            to="/quiz"
            className="quiz-cta"
          >
            Take the Quiz
          </Link>
        </div>
      </section>
      <div className="emoji-grammar-container">
        <motion.h1
          className="emoji-grammar-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          📚 The Impact of Emoji's Tone
        </motion.h1>

        <motion.p
          className="emoji-grammar-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Based on studies in linguistics and user interaction, here's how emoji usage impacts the tone of your words.
        </motion.p>

        <hr />

        <FactCard
          title="🎯 Emoji Placement Affects Tone"
          fact="🔺 70% of readers perceived different emotions based on emoji placement"
          detail="A 2019 study by Adobe showed that placing an emoji before a sentence (e.g., '❤️ I love you') is interpreted as more formal or symbolic, while placing it at the end (e.g., 'I love you ❤️') is perceived as more casual and affectionate."
          index={0}
        />

        <FactCard
          title="📚 Repetition Reinforces Emotion"
          fact="🔁 Repeated emoji = amplified emotion"
          detail="In digital linguistics, repetition (e.g., '😂😂😂') is considered equivalent to exclamatory punctuation. The University of Michigan’s emoji study found users associate more intensity with stacked emojis."
          index={1}
        />

        <FactCard
          title="🧠 Emoji + Words Increase Clarity"
          fact="🧩 Emoji + text improves understanding by 47%"
          detail="A Nielsen Norman Group study in 2020 found that combining emoji with words helps readers interpret intent faster — especially in mobile UX. Example: 'Pizza 🍕 + Netflix 📺 = Relaxation' is processed 1.5x faster than plain text."
          index={2}
        />

        <div className="emoji-grammar-grid">
          <motion.div className="emoji-grammar-stat" variants={fadeIn} initial="hidden" animate="visible" custom={3}>
            <label>Posts with Emoji (Social Media)</label>
            <strong>📈 25% Higher Engagement</strong>
            <span>Based on HubSpot's 2021 report on Instagram and Twitter analytics.</span>
          </motion.div>

          <motion.div className="emoji-grammar-stat" variants={fadeIn} initial="hidden" animate="visible" custom={4}>
            <label>Cross-Cultural Interpretation</label>
            <strong>🌍 37% Misinterpretation Risk</strong>
            <span>
              Based on a 2022 MIT study — e.g., 🙏 means “thank you” in Japan, but “pray” in US.
            </span>
          </motion.div>
        </div>
      </div>
      <section className="emoji-stats-section" id="emoji-stats">
        <h2 className="stat-heading">Emojis in Action 📊</h2>
        <div className="stat-grid">
          <StatCard title="Platform Usage" icon="📱" chart={<Bar data={platformData} />} />
          <StatCard title="Top Countries" icon="🌍" chart={<Pie data={countryData} />} />
          <StatCard title="Age Group Trends" icon="🧒" chart={<Bar data={ageGroupData} />} />
          <StatCard title="Fastest Growing Emoji" icon="🚀" chart={<Line data={fastestGrowingEmoji} />} />
          <StatCard title="Top Emojis" icon="🔥" chart={<Bar data={topEmojisData} />} />
        </div>
      </section>
      <section className="emoji-behind-the-scenes">
        <h2>🧬 Behind the Scenes — How Emojis Are Created</h2>
        <p>
          Ever wondered how 🆕 emojis end up on your phone? It all starts with the
          Unicode Consortium — the organization responsible for standardizing
          emoji across platforms.
        </p>

        <div className="emoji-creation-timeline">
          {steps.map((step, i) => (
            <TimelineStep key={i} step={step} index={i} />
          ))}
        </div>

        <div className="emoji-creation-cta">
          <h3>🚀 Want to create your own emoji?</h3>
          <a
            href="https://unicode.org/emoji/proposals.html"
            className="emoji-creation-cta-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn How to Submit to Unicode
          </a>
        </div>
      </section>
      <section className="emoji-culture-section">
        <h2>Alright! But Do they really mean the same?!</h2>
        <p className="emoji-culture-subtext">
          You see, Emojis aren't always universal. Their meaning can shift wildly depending
          on the culture. Here's how people interpret the same emoji across different
          countries:
        </p>

        <div className="emoji-culture-card-grid">
        {emojiExamples.map((item, index) => (
          <div key={index} className="emoji-culture-card">
            <div className="emoji-culture-icon">{item.emoji}</div>
            <div className="emoji-culture-meaning">
              <div className="emoji-culture-block">
                <h4>{item.cultureA}</h4>
                <p>{item.meaningA}</p>
              </div>
              <div className="emoji-culture-block">
                <h4>{item.cultureB}</h4>
                <p>{item.meaningB}</p>
              </div>
            </div>
          </div>
        ))}
        </div>
      </section>
      <section className="emoji-social-section">
        <h2>❤️ Emoji for Good — The Social Impact</h2>
        <p className="emoji-social-subtext">
          Emojis are more than visuals — they’re a voice for change, advocacy,
          and belonging. Here’s how they’ve helped shape movements around the
          globe:
        </p>

        <div className="emoji-social-impact-grid">
          {impactPosts.map((post, index) => (
            <div key={index} className="emoji-social-impact-card">
              <div className="emoji-social--impact-icon">{post.img}</div>
              <blockquote>“{post.quote}”</blockquote>
              <p className="emoji-social-author">{post.author}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Emoji Museum */}
      <div className="museum-card text-center">
        <div className="museum-card-header">
          Still Not 
          <br />
          Satisfied Yet?
        </div>
        <div className="museum-card-body">
          <p className="museum-card-text">Explore the complexities behind emojis that you use in your everyday life 😎🌊</p>
          <Link to="/museum" className="museum-btn-primary">
            Visit Now
          </Link>
        </div>
      </div>
    </>
  )
}