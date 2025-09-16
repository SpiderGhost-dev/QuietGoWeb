// QuietGo Site JavaScript - Minimal interactions
// No frameworks, just vanilla JavaScript

// State management
let isAnnualBilling = false;

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('open');
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('open');
}

// Handle login redirect
function handleLogin() {
    // Redirect to QuietGo Hub or authentication
    window.location.href = '/api/login';
}

// Handle get started action
function handleGetStarted() {
    // Redirect to sign up or login
    window.location.href = '/api/login';
}

// Handle app store links
function handleAppStore() {
    // Replace with actual App Store URL when ready
    alert('App Store link - Replace with actual URL when app is published');
    // window.open('https://apps.apple.com/app/quietgo', '_blank');
}

function handlePlayStore() {
    // Replace with actual Play Store URL when ready
    alert('Play Store link - Replace with actual URL when app is published');
    // window.open('https://play.google.com/store/apps/details?id=com.quietgo.app', '_blank');
}

// Subscription modal functionality
function openSubscriptionModal() {
    const modal = document.getElementById('subscriptionModal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent body scrolling
}

function closeSubscriptionModal() {
    const modal = document.getElementById('subscriptionModal');
    modal.classList.remove('open');
    document.body.style.overflow = ''; // Restore body scrolling
}

// Toggle billing cycle (monthly/annual)
function toggleBilling() {
    isAnnualBilling = !isAnnualBilling;
    const toggleBtn = document.getElementById('billingToggle');
    const priceEl = document.getElementById('modalPrice');
    const saveBadge = document.getElementById('saveBadge');
    
    if (isAnnualBilling) {
        toggleBtn.textContent = 'Annual';
        toggleBtn.classList.remove('btn-outline');
        toggleBtn.classList.add('btn-primary');
        priceEl.innerHTML = '$39.99<span class="price-note">/year</span>';
        saveBadge.style.display = 'inline-block';
    } else {
        toggleBtn.textContent = 'Monthly';
        toggleBtn.classList.remove('btn-primary');
        toggleBtn.classList.add('btn-outline');
        priceEl.innerHTML = '$4.99<span class="price-note">/month</span>';
        saveBadge.style.display = 'none';
    }
}

// Close modal when clicking outside
function setupModalClickOutside() {
    const modal = document.getElementById('subscriptionModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeSubscriptionModal();
        }
    });
}

// Handle keyboard events
function setupKeyboardEvents() {
    document.addEventListener('keydown', function(e) {
        // Close modal on Escape key
        if (e.key === 'Escape') {
            const modal = document.getElementById('subscriptionModal');
            if (modal.classList.contains('open')) {
                closeSubscriptionModal();
            }
            
            // Close mobile menu
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
            }
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupModalClickOutside();
    setupKeyboardEvents();
    
    console.log('QuietGo site initialized');
});

// Add some utility functions for potential future use
function updateQueryParam(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.replaceState({}, '', url);
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Simple analytics event tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // Add your analytics tracking here
    console.log('Event tracked:', eventName, properties);
}

// Track button clicks for analytics
function trackButtonClick(buttonName) {
    trackEvent('button_click', { button: buttonName });
}

// Enhanced button handlers with tracking
const originalHandleLogin = handleLogin;
handleLogin = function() {
    trackButtonClick('login');
    originalHandleLogin();
};

const originalHandleGetStarted = handleGetStarted;
handleGetStarted = function() {
    trackButtonClick('get_started');
    originalHandleGetStarted();
};

const originalHandleAppStore = handleAppStore;
handleAppStore = function() {
    trackButtonClick('app_store');
    originalHandleAppStore();
};

const originalHandlePlayStore = handlePlayStore;
handlePlayStore = function() {
    trackButtonClick('play_store');
    originalHandlePlayStore();
};

// Add smooth reveal animations on scroll (optional enhancement)
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.card, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations after page load
window.addEventListener('load', function() {
    addScrollAnimations();
});