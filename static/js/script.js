// Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScrolling();
    initFadeInAnimations();
    initContactForm();
    initNavbarScroll();
    initSkillCards();
    initFooterEffects();
    initChatbox();
    initEnhancedNavbar();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Fade in animations on scroll
function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (validateForm(formData)) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Send form data to server
                fetch('/send_message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        showMessage(data.message, 'success');
                        contactForm.reset();
                    } else {
                        showMessage(data.message, 'error');
                    }
                })
                .catch(error => {
                    showMessage('Error sending message. Please try again.', 'error');
                    console.error('Error:', error);
                })
                .finally(() => {
                    // Reset button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
            }
        });
    }
}

// Form validation
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.firstName.trim()) {
        showMessage('Please enter your first name.', 'error');
        return false;
    }
    
    if (!data.lastName.trim()) {
        showMessage('Please enter your last name.', 'error');
        return false;
    }
    
    if (!data.email.trim() || !emailRegex.test(data.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!data.subject.trim()) {
        showMessage('Please enter a subject.', 'error');
        return false;
    }
    
    if (!data.message.trim()) {
        showMessage('Please enter a message.', 'error');
        return false;
    }
    
    return true;
}

// Show message to user
function showMessage(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert alert at the top of the form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alert, form);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Skill cards hover effect
function initSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Project card interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const viewButton = card.querySelector('.btn-primary');
        
        if (viewButton) {
            viewButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add a simple click effect
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // Show modal or redirect (placeholder)
                showProjectModal(card);
            });
        }
    });
});

// Show project modal (placeholder)
function showProjectModal(card) {
    const title = card.querySelector('.card-title').textContent;
    const description = card.querySelector('.card-text').textContent;
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="projectModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p>${description}</p>
                        <div class="text-center">
                            <div class="project-placeholder-large">
                                <i class="fas fa-image fa-3x text-muted"></i>
                            </div>
                            <p class="mt-3 text-muted">Project preview coming soon!</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">View Live Demo</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal
    const existingModal = document.getElementById('projectModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
    
    // Remove modal from DOM when hidden
    document.getElementById('projectModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Initialize typing effect if on home page
if (window.location.pathname === '/' || window.location.pathname === '/home') {
    document.addEventListener('DOMContentLoaded', initTypingEffect);
}

// Tech background effects
function initTechEffects() {
    // Add random floating code elements
    const techBackground = document.querySelector('.tech-background');
    if (techBackground) {
        const codeSnippets = [
            'const app = express();',
            'def hello_world():',
            'import { useState } from "react";',
            'SELECT * FROM users;',
            'npm install package',
            'git commit -m "feat: add feature"',
            'docker run -p 3000:3000',
            'kubectl apply -f deployment.yaml',
            'aws s3 cp file.txt s3://bucket/',
            'terraform apply'
        ];
        
        // Add more floating code elements dynamically
        for (let i = 0; i < 5; i++) {
            const codeElement = document.createElement('div');
            codeElement.className = 'floating-code';
            codeElement.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            codeElement.style.animationDelay = Math.random() * 20 + 's';
            codeElement.style.left = Math.random() * 100 + '%';
            techBackground.appendChild(codeElement);
        }
    }
    
    // Add particle effect
    createParticleEffect();
}

// Create particle effect
function createParticleEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    heroSection.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    // Add particle animation CSS
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleFloat {
                0% { transform: translateY(100vh) translateX(0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize tech effects on home page
if (window.location.pathname === '/' || window.location.pathname === '/home') {
    document.addEventListener('DOMContentLoaded', initTechEffects);
}

// Footer effects and interactions
function initFooterEffects() {
    // Add hover effects to footer links
    const footerLinks = document.querySelectorAll('.footer ul li a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add click tracking for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a small animation on click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Track social link clicks (you can integrate with analytics)
            const platform = this.querySelector('i').className.split('fa-')[1];
            console.log(`Social link clicked: ${platform}`);
        });
    });
    
    // Add tech stack badge hover effects
    const techBadges = document.querySelectorAll('.tech-stack .badge');
    techBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add footer visibility animation
    const footer = document.querySelector('.footer');
    if (footer) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('footer-visible');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(footer);
    }
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Chatbox functionality
function initChatbox() {
    const chatToggle = document.getElementById('chatToggle');
    const chatbox = document.getElementById('chatbox');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const minimizeBtn = document.getElementById('minimizeChat');
    const closeBtn = document.getElementById('closeChat');
    const notification = document.getElementById('chatNotification');
    const quickBtns = document.querySelectorAll('.quick-btn');
    
    let isMinimized = false;
    let messageCount = 0;
    
    // Toggle chatbox
    chatToggle.addEventListener('click', function() {
        if (chatbox.classList.contains('active')) {
            closeChatbox();
        } else {
            openChatbox();
        }
    });
    
    // Minimize chatbox
    minimizeBtn.addEventListener('click', function() {
        if (isMinimized) {
            chatbox.classList.remove('minimized');
            isMinimized = false;
        } else {
            chatbox.classList.add('minimized');
            isMinimized = true;
        }
    });
    
    // Close chatbox
    closeBtn.addEventListener('click', function() {
        closeChatbox();
    });
    
    // Chat form submission
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            sendMessage(message);
            chatInput.value = '';
        }
    });
    
    // Quick action buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            sendMessage(message);
        });
    });
    
    // Auto-hide notification after opening
    chatbox.addEventListener('click', function() {
        hideNotification();
    });
    
    function openChatbox() {
        chatbox.classList.add('active');
        chatToggle.classList.add('active');
        chatInput.focus();
        hideNotification();
    }
    
    function closeChatbox() {
        chatbox.classList.remove('active');
        chatToggle.classList.remove('active');
    }
    
    function sendMessage(message) {
        // Add user message
        addMessage(message, 'user');
        
        // Show typing indicator
        showTypingIndicator();
        
        // Send message to backend API
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            hideTypingIndicator();
            if (data.success) {
                addMessage(data.response, 'bot');
            } else {
                addMessage('Sorry, I encountered an error. Please try again.', 'bot');
            }
        })
        .catch(error => {
            hideTypingIndicator();
            addMessage('Sorry, I\'m having trouble connecting. Please try again later.', 'bot');
            console.error('Chat error:', error);
        });
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = text;
        
        const time = document.createElement('span');
        time.className = 'message-time';
        time.textContent = getCurrentTime();
        
        content.appendChild(messageText);
        content.appendChild(time);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        if (sender === 'bot' && !chatbox.classList.contains('active')) {
            showNotification();
        }
    }
    
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = '<p>AI is typing<span class="typing-dots">...</span></p>';
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(content);
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function generateAIResponse(userMessage) {
        const responses = {
            'projects': "I have several exciting projects including an E-Commerce website built with Flask, a Task Management App with React, and a Data Visualization Dashboard. You can view all my projects on the Projects page!",
            'contact': "You can contact me through multiple channels: Email me at rajat.developer@example.com, call me at +1 (555) 123-4567, or message me on WhatsApp. I'm always happy to connect!",
            'skills': "I specialize in Python, JavaScript, HTML5, CSS3, Flask, React, and modern web technologies. I also have experience with databases, APIs, and cloud services.",
            'hello': "Hello! I'm your AI assistant. I can help you learn more about this portfolio, the projects, or how to get in touch. What would you like to know?",
            'default': "That's an interesting question! I'm here to help you learn more about this portfolio. You can ask me about projects, skills, contact information, or anything else you'd like to know."
        };
        
        const message = userMessage.toLowerCase();
        
        if (message.includes('project')) return responses.projects;
        if (message.includes('contact') || message.includes('reach')) return responses.contact;
        if (message.includes('skill') || message.includes('technolog')) return responses.skills;
        if (message.includes('hello') || message.includes('hi')) return responses.hello;
        
        return responses.default;
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    
    function showNotification() {
        messageCount++;
        notification.textContent = messageCount;
        notification.style.display = 'flex';
    }
    
    function hideNotification() {
        messageCount = 0;
        notification.style.display = 'none';
    }
    
    // Auto-open chatbox after 5 seconds
    setTimeout(() => {
        if (!chatbox.classList.contains('active')) {
            showNotification();
        }
    }, 5000);
}

// Utility function for smooth animations
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Enhanced Navbar functionality
function initEnhancedNavbar() {
    const navbar = document.querySelector('.enhanced-navbar');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const liveChatBtn = document.getElementById('liveChatBtn');
    const chatToggle = document.getElementById('chatToggle');
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
    
    // AI Search functionality
    function performAISearch(query) {
        if (!query.trim()) return;
        
        const searchModal = new bootstrap.Modal(document.getElementById('searchModal'));
        const searchResults = document.getElementById('searchResults');
        const googleSearchBtn = document.getElementById('googleSearchBtn');
        
        // Show loading state
        searchResults.innerHTML = `
            <div class="search-loading">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Searching...</span>
                </div>
                <p class="mt-2">Searching for answers...</p>
            </div>
        `;
        
        searchModal.show();
        
        // Store query for Google fallback
        googleSearchBtn.onclick = () => {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
        };
        
        // Send AI search request
        fetch('/ai_search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success && data.results.length > 0) {
                displaySearchResults(data.results, query);
            } else {
                showGoogleFallback(query);
            }
        })
        .catch(error => {
            console.error('Search error:', error);
            showGoogleFallback(query);
        });
    }
    
    function displaySearchResults(results, query) {
        const searchResults = document.getElementById('searchResults');
        let html = `<h6 class="mb-3">AI Search Results for: "${query}"</h6>`;
        
        results.forEach(result => {
            html += `
                <div class="search-result ai-response">
                    <h6><i class="fas fa-robot me-2"></i>${result.title}</h6>
                    <p>${result.answer}</p>
                </div>
            `;
        });
        
        // Add suggestions
        html += `
            <div class="search-suggestions">
                <h6>Try asking about:</h6>
                <span class="suggestion-item" onclick="performAISearch('python')">Python</span>
                <span class="suggestion-item" onclick="performAISearch('javascript')">JavaScript</span>
                <span class="suggestion-item" onclick="performAISearch('react')">React</span>
                <span class="suggestion-item" onclick="performAISearch('web development')">Web Development</span>
                <span class="suggestion-item" onclick="performAISearch('projects')">Projects</span>
            </div>
        `;
        
        searchResults.innerHTML = html;
    }
    
    function showGoogleFallback(query) {
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = `
            <div class="search-result google-fallback">
                <h6><i class="fab fa-google me-2"></i>No AI Results Found</h6>
                <p>I couldn't find specific information about "${query}". Would you like to search on Google instead?</p>
                <button class="btn btn-primary" onclick="window.open('https://www.google.com/search?q=${encodeURIComponent(query)}', '_blank')">
                    <i class="fab fa-google me-1"></i>Search on Google
                </button>
            </div>
        `;
    }
    
    // Google Search functionality (fallback)
    function performGoogleSearch(query) {
        if (query.trim()) {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
        }
    }
    
    // Search button click
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        performAISearch(query);
    });
    
    // Search input enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            performAISearch(query);
        }
    });
    
    // Search input focus effects
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
    
    // Live Chat button functionality
    liveChatBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (chatToggle) {
            chatToggle.click();
        }
    });
    
    // Navbar link hover effects
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Brand hover effect
    const brand = document.querySelector('.navbar-brand');
    if (brand) {
        brand.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        brand.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Mobile menu animation
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            setTimeout(() => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.style.animation = 'slideDown 0.3s ease';
                } else {
                    navbarCollapse.style.animation = 'slideUp 0.3s ease';
                }
            }, 10);
        });
    }
    
    // Add mobile search functionality
    if (window.innerWidth <= 992) {
        const mobileSearchBtn = document.createElement('button');
        mobileSearchBtn.className = 'btn btn-outline-light ms-2 d-lg-none';
        mobileSearchBtn.innerHTML = '<i class="fas fa-search"></i>';
        mobileSearchBtn.style.borderRadius = '50%';
        mobileSearchBtn.style.width = '40px';
        mobileSearchBtn.style.height = '40px';
        mobileSearchBtn.style.padding = '0';
        
        mobileSearchBtn.addEventListener('click', function() {
            const query = prompt('Enter your search query:');
            if (query) {
                performAISearch(query);
            }
        });
        
        const navbarNav = document.querySelector('.navbar-nav');
        if (navbarNav) {
            navbarNav.appendChild(mobileSearchBtn);
        }
    }
}

// Add CSS animations for mobile menu
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);
