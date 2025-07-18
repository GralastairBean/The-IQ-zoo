// Animal data from our database
const animals = [
    { id: 1, name: "Bottlenose Dolphin", IQscore: 1200 },
    { id: 2, name: "Chimpanzee", IQscore: 1200 },
    { id: 3, name: "African Elephant", IQscore: 1200 },
    { id: 4, name: "Common Raven", IQscore: 1200 },
    { id: 5, name: "Giant Pacific Octopus", IQscore: 1200 },
    { id: 6, name: "Orangutan", IQscore: 1200 },
    { id: 7, name: "Gorilla", IQscore: 1200 },
    { id: 8, name: "Border Collie", IQscore: 1200 },
    { id: 9, name: "Pig", IQscore: 1200 },
    { id: 10, name: "Raccoon", IQscore: 1200 }
];

let currentAnimals = [];
let canVote = true;

// Elo rating system constants
const K_FACTOR = 32;

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    console.log('The IQ Zoo ranking system is loaded! 🐾');
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
    
    // Display results
    showResults(winnerIndex, winnerChange, loserChange);
    
    // Update ranking table immediately
    updateRankingTable();
    
    // Start new round after 3 seconds
    setTimeout(selectNewAnimals, 3000);
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