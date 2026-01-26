// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('.mobile-nav').classList.remove('active');
        }
    });
});

// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.mobile-nav').classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileNav = document.querySelector('.mobile-nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileNav.classList.remove('active');
    }
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const subject = this.querySelectorAll('input[type="text"]')[1].value;
    const message = this.querySelector('textarea').value;
    
    // In a real application, you would send this data to a server
    // For now, we'll just show an alert
    alert(`Thank you, ${name}! Your message has been sent. I'll get back to you at ${email} as soon as possible.`);
    
    // Reset form
    this.reset();
});

// Animate skill bars when they come into view
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
};

// Intersection Observer for skill bars animation
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(44, 62, 80, 0.98)';
        nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(44, 62, 80, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Initialize skill bars animation on page load if skills section is visible
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.getElementById('skills');
    const rect = skillsSection.getBoundingClientRect();
    
    // If skills section is already in view on page load
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        animateSkillBars();
    }
});