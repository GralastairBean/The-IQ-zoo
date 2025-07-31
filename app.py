from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)

# Configure CORS for production
CORS(app, origins=[
    "http://localhost:3000",
    "http://localhost:5000", 
    "https://theiqzoo.com",
    "https://www.theiqzoo.com",
    "https://*.vercel.app",
    "https://*.netlify.app"
])

# Database file path
DB_FILE = 'backend/animals.json'

def load_animals():
    """Load animals from JSON file"""
    with open(DB_FILE, 'r') as f:
        return json.load(f)

def save_animals(animals):
    """Save animals to JSON file"""
    with open(DB_FILE, 'w') as f:
        json.dump(animals, f, indent=2)

def calculate_elo_change(player_rating, opponent_rating, is_winner):
    """Calculate Elo rating change"""
    K_FACTOR = 32
    expected_score = 1 / (1 + 10 ** ((opponent_rating - player_rating) / 400))
    actual_score = 1 if is_winner else 0
    return round(K_FACTOR * (actual_score - expected_score))

@app.route('/animals', methods=['GET'])
def get_animals():
    """Get all animals and their current scores"""
    animals = load_animals()
    return jsonify(animals)

@app.route('/vote', methods=['POST'])
def vote():
    """Process a vote and update scores"""
    data = request.get_json()
    
    if not data or 'winner_id' not in data or 'loser_id' not in data:
        return jsonify({'error': 'Missing winner_id or loser_id'}), 400
    
    winner_id = data['winner_id']
    loser_id = data['loser_id']
    
    animals = load_animals()
    
    # Find the animals
    winner = next((animal for animal in animals if animal['id'] == winner_id), None)
    loser = next((animal for animal in animals if animal['id'] == loser_id), None)
    
    if not winner or not loser:
        return jsonify({'error': 'Animal not found'}), 404
    
    # Calculate Elo changes
    winner_change = calculate_elo_change(winner['IQscore'], loser['IQscore'], True)
    loser_change = calculate_elo_change(loser['IQscore'], winner['IQscore'], False)
    
    # Update scores
    winner['IQscore'] += winner_change
    loser['IQscore'] += loser_change
    
    # Save updated data
    save_animals(animals)
    
    # Return updated animals list
    return jsonify({
        'winner_change': winner_change,
        'loser_change': loser_change,
        'animals': animals
    })

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@app.route('/', methods=['GET'])
def root():
    """Root endpoint"""
    return jsonify({
        'message': 'The IQ Zoo Backend API',
        'endpoints': {
            'animals': '/animals',
            'vote': '/vote',
            'health': '/health'
        }
    })

if __name__ == '__main__':
    print("🐾 The IQ Zoo Backend Starting...")
    print("📊 Loading animals from database...")
    
    # Initialize database if needed
    animals = load_animals()
    print(f"✅ Loaded {len(animals)} animals")
    
    # Get port from environment variable (for Render)
    port = int(os.environ.get('PORT', 5000))
    
    print(f"🚀 Starting Flask server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False) 