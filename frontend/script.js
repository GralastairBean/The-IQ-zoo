// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('The IQ Zoo website is loaded! 🐾');
    
    // Add smooth scrolling to navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add click functionality to the CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('Welcome to The IQ Zoo! 🐾\n\nThis feature will be implemented soon!\nYou\'ll be able to start ranking animals here.');
        });
    }
    
    // Add hover effects to animal cards
    const animalCards = document.querySelectorAll('.animal-card');
    animalCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click functionality to show more info
        card.addEventListener('click', function() {
            const animalName = this.querySelector('h4').textContent;
            const intelligenceScore = this.querySelector('.intelligence-score').textContent;
            
            alert(`${animalName} Intelligence Profile:\n\n${intelligenceScore}\n\nThis animal is known for its remarkable cognitive abilities!\n\nMore detailed information will be available soon.`);
        });
    });
    
    // Add a simple animation to the hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Add a welcome message in the console
    console.log(`
    🐾 Welcome to The IQ Zoo! 🐾
    
    This is your first website! Here's what you can do:
    
    1. Open your browser and go to: http://localhost:3000
    2. Click on the animal cards to see more info
    3. Try the "Start Ranking" button
    4. Watch the smooth animations!
    
    As we build together, you'll see changes appear instantly in your browser!
    `);
});

// Add some fun interactive features
function addRandomAnimal() {
    const animals = [
        { name: 'Octopus', description: 'Master of camouflage and problem-solving', iq: 88 },
        { name: 'Raven', description: 'Tool-using corvid with complex social behavior', iq: 82 },
        { name: 'Gorilla', description: 'Gentle giants with sign language skills', iq: 87 },
        { name: 'Orangutan', description: 'Tree-dwelling apes with remarkable memory', iq: 85 }
    ];
    
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    console.log(`Random animal fact: ${randomAnimal.name} - ${randomAnimal.description} (IQ: ${randomAnimal.iq})`);
}

// Call this function every 10 seconds for fun
setInterval(addRandomAnimal, 10000); 