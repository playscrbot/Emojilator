from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from transformers import pipeline
from flask_cors import CORS

import re

app = Flask(__name__)
CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*")

# Load the sentiment analysis pipeline (using a lightweight model)
sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased", device=-1)

# Emoji sentiment map
emoji_sentiment_map = {
    "😀": {"tone": "Happy", "score": 2},
    "😢": {"tone": "Sad", "score": -2},
    "😂": {"tone": "Humor", "score": 1},
    "😡": {"tone": "Angry", "score": -3},
    "❤️": {"tone": "Love", "score": 3},
    "👍": {"tone": "Positive", "score": 2},
    "👎": {"tone": "Negative", "score": -2},
}

# Helper functions
def extract_emojis(text):
    emoji_regex = re.compile("[\U00010000-\U0010FFFF]", flags=re.UNICODE)
    return emoji_regex.findall(text)

def analyze_emoji_sentiment(emojis):
    emoji_sentiment = {"tones": [], "totalScore": 0}
    for emoji in emojis:
        if emoji in emoji_sentiment_map:
            emoji_sentiment["tones"].append(emoji_sentiment_map[emoji]["tone"])
            emoji_sentiment["totalScore"] += emoji_sentiment_map[emoji]["score"]
    return emoji_sentiment

@socketio.on('connect')
def handle_connect():
    print(f'A user connected with id: {request.sid}')

@socketio.on('analyze_text')
def handle_analyze_text(data):
    text = data['text']

    # Sentiment analysis using BERT
    bert_analysis = sentiment_analyzer(text)
    bert_sentiment = bert_analysis[0]["label"]
    bert_score = round(bert_analysis[0]["score"], 2)

    # Extract emojis and analyze emoji sentiment
    emojis = extract_emojis(text)
    emoji_sentiment = analyze_emoji_sentiment(emojis)

    # Send the results back to the client
    emit('analysis_result', {
        'bert_sentiment': bert_sentiment,
        'bert_score': bert_score,
        'emoji_count': len(emojis),
        'emoji_sentiment': emoji_sentiment,
    })

@socketio.on('disconnect')
def handle_disconnect():
    print(f'User  disconnected: {request.sid}')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=3001, allow_unsafe_werkzeug=True)
    print("Server is running on port 3001")