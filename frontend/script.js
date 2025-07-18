// Animal data - will be loaded from localStorage or default values
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
    { id: 5, name: "Giant Pacific Octopus", IQscore: 1200 },
    { id: 6, name: "Orangutan", IQscore: 1200 },
    { id: 7, name: "Gorilla", IQscore: 1200 },
    { id: 8, name: "Border Collie", IQscore: 1200 },
    { id: 9, name: "Pig", IQscore: 1200 },
    { id: 10, name: "Raccoon", IQscore: 1200 },
    { id: 11, name: "Orca", IQscore: 1200 },
    { id: 12, name: "Bonobo", IQscore: 1200 },
    { id: 13, name: "Asian Elephant", IQscore: 1200 },
    { id: 14, name: "Magpie", IQscore: 1200 },
    { id: 15, name: "Common Octopus", IQscore: 1200 },
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

// Load animals data from localStorage or use defaults
function loadAnimalsData() {
    const savedData = localStorage.getItem('iqZooAnimals');
    if (savedData) {
        try {
            animals = JSON.parse(savedData);
            console.log('Loaded saved animal data from localStorage');
        } catch (error) {
            console.error('Error loading saved data, using defaults:', error);
            animals = [...defaultAnimals];
        }
    } else {
        animals = [...defaultAnimals];
        console.log('No saved data found, using default animal data');
    }
}

// Save animals data to localStorage
function saveAnimalsData() {
    try {
        localStorage.setItem('iqZooAnimals', JSON.stringify(animals));
        console.log('Saved animal data to localStorage');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    console.log('The IQ Zoo ranking system is loaded! 🐾');
    loadAnimalsData();
    updateRankingTable();
    selectNewAnimals();
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
    
    console.log(`New matchup: ${currentAnimals[0].name} vs ${currentAnimals[1].name}`);
}

// Handle voting
function vote(winnerIndex) {
    if (!canVote) return;
    
    canVote = false;
    
    const winner = currentAnimals[winnerIndex - 1];
    const loser = currentAnimals[2 - winnerIndex];
    
    // Calculate Elo rating changes
    const winnerChange = calculateEloChange(winner.IQscore, loser.IQscore, true);
    const loserChange = calculateEloChange(loser.IQscore, winner.IQscore, false);
    
    // Update scores
    winner.IQscore += winnerChange;
    loser.IQscore += loserChange;
    
    // Update the animals array
    updateAnimalScore(winner.id, winner.IQscore);
    updateAnimalScore(loser.id, loser.IQscore);
    
    // Save the updated data
    saveAnimalsData();
    
    // Display results
    showResults(winnerIndex, winnerChange, loserChange);
    
    // Update ranking table immediately
    updateRankingTable();
    
    // Start new round after 3 seconds
    setTimeout(selectNewAnimals, 1500);
}

// Calculate Elo rating change
function calculateEloChange(playerRating, opponentRating, isWinner) {
    const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
    const actualScore = isWinner ? 1 : 0;
    return Math.round(K_FACTOR * (actualScore - expectedScore));
}

// Update animal score in the main array
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
    
    // Determine which animal is which
    const animal1 = currentAnimals[0];
    const animal2 = currentAnimals[1];
    
    // Show animal 1's score
    const animal1Change = (winnerIndex === 1) ? winnerChange : loserChange;
    score1Element.innerHTML = `
        <div>IQ Score: ${animal1.IQscore}</div>
        <div class="score-change ${animal1Change >= 0 ? 'positive' : 'negative'}">
            ${animal1Change >= 0 ? '+' : ''}${animal1Change}
        </div>
    `;
    score1Element.classList.add('show');
    
    // Show animal 2's score
    const animal2Change = (winnerIndex === 2) ? winnerChange : loserChange;
    score2Element.innerHTML = `
        <div>IQ Score: ${animal2.IQscore}</div>
        <div class="score-change ${animal2Change >= 0 ? 'positive' : 'negative'}">
            ${animal2Change >= 0 ? '+' : ''}${animal2Change}
        </div>
    `;
    score2Element.classList.add('show');
    
    console.log(`Vote recorded! Winner: +${winnerChange}, Loser: ${loserChange}`);
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