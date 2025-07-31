// Animal data - will be loaded from Flask backend API
let animals = [];
let currentAnimals = [];
let canVote = true;

// Elo rating system constants
const K_FACTOR = 32;

// Default animal data
const defaultAnimals = [
    { id: 1, name: "Bottlenose Dolphin", IQscore: 1200 },
    { id: 2, name: "Chimpanzee", IQscore: 1200 },
    { id: 3, name: "African Elephant", IQscore: 1200 },
    { id: 4, name: "Common Raven", IQscore: 1200 },
    { id: 5, name: "Seagull", IQscore: 1200 },
    { id: 6, name: "Orangutan", IQscore: 1200 },
    { id: 7, name: "Gorilla", IQscore: 1200 },
    { id: 8, name: "Border Collie", IQscore: 1200 },
    { id: 9, name: "Pig", IQscore: 1200 },
    { id: 10, name: "Raccoon", IQscore: 1200 },
    { id: 11, name: "Orca", IQscore: 1200 },
    { id: 12, name: "Bonobo", IQscore: 1200 },
    { id: 13, name: "Asian Elephant", IQscore: 1200 },
    { id: 14, name: "Magpie", IQscore: 1200 },
    { id: 15, name: "Octopus", IQscore: 1200 },
    { id: 16, name: "Baboon", IQscore: 1200 },
    { id: 17, name: "Macaque", IQscore: 1200 },
    { id: 18, name: "German Shepherd", IQscore: 1200 },
    { id: 19, name: "Horse", IQscore: 1200 },
    { id: 20, name: "Crow", IQscore: 1200 },
    { id: 21, name: "Parrot", IQscore: 1200 },
    { id: 22, name: "Squirrel", IQscore: 1200 },
    { id: 23, name: "Rat", IQscore: 1200 },
    { id: 24, name: "Mouse", IQscore: 1200 },
    { id: 25, name: "Cat", IQscore: 1200 },
    { id: 26, name: "Fox", IQscore: 1200 },
    { id: 27, name: "Wolf", IQscore: 1200 },
    { id: 28, name: "Bear", IQscore: 1200 },
    { id: 29, name: "Lion", IQscore: 1200 },
    { id: 30, name: "Tiger", IQscore: 1200 },
    { id: 31, name: "Shark", IQscore: 1200 },
    { id: 32, name: "Turtle", IQscore: 1200 },
    { id: 33, name: "Snake", IQscore: 1200 },
    { id: 34, name: "Frog", IQscore: 1200 },
    { id: 35, name: "Fish", IQscore: 1200 },
    { id: 36, name: "Ant", IQscore: 1200 },
    { id: 37, name: "Bee", IQscore: 1200 },
    { id: 38, name: "Spider", IQscore: 1200 },
    { id: 39, name: "Worm", IQscore: 1200 },
    { id: 40, name: "Jellyfish", IQscore: 1200 },
    { id: 41, name: "Sea Sponge", IQscore: 1200 },
    { id: 42, name: "Sea Urchin", IQscore: 1200 },
    { id: 43, name: "Starfish", IQscore: 1200 },
    { id: 44, name: "Clam", IQscore: 1200 },
    { id: 45, name: "Barnacle", IQscore: 1200 },
    { id: 46, name: "Amoeba", IQscore: 1200 },
    { id: 47, name: "Bacteria", IQscore: 1200 },
    { id: 48, name: "Slime Mold", IQscore: 1200 },
    { id: 49, name: "Dugong", IQscore: 1200 },
    { id: 50, name: "Whale Shark", IQscore: 1200 }
];

// API base URL
const API_BASE_URL = 'http://localhost:5000';

// Load animals data from Flask backend
async function loadAnimalsData() {
    try {
        console.log('🔍 Attempting to connect to:', `${API_BASE_URL}/animals`);
        const response = await fetch(`${API_BASE_URL}/animals`);
        console.log('📡 Response status:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        animals = await response.json();
        console.log('✅ Loaded animals from Flask backend');
        console.log(`📊 Loaded ${animals.length} animals`);
    } catch (error) {
        console.error('❌ Error loading animals from backend:', error);
        console.error('❌ Error type:', error.constructor.name);
        console.error('❌ Error message:', error.message);
        throw error; // Re-throw the error instead of falling back
    }
}

// Save animals data to Flask backend (not needed anymore, handled by backend)
function saveAnimalsData() {
    // This function is no longer needed as the backend handles saving
    console.log('💾 Data saving is now handled by the Flask backend');
}

// Initialize the game
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🐾 The IQ Zoo ranking system is loading...');
    try {
        await loadAnimalsData();
        updateRankingTable();
        selectNewAnimals();
        console.log('✅ The IQ Zoo is ready!');
    } catch (error) {
        console.error('❌ Failed to initialize The IQ Zoo:', error);
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; color: #ecf0f1;">
                <h1>🐾 The IQ Zoo</h1>
                <h2>❌ Connection Error</h2>
                <p>Unable to connect to the server.</p>
                <p>Please make sure the Flask backend is running on ${API_BASE_URL}</p>
                <p>Error: ${error.message}</p>
            </div>
        `;
    }
});

// Update the ranking table
function updateRankingTable() {
    const rankingTable = document.getElementById('rankingTable');
    const sortedAnimals = [...animals].sort((a, b) => b.IQscore - a.IQscore);
    
    rankingTable.innerHTML = '';
    
    sortedAnimals.forEach((animal, index) => {
        const rank = index + 1;
        const isCurrent = currentAnimals.some(current => current.id === animal.id);
        
        const rankClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
        const rowClass = isCurrent ? 'ranking-row current' : 'ranking-row';
        
        const row = document.createElement('div');
        row.className = rowClass;
        row.innerHTML = `
            <div class="rank-number ${rankClass}">${rank}</div>
            <div class="animal-name-rank">${animal.name}</div>
            <div class="animal-score-rank">${animal.IQscore}</div>
        `;
        
        rankingTable.appendChild(row);
    });
}

// Select two random animals for comparison
function selectNewAnimals() {
    const shuffled = [...animals].sort(() => 0.5 - Math.random());
    currentAnimals = shuffled.slice(0, 2);
    
    // Update the display
    document.getElementById('name1').textContent = currentAnimals[0].name;
    document.getElementById('name2').textContent = currentAnimals[1].name;
    
    // Reset score displays
    document.getElementById('score1').innerHTML = '';
    document.getElementById('score2').innerHTML = '';
    document.getElementById('score1').classList.remove('show');
    document.getElementById('score2').classList.remove('show');
    
    // Enable voting
    canVote = true;
    
    // Update ranking table to highlight current animals
    updateRankingTable();
    
    console.log(`🆚 New matchup: ${currentAnimals[0].name} vs ${currentAnimals[1].name}`);
}

// Handle voting with API call
async function vote(winnerIndex) {
    if (!canVote) return;
    
    canVote = false;
    
    const winner = currentAnimals[winnerIndex - 1];
    const loser = currentAnimals[2 - winnerIndex];
    
    try {
        // Send vote to Flask backend
        console.log('📤 Sending vote to server...');
        const response = await fetch(`${API_BASE_URL}/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                winner_id: winner.id,
                loser_id: loser.id
            })
        });
        
        console.log('📥 Response received:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ Vote result:', result);
        
        // Update local animals array with server response
        animals = result.animals;
        
        // Display results
        showResults(winnerIndex, result.winner_change, result.loser_change);
        
        // Update ranking table immediately
        updateRankingTable();
        
        console.log(`✅ Vote recorded on server! Winner: +${result.winner_change}, Loser: ${result.loser_change}`);
        
    } catch (error) {
        console.error('❌ Error sending vote to server:', error);
        console.error('❌ Error details:', error.message);
        alert('Error recording vote. Please try again.');
        canVote = true; // Re-enable voting on error
        return;
    }
    
    // Start new round after 3 seconds
    setTimeout(selectNewAnimals, 1500);
}

// Calculate Elo rating change (now handled by backend)
function calculateEloChange(playerRating, opponentRating, isWinner) {
    const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
    const actualScore = isWinner ? 1 : 0;
    return Math.round(K_FACTOR * (actualScore - expectedScore));
}

// Update animal score in the main array (no longer needed)
function updateAnimalScore(animalId, newScore) {
    const animal = animals.find(a => a.id === animalId);
    if (animal) {
        animal.IQscore = newScore;
    }
}

// Display voting results
function showResults(winnerIndex, winnerChange, loserChange) {
    const score1Element = document.getElementById('score1');
    const score2Element = document.getElementById('score2');
    const card1 = document.getElementById('animal1');
    const card2 = document.getElementById('animal2');

    // Determine which animal is which
    const animal1 = currentAnimals[0];
    const animal2 = currentAnimals[1];

    // Show score balloon for animal 1
    const animal1Change = (winnerIndex === 1) ? winnerChange : loserChange;
    showScoreBalloon(card1, animal1Change);
    // Show score balloon for animal 2
    const animal2Change = (winnerIndex === 2) ? winnerChange : loserChange;
    showScoreBalloon(card2, animal2Change);

    // Get rank information for both animals
    const animal1Rank = getCurrentRank(animal1.id);
    const animal2Rank = getCurrentRank(animal2.id);
    const totalAnimals = animals.length;

    // Show animal 1's rank below
    score1Element.innerHTML = `
        <div>Ranked #${animal1Rank}/${totalAnimals}</div>
    `;
    score1Element.classList.add('show');

    // Show animal 2's rank below
    score2Element.innerHTML = `
        <div>Ranked #${animal2Rank}/${totalAnimals}</div>
    `;
    score2Element.classList.add('show');

    console.log(`Vote recorded! Winner: +${winnerChange}, Loser: ${loserChange}`);
}

// Get current rank for an animal
function getCurrentRank(animalId) {
    const sortedAnimals = [...animals].sort((a, b) => b.IQscore - a.IQscore);
    return sortedAnimals.findIndex(animal => animal.id === animalId) + 1;
}

function showScoreBalloon(cardElem, change) {
    // Remove any existing balloon
    let balloon = cardElem.querySelector('.score-balloon');
    if (balloon) {
        balloon.remove();
    }
    // Create new balloon
    balloon = document.createElement('div');
    balloon.className = 'score-balloon ' + (change >= 0 ? 'positive' : 'negative');
    balloon.textContent = (change >= 0 ? '+' : '') + change;
    cardElem.appendChild(balloon);
    // Trigger pop animation
    setTimeout(() => {
        balloon.classList.add('pop');
    }, 10);
    // Remove after animation
    setTimeout(() => {
        balloon.remove();
    }, 1000);
}

// Log current rankings (for debugging)
function logRankings() {
    const sorted = [...animals].sort((a, b) => b.IQscore - a.IQscore);
    console.log('Current Rankings:');
    sorted.forEach((animal, index) => {
        console.log(`${index + 1}. ${animal.name}: ${animal.IQscore}`);
    });
}

// Log rankings every 10 votes
let voteCount = 0;
function incrementVoteCount() {
    voteCount++;
    if (voteCount % 10 === 0) {
        logRankings();
    }
}

// FAQ Modal Functions
function openFAQ() {
    const modal = document.getElementById('faqModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeFAQ() {
    const modal = document.getElementById('faqModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('faqModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeFAQ();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeFAQ();
        }
    });
}); 