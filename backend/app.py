from flask import Flask, request, jsonify, send_file
from flask_socketio import SocketIO, emit
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from transformers import pipeline
from flask_cors import CORS

import re
import io
from datetime import datetime, timezone
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*")

# Connect with my PgAdmin4 database that is already created 
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Tyson19goku@localhost:5432/emojilator'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Load the sentiment analysis pipeline (using a lightweight model)
sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased", device=-1)
vader_sentiment_analyzer = SentimentIntensityAnalyzer()

# Emoji sentiment map
emoji_sentiment_map = {
    "😀": {"tone": "Happy", "score": 2},
    "😢": {"tone": "Sad", "score": -2},
    "😂": {"tone": "Humor", "score": 1},
    "😡": {"tone": "Angry", "score": -3},
    "❤️": {"tone": "Love", "score": 3},
    "💔": {"tone": "Heartbroken", "score": -3},
    "👍": {"tone": "Positive", "score": 2},
    "👎": {"tone": "Negative", "score": -2},
    "👋": {"tone": "Waving", "score": 1},
    "💪": {"tone": "Strong", "score": 2},
    "✌️": {"tone": "Peace", "score": 2},
    "🤚": {"tone": "Restrictive", "score": 1},
    "🤙": {"tone": "Wants You To Make A Call", "score": 2},
    "👌": {"tone": "Perfect", "score": 2},
    "✋": {"tone": "Wanna Be Friendly", "score": 2},
    "🤏": {"tone": "Comparing", "score": 1},
    "🖐️": {"tone": "Open Type", "score": 1},
    "🖖": {"tone": "Giving You A Vulcan Salute", "score": 2},
    "🤝": {"tone": "Wanna Handshake", "score": 2},
    "🙌": {"tone": "Celebrating", "score": 3},
    "👏": {"tone": "Clapping", "score": 2},
    "👐": {"tone": "Friendly", "score": 2},
    "🤲": {"tone": "Offering Something", "score": 2},
    "✊": {"tone": "Swearing", "score": 2},
    "🤜": {"tone": "Fist Bumping", "score": 2},
    "🤛": {"tone": "Fist Bumping", "score": 2},
    "🖊️": {"tone": "Writing", "score": 1},
    "🖌️": {"tone": "Painting", "score": 2},
    "👐": {"tone": "Embracing", "score": 2},
    "🖕": {"tone": "Being Offensive", "score": -3},
    "😎": {"tone": "Cool", "score": 1},
    "😱": {"tone": "Fear", "score": -2},
    "🤔": {"tone": "Thinking", "score": 0},
    "🥳": {"tone": "Celebration", "score": 2},
    "😴": {"tone": "Sleepy", "score": -1},
    "🤗": {"tone": "Hug", "score": 2},
    "😜": {"tone": "Playful", "score": 1},
    "😇": {"tone": "Innocent", "score": 2},
    "🤩": {"tone": "Excited", "score": 3},
    "😬": {"tone": "Nervous", "score": -1},
    "😔": {"tone": "Disappointed", "score": -2},
    "🤯": {"tone": "Mind Blown", "score": 2},
    "😏": {"tone": "Smirking", "score": 1},
    "🥺": {"tone": "Pleading", "score": -1},
    "😅": {"tone": "Having A Comedic Sense Of Relief", "score": 1},
    "😒": {"tone": "Unfazed", "score": -1},
    "😓": {"tone": "Anxious", "score": -2},
    "😩": {"tone": "Frustrated", "score": -2},
    "😤": {"tone": "Triumphant", "score": 1},
    "😵": {"tone": "Dizzy", "score": -2},
    "🤒": {"tone": "Sick", "score": -2},
    "🤕": {"tone": "Injured", "score": -2},
    "🤑": {"tone": "Money-Minded", "score": 1},
    "🤠": {"tone": "Determined", "score": 1},
    "🤖": {"tone": "Techy", "score": 1},
    "🤧": {"tone": "Sneezy", "score": -1},
    "😷": {"tone": "Allergic", "score": -1},
    "😬": {"tone": "Awkward", "score": -1},
    "🤤": {"tone": "Drooling", "score": 2},
    "🧐": {"tone": "Curious", "score": 1},
    "🥵": {"tone": "Overwhelmed", "score": -2},
    "🥶": {"tone": "Getting Chills", "score": -2},
    "😺": {"tone": "Happy", "score": 2},
    "😸": {"tone": "Grinning", "score": 2},
    "😻": {"tone": "Admired", "score": 3},
    "😼": {"tone": "Smirking", "score": 1},
    "😽": {"tone": "Lovey-dovey", "score": 2},
    "🙀": {"tone": "Weary", "score": -2},
    "😿": {"tone": "Crying", "score": -2},
    "😾": {"tone": "Pouting", "score": -1},
    "👻": {"tone": "Playful", "score": 0},
    "😼": {"tone": "Sly", "score": 1},
    "💩": {"tone": "Shitty", "score": -2},
    "🏆": {"tone": "Ambitious", "score": 3},
    "💡": {"tone": "Innovative", "score": 2},
    "🧘‍♀️": {"tone": "Calm", "score": 2},
    "🎉": {"tone": "Festive", "score": 3},
    "🌊": {"tone": "Relaxing", "score": 2},
    "🎨": {"tone": "Creative", "score": 2},
    "🌟": {"tone": "Inspiring", "score": 2},
    "🔥": {"tone": "Excited", "score": 3},
    "🔒": {"tone": "Locked", "score": -1},
    "📈": {"tone": "Growth", "score": 2},
    "📉": {"tone": "Decline", "score": -2},
    "👩‍👧": {"tone": "Mother and Daughter", "score": 3},
    "👨‍👧": {"tone": "Father and Daughter", "score": 3},
    "👩‍👦": {"tone": "Mother and Son", "score": 3},
    "👨‍👦": {"tone": "Father and Son", "score": 3},
    "👩‍❤️‍👩‍👧": {"tone": "Couple with Daughter", "score": 3},
    "👨‍❤️‍👨‍👦": {"tone": "Couple with Son", "score": 3},
    "👨‍❤️‍👨‍👧‍👦": {"tone": "Couple with Children", "score": 3},
    "👩‍👧‍👧": {"tone": "Mother with Daughters", "score": 3},
    "👨‍👦‍👦": {"tone": "Father with Sons", "score": 3},
    "👩‍👦‍👦": {"tone": "Mother with Sons", "score": 3},
    "👨‍👧‍👧": {"tone": "Father with Daughters", "score": 3},
    "👩‍👧‍👦": {"tone": "Mother with Children", "score": 3},
    "👨‍👧‍👦": {"tone": "Father with Children", "score": 3},
    "🧑‍🦴": {"tone": "Person With A B*ner", "score": 0},
    "😍💖": {"tone": "Infatuated", "score": 5},
    "🤔💭": {"tone": "Thinking About Something Deeply", "score": 1},
    "🤩🌟": {"tone": "Starstruck", "score": 5},
    "😬😅": {"tone": "Awkwardly Relieved", "score": 1},
    "😡🔥": {"tone": "Furious", "score": -4},
    "😢💔": {"tone": "Heartbroken", "score": -4},
    "😎🌊": {"tone": "Cool And Relaxed", "score": 2},
    "😏😈": {"tone": "A Sly Mischief", "score": 2},
    "😏💋": {"tone": "Flirty", "score": 2},
    "😇💖": {"tone": "In Pure Love", "score": 5},
    "😡💥": {"tone": "Explosively Angry", "score": -5},
    "😴💤": {"tone": "In Deep Sleep", "score": -2},
    "🤗🌈": {"tone": "Embracing The peace", "score": 4},
    "😌🌸": {"tone": "Calm And Happy", "score": 3},
    "😡💢": {"tone": "Angry And Irritated", "score": -4},
    "🤗🌻": {"tone": "Giving You A Warm Hug", "score": 4},
    "🌊🏄‍♂️": {"tone": "On A Surfing Adventure", "score": 4},
    "🍕❤️": {"tone": "Has Love for Pizza", "score": 4},
    "🎨🖌️": {"tone": "Expressing Creativity", "score": 4},
    "🧘‍♀️🌿": {"tone": "So Peaceful", "score": 4},
    "🎶💃": {"tone": "On A Dance Party", "score": 5},
    "🤩🎢": {"tone": "Is Excited For A Ride", "score": 5},
    "🍂🍁": {"tone": "Experiencing Autumn Vibes", "score": 3},
    "🌻☀️": {"tone": "Bright And Happy", "score": 4},
    "🏖️🌅": {"tone": "Relaxing On A Beach", "score": 5},
    "🎉🎊": {"tone": "Celebrating With Friends", "score": 5},
    "🎤🎶": {"tone": "Singing With Joy", "score": 4},
    "🧗‍♀️🏔️": {"tone": "On A Climbing Adventure", "score": 5},
    "🌼🌞": {"tone": "Bright And Cheerful", "score": 4},
    "🦄🌌": {"tone": "Experiencingn A Magical Night", "score": 5},
    "🍕🤤": {"tone": "Craving For More Food", "score": 4},
    "🎶💖": {"tone": "Has Love For Music", "score": 5},
    "👻🍬": {"tone": "Giving You Some Spooky Treats", "score": 3},
    "🍰🎉": {"tone": "On A Sweet Celebration", "score": 4},
    "🎸🎻": {"tone": "Playing Musical Instruments", "score": 3},
    "🌌🛸": {"tone": "Exploring The Beauty Of Space", "score": 5},
    "🍩☕": {"tone": "Having A Sweet Morning", "score": 4},
    "🌊🐠": {"tone": "On A Underwater Adventure", "score": 4},
    "🍇🍷": {"tone": "On A Wine and Dine", "score": 4},
    "🐉🔥": {"tone": "Has A Fiery Spirit", "score": 5},
    "🌈🧗‍♀️": {"tone": "Climbing Towards Happiness", "score": 5},
    "🐾❤️": {"tone": "Is Having Pet Love", "score": 5},
    "🚴‍♂️🌳": {"tone": "On A Nature Ride", "score": 4},
}

# Helper functions
def extract_emojis(text):
    emoji_regex = re.compile("[\U00010000-\U0010FFFF]", flags=re.UNICODE)
    return emoji_regex.findall(text)

def analyze_text_sentiment(text):
    score = vader_sentiment_analyzer.polarity_scores(text)
    if score['compound'] >= 0.05:
        return 'positive'
    elif score['compound'] <= -0.05:
        return 'negative'
    else:
        return 'neutral'

def analyze_emoji_sentiment(emojis):
    emoji_sentiment = {"tones": [], "totalScore": 0}
    for emoji in emojis:
        if emoji in emoji_sentiment_map:
            emoji_sentiment["tones"].append(emoji_sentiment_map[emoji]["tone"])
            emoji_sentiment["totalScore"] += emoji_sentiment_map[emoji]["score"]
    return emoji_sentiment

# Database connection

# Configure maximum file size (16mb) and allowed file extensions
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# Check if file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

@app.route('/upload_profile_picture', methods=['POST'])
def upload_profile_picture():
    if 'profile_picture' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file part'}), 400

    file = request.files['profile_picture']

    if file.filename == '':
        return jsonify({'status': 'error', 'message': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        # Read file as binary data
        file_binary = file.read()

        # Retrieve the user's information
        username = request.form.get('username')
        user = User.query.filter_by(username=username).first()

        if user:
            # Store the binary data in the database
            user.profile_picture = file_binary
            db.session.commit()

            return jsonify({'status': 'success', 'message': 'Profile picture uploaded successfully!'}), 200
        else:
            return jsonify({'status': 'error', 'message': 'User not found'}), 404
    else:
        return jsonify({'status': 'error', 'message': 'Invalid file format'}), 400
    
@app.route('/profile_picture/<username>', methods=['GET'])
def get_profile_picture(username):
    user = User.query.filter_by(username=username).first()

    if user and user.profile_picture:
        # Create a BytesIO stream from the binary data
        image = io.BytesIO(user.profile_picture)
        image.seek(0)  # Ensure we start from the beginning of the binary stream

        # Return the image as a response
        return send_file(image, mimetype='image/jpeg')
    else:
        return jsonify({'status': 'error', 'message': 'No profile picture found'}), 404

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # Password should be hashed for security

    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    profile_picture = db.Column(db.LargeBinary, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    def __repr__(self):
        return f'<User {self.username}>'

# User Registration
@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()

    # Check if user already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return {'message': 'User already exists!'}, 400

    # Create a new user
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password,
        profile_picture=data.get('profile_picture')  # Optional
    )

    db.session.add(new_user)
    db.session.commit()

    return {'message': 'User registered successfully!'}, 201

# User Login
@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()

    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        # User is authenticated
        return {'message': 'Login successful', 'username': user.username}, 200
    else:
        return {'message': 'Invalid credentials'}, 401

# Updating User Profile
@app.route('/update_profile', methods=['POST'])
def update_profile():
    data = request.get_json()

    # Assuming the user is authenticated (you would normally use tokens here)
    user = User.query.filter_by(username=data['username']).first()
    if user:
        user.email = data.get('email', user.email)  # Update email if provided
        user.profile_picture = data.get('profile_picture', user.profile_picture)  # Update profile picture if provided
        db.session.commit()
        return {'message': 'Profile updated successfully!'}, 200
    else:
        return {'message': 'User not found!'}, 404

# Fetching User Profile
@app.route('/profile/<username>', methods=['GET'])
def get_user_profile(username):
    user = User.query.filter_by(username=username).first()
    if user:
        return {
            'username': user.username,
            'email': user.email,
            'profile_picture': user.profile_picture,
            'created_at': user.created_at,
            'updated_at': user.updated_at
        }, 200
    else:
        return {'message': 'User not found!'}, 404

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

    # Analyze text sentiment using VADER
    text_sentiment = analyze_text_sentiment(text)

    # Combine results
    if emoji_sentiment["totalScore"] > 0:
        overall_sentiment = 'positive'
    elif emoji_sentiment["totalScore"] < 0:
        overall_sentiment = 'negative'
    else:
        overall_sentiment = text_sentiment
        
    emit('analysis_result', {
        'bert_sentiment': bert_sentiment,
        'bert_score': bert_score,
        'emoji_count': len(emojis),
        'text_sentiment': text_sentiment,
        'emoji_sentiment': emoji_sentiment,
        'overall_sentiment': overall_sentiment,
        # Send the results back to the client
    })

@socketio.on('disconnect')
def handle_disconnect():
    print(f'User  disconnected: {request.sid}')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=3001, allow_unsafe_werkzeug=True)
    print("Server is running on port 3001")