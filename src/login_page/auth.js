// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const tabTriggers = document.querySelectorAll('.tab-trigger');
const tabContents = document.querySelectorAll('.tab-content');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const googleLoginBtn = document.getElementById('google-login');
const githubLoginBtn = document.getElementById('github-login');
const authSwitchText = document.getElementById('auth-switch-text');
const authSwitchLink = document.getElementById('auth-switch-link');

// State
let isLogin = true;

// Tab Switching
function switchTab(tab) {
    // Update tab triggers
    tabTriggers.forEach(trigger => {
        trigger.classList.remove('active');
        if (trigger.dataset.tab === tab) {
            trigger.classList.add('active');
        }
    });

    // Update tab contents
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tab) {
            content.classList.add('active');
        }
    });

    // Update auth switch text
    isLogin = tab === 'login';
    updateAuthSwitchText();
}

// Event Listeners
tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        switchTab(trigger.dataset.tab);
    });
});

// Form Submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        // Here you would typically make an API call to your backend
        console.log('Login attempt:', { email, password });
        // Simulate API call
        await simulateApiCall({ email, password });
        // Redirect on success
        window.location.href = '/dashboard';
    } catch (error) {
        showError(loginForm, error.message);
    }
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        // Here you would typically make an API call to your backend
        console.log('Signup attempt:', { name, email, password });
        // Simulate API call
        await simulateApiCall({ name, email, password });
        // Redirect on success
        window.location.href = '/dashboard';
    } catch (error) {
        showError(signupForm, error.message);
    }
});

// Social Login
googleLoginBtn.addEventListener('click', async () => {
    try {
        console.log('Google login attempt');
        await simulateApiCall({ provider: 'google' });
    } catch (error) {
        showError(null, error.message);
    }
});

githubLoginBtn.addEventListener('click', async () => {
    try {
        console.log('GitHub login attempt');
        await simulateApiCall({ provider: 'github' });
    } catch (error) {
        showError(null, error.message);
    }
});

// Auth Switch
authSwitchLink.addEventListener('click', (e) => {
    e.preventDefault();
    isLogin = !isLogin;
    switchTab(isLogin ? 'login' : 'signup');
});

// Helper Functions
function updateAuthSwitchText() {
    authSwitchText.textContent = isLogin ? "Don't have an account? " : "Already have an account? ";
    authSwitchLink.textContent = isLogin ? "Sign up" : "Log in";
}

function showError(form, message) {
    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    // Add error message to form or body
    if (form) {
        form.appendChild(errorDiv);
    } else {
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }
}

// Simulate API call (replace with actual API calls)
function simulateApiCall(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve(data);
            } else {
                reject(new Error('Authentication failed. Please try again.'));
            }
        }, 1000);
    });
}

// Initialize
updateAuthSwitchText();