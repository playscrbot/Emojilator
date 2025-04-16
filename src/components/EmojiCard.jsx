import { useState } from "react";

const EmojiCard = ({ emoji }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`emojipedia-card ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="card-front">
        <div className="emojipedia-icon">{emoji.char}</div>
        <div className="emojipedia-info">
          <h4>{emoji.name}</h4>
          <p>Codepoint: U+{emoji.codePoint}</p>
          <p>Category: {emoji.category}</p>
          <p>Year added: {emoji.year}</p>
          <p className="emojipedia-history">📜 Unicode {emoji.unicodeVersion}</p>
        </div>
      </div>

      <div className="card-back">
        <div className="scroll-content">
          <div className="emojipedia-icon">{emoji.char}</div>
          <div className="emojipedia-info">
            {emoji.keywords && (
              <div className="detail-section">
                <p className="emojipedia-section-title">🔍 Keywords</p>
                <p className="section-keywords">{emoji.keywords.join(", ")}</p>
              </div>
            )}

            {emoji.culturalMeaning && (
              <div className="detail-section">
                <p className="emojipedia-section-title">✨ Cultural Meaning</p>
                {emoji.culturalMeaning.positive && (
                  <p className="section-positive">Positive: {emoji.culturalMeaning.positive.join(", ")}</p>
                )}
                {emoji.culturalMeaning.negative && (
                  <p className="section-negative">Negative: {emoji.culturalMeaning.negative.join(", ")}</p>
                )}
              </div>
            )}

            {emoji.commonUses && (
              <div className="detail-section">
                <p className="emojipedia-section-title">💡 Common Uses</p>
                <ul className="common-uses-list">
                  {emoji.commonUses.map((use, i) => (
                    <li key={i} className="common-use">{use}</li>
                  ))}
                </ul>
              </div>
            )}

            {emoji.similarEmojis && (
              <div className="detail-section">
                <p className="emojipedia-section-title">🔗 Similar Emojis</p>
                <div className="similar-emojis">
                  {emoji.similarEmojis.join(" ")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmojiCard;