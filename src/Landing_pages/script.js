// Initialize Lucide icons
lucide.createIcons();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add header shadow on scroll
const header = document.querySelector('header');
let lastScrollY = window.scrollY;

function updateHeader() {
    const scrollY = window.scrollY;
    
    // Add shadow when scrolled
    if (scrollY > 0) {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    // Hide/show header based on scroll direction
    if (scrollY > lastScrollY) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = scrollY;
}

window.addEventListener('scroll', updateHeader);

// Mobile navigation toggle
const createMobileNav = () => {
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i data-lucide="menu"></i>';
    menuButton.style.display = 'none';
    
    // Add mobile menu button styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-button {
                display: block !important;
                background: none;
                border: none;
                padding: 0.5rem;
                cursor: pointer;
                color: var(--text-primary);
            }
            
            nav.active {
                display: flex !important;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--bg-primary);
                padding: 1rem;
                border-bottom: 1px solid var(--card-border);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Insert menu button before nav
    nav.parentNode.insertBefore(menuButton, nav);
    
    // Toggle mobile menu
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
        lucide.createIcons(); // Refresh icons
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
            nav.classList.remove('active');
        }
    });
};

createMobileNav();

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const fadeInElements = document.querySelectorAll('.feature-grid, .steps-grid, .testimonial-grid');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add initial styles and observe elements
fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});