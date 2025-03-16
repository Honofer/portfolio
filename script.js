// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Highlight active section in navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.classList.add('dark-mode-toggle');
document.body.appendChild(darkModeToggle);

// Initialize dark mode from localStorage or system preference
let isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                 (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
updateTheme();

// Dark mode toggle function
function updateTheme() {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
}

darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    updateTheme();
    localStorage.setItem('darkMode', isDarkMode);
});

// Add animation classes to elements
function addAnimationClasses() {
    const elements = [
        ...document.querySelectorAll('h1, h2, h3, .hero-content p, .about-text p, .project-card, .skill-tags span')
    ];
    
    elements.forEach((element, index) => {
        element.classList.add('animate');
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.fade-in');
const fadeOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px"
};

const fadeOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, fadeOptions);

fadeElements.forEach(element => {
    fadeOnScroll.observe(element);
});

// Interactive skill tags
document.querySelectorAll('.skill-tags span').forEach(tag => {
    tag.addEventListener('mouseover', () => {
        tag.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    tag.addEventListener('mouseout', () => {
        tag.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 8px 16px var(--card-shadow)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px var(--card-shadow)';
    });
});

// Social links animation
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Initialize animations and event listeners
window.addEventListener('load', () => {
    addAnimationClasses();
});

// Highlight active section in navigation
function updateActiveSection() {
    const currentPos = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (currentPos >= sectionTop && currentPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveSection);

// Add styles
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--primary-color);
        font-weight: 600;
    }

    .dark-mode-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px;
        border: none;
        border-radius: 50%;
        background: var(--background-color);
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        cursor: pointer;
        font-size: 20px;
        z-index: 1000;
        transition: transform 0.3s ease;
    }

    .dark-mode-toggle:hover {
        transform: scale(1.1);
    }

    .dark-mode {
        --background-color: #1a1a1a;
        --text-color: #ffffff;
        --primary-color: #64ffda;
    }

    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .project-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .project-card:hover {
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }
`;
document.head.appendChild(style);
