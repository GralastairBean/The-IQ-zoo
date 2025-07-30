from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

# Database file path
DB_FILE = 'animals.json'

def load_animals():
    """Load animals from JSON file"""
    if os.path.exists(DB_FILE):
        with open(DB_FILE, 'r') as f:
            return json.load(f)
    else:
        # Initialize with default animals if file doesn't exist
        default_animals = [
            {"id": 1, "name": "Bottlenose Dolphin", "IQscore": 1200},
            {"id": 2, "name": "Chimpanzee", "IQscore": 1200},
            {"id": 3, "name": "African Elephant", "IQscore": 1200},
            {"id": 4, "name": "Common Raven", "IQscore": 1200},
            {"id": 5, "name": "Seagull", "IQscore": 1200},
            {"id": 6, "name": "Orangutan", "IQscore": 1200},
            {"id": 7, "name": "Gorilla", "IQscore": 1200},
            {"id": 8, "name": "Border Collie", "IQscore": 1200},
            {"id": 9, "name": "Pig", "IQscore": 1200},
            {"id": 10, "name": "Raccoon", "IQscore": 1200},
            {"id": 11, "name": "Orca", "IQscore": 1200},
            {"id": 12, "name": "Bonobo", "IQscore": 1200},
            {"id": 13, "name": "Asian Elephant", "IQscore": 1200},
            {"id": 14, "name": "Magpie", "IQscore": 1200},
            {"id": 15, "name": "Octopus", "IQscore": 1200},
            {"id": 16, "name": "Baboon", "IQscore": 1200},
            {"id": 17, "name": "Macaque", "IQscore": 1200},
            {"id": 18, "name": "German Shepherd", "IQscore": 1200},
            {"id": 19, "name": "Horse", "IQscore": 1200},
            {"id": 20, "name": "Crow", "IQscore": 1200},
            {"id": 21, "name": "Parrot", "IQscore": 1200},
            {"id": 22, "name": "Squirrel", "IQscore": 1200},
            {"id": 23, "name": "Rat", "IQscore": 1200},
            {"id": 24, "name": "Mouse", "IQscore": 1200},
            {"id": 25, "name": "Cat", "IQscore": 1200},
            {"id": 26, "name": "Fox", "IQscore": 1200},
            {"id": 27, "name": "Wolf", "IQscore": 1200},
            {"id": 28, "name": "Bear", "IQscore": 1200},
            {"id": 29, "name": "Lion", "IQscore": 1200},
            {"id": 30, "name": "Tiger", "IQscore": 1200},
            {"id": 31, "name": "Shark", "IQscore": 1200},
            {"id": 32, "name": "Turtle", "IQscore": 1200},
            {"id": 33, "name": "Snake", "IQscore": 1200},
            {"id": 34, "name": "Frog", "IQscore": 1200},
            {"id": 35, "name": "Fish", "IQscore": 1200},
            {"id": 36, "name": "Ant", "IQscore": 1200},
            {"id": 37, "name": "Bee", "IQscore": 1200},
            {"id": 38, "name": "Spider", "IQscore": 1200},
            {"id": 39, "name": "Worm", "IQscore": 1200},
            {"id": 40, "name": "Jellyfish", "IQscore": 1200},
            {"id": 41, "name": "Sea Sponge", "IQscore": 1200},
            {"id": 42, "name": "Sea Urchin", "IQscore": 1200},
            {"id": 43, "name": "Starfish", "IQscore": 1200},
            {"id": 44, "name": "Clam", "IQscore": 1200},
            {"id": 45, "name": "Barnacle", "IQscore": 1200},
            {"id": 46, "name": "Amoeba", "IQscore": 1200},
            {"id": 47, "name": "Bacteria", "IQscore": 1200},
            {"id": 48, "name": "Slime Mold", "IQscore": 1200},
            {"id": 49, "name": "Dugong", "IQscore": 1200},
            {"id": 50, "name": "Whale Shark", "IQscore": 1200}
        ]
        save_animals(default_animals)
        return default_animals

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

if __name__ == '__main__':
    print("🐾 The IQ Zoo Backend Starting...")
    print("📊 Loading animals from database...")
    
    # Initialize database if needed
    animals = load_animals()
    print(f"✅ Loaded {len(animals)} animals")
    
    print("🚀 Starting Flask server on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True) 