// Travel Recommendation Data
const destinations = {
    beaches: [
        {
            name: "Maldives",
            description: "Stunning white sand beaches with crystal clear turquoise waters in the Indian Ocean.",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
            location: "Indian Ocean",
            type: "beach"
        },
        {
            name: "Bali, Indonesia",
            description: "Beautiful beaches blended with vibrant culture and stunning rice terraces.",
            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop",
            location: "Southeast Asia",
            type: "beach"
        }
    ],
    temples: [
        {
            name: "Angkor Wat, Cambodia",
            description: "The largest religious monument in the world showcasing stunning Khmer architecture.",
            image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&h=400&fit=crop",
            location: "Siem Reap, Cambodia",
            type: "temple"
        },
        {
            name: "Wat Arun, Thailand",
            description: "The Temple of Dawn, one of Bangkok's most stunning landmarks.",
            image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&h=400&fit=crop",
            location: "Bangkok, Thailand",
            type: "temple"
        }
    ],
    countries: [
        {
            name: "Japan",
            description: "Seamlessly blends ancient traditions with modern innovation.",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop",
            location: "East Asia",
            type: "country"
        },
        {
            name: "Italy",
            description: "A treasure trove of art, history, and culinary excellence.",
            image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=400&fit=crop",
            location: "Southern Europe",
            type: "country"
        }
    ]
};

// Search Functionality
function searchDestinations() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsSection = document.getElementById('search-results');
    const resultsContainer = document.getElementById('results-container');
    
    if (!searchInput) {
        alert('Please enter a search term');
        return;
    }
    
    let results = [];
    
    // Search through all destinations
    Object.values(destinations).forEach(category => {
        category.forEach(dest => {
            if (dest.name.toLowerCase().includes(searchInput) || 
                dest.description.toLowerCase().includes(searchInput) ||
                dest.location.toLowerCase().includes(searchInput) ||
                dest.type.toLowerCase().includes(searchInput)) {
                results.push(dest);
            }
        });
    });
    
    // Display results
    if (results.length > 0) {
        resultsContainer.innerHTML = results.map(dest => `
            <div class="recommendation-card">
                <div class="card-image">
                    <img src="${dest.image}" alt="${dest.name}">
                </div>
                <div class="card-content">
                    <h3>${dest.name}</h3>
                    <p>${dest.description}</p>
                    <div class="card-details">
                        <span class="location">📍 ${dest.location}</span>
                        <span class="type">${dest.type}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        resultsContainer.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No results found. Try searching for beaches, temples, or countries.</p>';
        resultsSection.style.display = 'block';
    }
}

// Clear Search Functionality
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const resultsSection = document.getElementById('search-results');
    
    if (searchInput) {
        searchInput.value = '';
    }
    
    if (resultsSection) {
        resultsSection.style.display = 'none';
    }
}

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            alert(`Thank you, ${name}! Your message has been received. We will contact you at ${email} soon.`);
            contactForm.reset();
        });
    }
    
    // Search on Enter key
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchDestinations();
            }
        });
    }
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
