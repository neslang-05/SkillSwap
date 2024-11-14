// Initialize Feather icons
document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
});

// Add event listeners for connect buttons
document.querySelectorAll('.btn-connect').forEach(button => {
    button.addEventListener('click', function() {
        const matchName = this.closest('.match-item').querySelector('.match-name').textContent;
        alert(`Connection request sent to ${matchName}`);
    });
});

// Add event listener for add skill button
document.querySelectorAll('.btn-skill').forEach(button => {
    if (button.textContent === '+ Add Skill') {
        button.addEventListener('click', function() {
            const newSkill = prompt('Enter a new skill:');
            if (newSkill && newSkill.trim()) {
                const skillsContainer = document.querySelector('.skills-container');
                const newButton = document.createElement('button');
                newButton.className = 'btn-skill';
                newButton.textContent = newSkill.trim();
                skillsContainer.insertBefore(newButton, this);
            }
        });
    }
});

// Add responsive navigation toggle
const createResponsiveNav = () => {
    const header = document.querySelector('.main-header');
    const nav = document.querySelector('.header-nav');
    
    // Hide navigation items on smaller screens
    const checkWidth = () => {
        if (window.innerWidth < 640) {
            nav.style.display = 'none';
            if (!document.querySelector('.nav-toggle')) {
                const toggle = document.createElement('button');
                toggle.className = 'nav-toggle';
                toggle.innerHTML = '<i data-feather="menu"></i>';
                header.insertBefore(toggle, nav);
                feather.replace();
                
                toggle.addEventListener('click', () => {
                    nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
                });
            }
        } else {
            nav.style.display = 'flex';
            const toggle = document.querySelector('.nav-toggle');
            if (toggle) {
                toggle.remove();
            }
        }
    };

    // Initial check
    checkWidth();
    
    // Add resize listener
    window.addEventListener('resize', checkWidth);
};

// Initialize responsive navigation
createResponsiveNav();

// Add table row hover effect
document.querySelectorAll('.dashboard-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--gray-100)';
    });
    
    row.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '';
    });
});

// Add skill button hover animations
document.querySelectorAll('.btn-skill').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add notification badge functionality
const addNotificationBadge = () => {
    const bellIcon = document.querySelector('[data-feather="bell"]').closest('i');
    const badge = document.createElement('span');
    badge.className = 'notification-badge';
    badge.style.cssText = `
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: var(--primary-color);
        color: white;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    badge.textContent = '3';
    
    const iconContainer = document.createElement('div');
    iconContainer.style.position = 'relative';
    bellIcon.parentNode.insertBefore(iconContainer, bellIcon);
    iconContainer.appendChild(bellIcon);
    iconContainer.appendChild(badge);
};

// Initialize notification badge
document.addEventListener('DOMContentLoaded', () => {
    addNotificationBadge();
});