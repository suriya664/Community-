/* ============================================
   MAIN JAVASCRIPT - COMMUNITY WEBSITE
   ============================================ */

// Navbar Active Link Highlighting
document.addEventListener('DOMContentLoaded', function() {
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Mobile menu close on link click
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
});

// Smooth Scroll for Anchor Links
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

// Form AJAX Submission Handler
function handleFormSubmit(formId, successMessage, errorMessage) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        // Simulate AJAX call (replace with actual endpoint)
        setTimeout(() => {
            // Success simulation
            showNotification(successMessage, 'success');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 1500);
        
        // Actual AJAX implementation would be:
        /*
        fetch('your-endpoint.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            showNotification(successMessage, 'success');
            form.reset();
        })
        .catch(error => {
            showNotification(errorMessage, 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
        */
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Initialize all forms on page load
document.addEventListener('DOMContentLoaded', function() {
    // Join Community Form
    handleFormSubmit('joinForm', 'Thank you! Your application has been submitted successfully.', 'Oops! Something went wrong. Please try again.');
    
    // Contact Form
    handleFormSubmit('contactForm', 'Thank you for contacting us! We will get back to you soon.', 'Failed to send message. Please try again.');
    
    // Register Form
    handleFormSubmit('registerForm', 'Registration successful! Welcome to our community.', 'Registration failed. Please try again.');
});

// Animated Stats Counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate counters if present
            const counter = entry.target.querySelector('.counter');
            if (counter) {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

// Gallery Masonry Layout Handler
function initMasonry() {
    const gallery = document.querySelector('.masonry-grid');
    if (!gallery) return;
    
    const items = gallery.querySelectorAll('.masonry-item');
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Filter Functionality
function filterItems(category, element) {
    const items = document.querySelectorAll('.filter-item');
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
    
    // Update active filter button
    if (element) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        element.classList.add('active');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initMasonry();
});

// Testimonial Carousel Auto-play
function initTestimonialCarousel() {
    const carousel = document.querySelector('#testimonialCarousel');
    if (!carousel) return;
    
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 5000,
        wrap: true
    });
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialCarousel();
});

// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Apply dark mode on load if saved
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Helper: update all toggle button icons across the page
    function syncAllIcons(isDark) {
        const allToggles = document.querySelectorAll('#darkModeToggle, #desktopThemeToggle');
        allToggles.forEach(function(btn) {
            const icon = btn.querySelector('i');
            if (!icon) return;
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // Shared toggle function
    function toggleDarkMode() {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDark);
        syncAllIcons(isDark);
    }

    // Attach click handler to all toggle buttons
    const allToggles = document.querySelectorAll('#darkModeToggle, #desktopThemeToggle');
    allToggles.forEach(function(btn) {
        btn.addEventListener('click', toggleDarkMode);
    });

    // Set initial icon state
    syncAllIcons(isDarkMode);
});
