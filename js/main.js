// Theme toggler
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check if dark mode is enabled in local storage
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update the icon
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('dark-mode', 'disabled');
    }
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Create a menu animation
    const burger = menuBtn.querySelector('.menu-btn__burger');
    burger.classList.toggle('open');
});

// Add CSS for the active mobile menu
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background-color: var(--bg-color);
            padding: 1.5rem;
            box-shadow: var(--shadow-md);
            z-index: 99;
        }
        
        .menu-btn__burger.open::before {
            transform: rotate(45deg);
        }
        
        .menu-btn__burger.open::after {
            transform: rotate(-45deg);
        }
        
        .menu-btn__burger.open {
            background: transparent;
        }
    </style>
`);

// Navbar scroll effect
const header = document.querySelector('header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = 'var(--shadow-sm)';
    }
    
    lastScrollY = window.scrollY;
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // You can implement form submission logic here
        // For demo purposes, we'll just log the values
        console.log({ name, email, subject, message });
        
        // Show success message
        const formContainer = contactForm.parentElement;
        formContainer.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success-color); margin-bottom: 1rem;"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out, ${name}. I'll get back to you as soon as possible.</p>
            </div>
        `;
    });
}

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-item, .stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Add animation styles
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .project-card, .skill-item, .stat {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .project-card.animate, .skill-item.animate, .stat.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skill-item:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .skill-item:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .skill-item:nth-child(4) {
            transition-delay: 0.3s;
        }
        
        .stat:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .stat:nth-child(3) {
            transition-delay: 0.2s;
        }
    </style>
`);

// Initialize animations on page load
window.addEventListener('load', () => {
    animateOnScroll();
}); 