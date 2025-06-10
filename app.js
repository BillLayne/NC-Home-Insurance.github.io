// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile sticky CTA management
    const mobileCTA = document.getElementById('mobileCTA');
    const hero = document.querySelector('.hero');
    
    function handleMobileCTA() {
        if (window.innerWidth <= 768) {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition > heroBottom) {
                mobileCTA.style.display = 'block';
                mobileCTA.style.transform = 'translateY(0)';
            } else {
                mobileCTA.style.transform = 'translateY(100%)';
            }
        } else {
            mobileCTA.style.display = 'none';
        }
    }
    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('quoteModal');
    const requestQuoteBtn = document.getElementById('requestQuote');
    const modalClose = document.querySelector('.modal-close');
    const quoteForm = document.getElementById('quoteForm');
    
    function openModal() {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus on first form input
        const firstInput = modal.querySelector('input[type="text"]');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
    
    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Return focus to trigger button
        if (requestQuoteBtn) {
            requestQuoteBtn.focus();
        }
    }
    
    // Open modal
    if (requestQuoteBtn) {
        requestQuoteBtn.addEventListener('click', openModal);
    }
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Form validation and submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(quoteForm);
            const data = {};
            
            // Collect form data
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Basic validation
            const requiredFields = ['fullName', 'phone', 'homeAddress'];
            let isValid = true;
            let firstErrorField = null;
            
            // Clear previous error styles
            document.querySelectorAll('.form-control').forEach(input => {
                input.style.borderColor = '';
                input.setAttribute('aria-invalid', 'false');
            });
            
            // Remove any existing error messages
            const existingError = document.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Validate required fields
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                const value = data[field];
                
                if (!value || value.trim() === '') {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                    input.setAttribute('aria-invalid', 'true');
                    if (!firstErrorField) {
                        firstErrorField = input;
                    }
                }
            });
            
            // Phone number validation
            const phoneInput = document.getElementById('phone');
            const phoneValue = data.phone ? data.phone.replace(/\D/g, '') : '';
            if (data.phone && phoneValue.length < 10) {
                isValid = false;
                phoneInput.style.borderColor = '#ef4444';
                phoneInput.setAttribute('aria-invalid', 'true');
                if (!firstErrorField) {
                    firstErrorField = phoneInput;
                }
            }
            
            // Email validation (if provided)
            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (data.email && data.email.trim() !== '' && !emailPattern.test(data.email)) {
                isValid = false;
                emailInput.style.borderColor = '#ef4444';
                emailInput.setAttribute('aria-invalid', 'true');
                if (!firstErrorField) {
                    firstErrorField = emailInput;
                }
            }
            
            if (!isValid) {
                // Show error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.style.cssText = `
                    background: #fef2f2;
                    border: 1px solid #fecaca;
                    color: #dc2626;
                    padding: 12px;
                    border-radius: 6px;
                    margin-bottom: 16px;
                    font-size: 14px;
                `;
                errorDiv.textContent = 'Please fill in all required fields correctly.';
                
                quoteForm.insertBefore(errorDiv, quoteForm.firstElementChild);
                
                // Focus on first error field
                if (firstErrorField) {
                    firstErrorField.focus();
                }
                
                return;
            }
            
            // If validation passes, proceed with submission
            const submitBtn = quoteForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Simulate successful submission
            setTimeout(() => {
                // Mark form as submitted
                quoteForm.dataset.submitted = 'true';
                
                // Create success message
                const successDiv = document.createElement('div');
                successDiv.style.cssText = `
                    background: #f0fdf4;
                    border: 1px solid #bbf7d0;
                    color: #166534;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                    margin-bottom: 16px;
                `;
                successDiv.innerHTML = `
                    <h4 style="margin: 0 0 8px 0; color: #166534; font-size: 18px;">Quote Request Submitted Successfully!</h4>
                    <p style="margin: 0; font-size: 14px;">Bill Layne will contact you within 24 hours at ${data.phone}</p>
                `;
                
                // Replace form with success message
                quoteForm.style.display = 'none';
                quoteForm.parentNode.insertBefore(successDiv, quoteForm);
                
                // Auto-close modal after 3 seconds and reset
                setTimeout(() => {
                    closeModal();
                    
                    // Reset form for next use
                    setTimeout(() => {
                        quoteForm.reset();
                        quoteForm.style.display = 'block';
                        successDiv.remove();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        quoteForm.dataset.submitted = 'false';
                    }, 500);
                }, 3000);
                
                // Track successful submission
                trackEvent('form_submit', 'lead_generation', 'quote_form_success');
                
            }, 1000); // Reduced timeout for better UX
        });
        
        // Real-time validation feedback
        const inputs = quoteForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(input);
            });
            
            input.addEventListener('input', function() {
                // Clear error styling on input
                if (input.style.borderColor === 'rgb(239, 68, 68)') {
                    input.style.borderColor = '';
                    input.setAttribute('aria-invalid', 'false');
                }
                
                // Remove error message if all fields are valid
                const errorMessage = document.querySelector('.error-message');
                if (errorMessage) {
                    const allInputs = quoteForm.querySelectorAll('input[required], select[required]');
                    const allValid = Array.from(allInputs).every(inp => {
                        return inp.value.trim() !== '' && inp.getAttribute('aria-invalid') !== 'true';
                    });
                    
                    if (allValid) {
                        errorMessage.remove();
                    }
                }
            });
        });
    }
    
    function validateField(input) {
        const value = input.value.trim();
        const isRequired = input.hasAttribute('required');
        
        if (isRequired && value === '') {
            input.style.borderColor = '#ef4444';
            input.setAttribute('aria-invalid', 'true');
            return false;
        }
        
        // Special validation for phone
        if (input.type === 'tel') {
            const phoneValue = value.replace(/\D/g, '');
            if (value !== '' && phoneValue.length < 10) {
                input.style.borderColor = '#ef4444';
                input.setAttribute('aria-invalid', 'true');
                return false;
            }
        }
        
        // Special validation for email
        if (input.type === 'email' && value !== '') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                input.style.borderColor = '#ef4444';
                input.setAttribute('aria-invalid', 'true');
                return false;
            }
        }
        
        input.style.borderColor = '';
        input.setAttribute('aria-invalid', 'false');
        return true;
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.nav-sticky').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animations
    document.querySelectorAll('.coverage-card, .difference-card, .coverage-detail-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    formattedValue = `(${value}`;
                } else if (value.length <= 6) {
                    formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            
            e.target.value = formattedValue;
        });
    }
    
    // Progressive enhancement for better UX
    function enhanceAccessibility() {
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#coverage';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #1e40af;
            color: white;
            padding: 8px;
            border-radius: 4px;
            text-decoration: none;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Enhance form labels
        document.querySelectorAll('.form-control').forEach(input => {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label && input.hasAttribute('required')) {
                input.setAttribute('aria-required', 'true');
            }
        });
    }
    
    // Analytics tracking (placeholder)
    function trackEvent(action, category, label) {
        // Placeholder for analytics tracking
        console.log('Event tracked:', { action, category, label });
        
        // Example: Google Analytics 4
        // gtag('event', action, {
        //     event_category: category,
        //     event_label: label
        // });
    }
    
    // Make trackEvent available globally for form submission
    window.trackEvent = trackEvent;
    
    // Track important interactions
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('click', 'phone_call', 'cta_button');
        });
    });
    
    if (requestQuoteBtn) {
        requestQuoteBtn.addEventListener('click', () => {
            trackEvent('click', 'lead_generation', 'quote_request');
        });
    }
    
    // Performance optimization
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    // Initialize enhancements
    enhanceAccessibility();
    lazyLoadImages();
    
    // Event listeners
    window.addEventListener('scroll', handleMobileCTA);
    window.addEventListener('resize', handleMobileCTA);
    
    // Initial call
    handleMobileCTA();
    
    // Page visibility API for analytics
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'hidden') {
            trackEvent('page_exit', 'engagement', 'page_hidden');
        }
    });
    
    // Form abandonment tracking
    let formStarted = false;
    if (quoteForm) {
        quoteForm.addEventListener('input', function() {
            if (!formStarted) {
                formStarted = true;
                trackEvent('form_start', 'lead_generation', 'quote_form');
            }
        });
        
        window.addEventListener('beforeunload', function() {
            if (formStarted && quoteForm.dataset.submitted !== 'true') {
                trackEvent('form_abandon', 'lead_generation', 'quote_form');
            }
        });
    }
    
    // Error handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        trackEvent('javascript_error', 'technical', e.error.message);
    });
    
    // Performance monitoring
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                trackEvent('page_load_time', 'performance', Math.round(loadTime));
            }
        }, 0);
    });
    
    // Console welcome message
    console.log('%cBill Layne Insurance Agency', 'color: #1e40af; font-size: 20px; font-weight: bold;');
    console.log('%cServing North Carolina since 2004', 'color: #f97316; font-size: 14px;');
    console.log('For technical support, contact: Save@BillLayneInsurance.com');
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Insurance Calculator Functionality
let currentCalculatorStep = 1;
const totalCalculatorSteps = 4;

function initializeCalculator() {
    // Home value slider
    const homeValueSlider = document.getElementById('homeValueSlider');
    const homeValueDisplay = document.getElementById('homeValueDisplay');
    
    if (homeValueSlider && homeValueDisplay) {
        homeValueDisplay.textContent = parseInt(homeValueSlider.value).toLocaleString();
        
        homeValueSlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            homeValueDisplay.textContent = value.toLocaleString();
            updatePremiumEstimate();
        });
    }

    // Form submission
    const calculatorForm = document.getElementById('calculatorForm');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', handleCalculatorSubmission);
    }

    // Initialize progress
    updateCalculatorProgress();
}

function nextCalculatorStep() {
    if (validateCalculatorStep()) {
        if (currentCalculatorStep < totalCalculatorSteps) {
            document.getElementById(`step${currentCalculatorStep}`).classList.remove('active');
            currentCalculatorStep++;
            document.getElementById(`step${currentCalculatorStep}`).classList.add('active');
            updateCalculatorProgress();
            
            if (currentCalculatorStep === 4) {
                setTimeout(() => {
                    updatePremiumEstimate();
                }, 300);
            }
        }
    }
}

function prevCalculatorStep() {
    if (currentCalculatorStep > 1) {
        document.getElementById(`step${currentCalculatorStep}`).classList.remove('active');
        currentCalculatorStep--;
        document.getElementById(`step${currentCalculatorStep}`).classList.add('active');
        updateCalculatorProgress();
    }
}

function updateCalculatorProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentStepDisplay = document.getElementById('currentStep');
    
    if (progressFill) {
        const progressPercentage = (currentCalculatorStep / totalCalculatorSteps) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }
    
    if (currentStepDisplay) {
        currentStepDisplay.textContent = currentCalculatorStep;
    }
}

function validateCalculatorStep() {
    const currentStepElement = document.getElementById(`step${currentCalculatorStep}`);
    if (!currentStepElement) return true;
    
    const requiredFields = currentStepElement.querySelectorAll('select[required]');
    
    for (let field of requiredFields) {
        if (!field.value || !field.value.trim()) {
            field.focus();
            showCalculatorNotification('Please fill in all required fields', 'error');
            return false;
        }
    }
    
    // Special validation for step 2
    if (currentCalculatorStep === 2) {
        const yearBuilt = document.getElementById('yearBuilt');
        if (!yearBuilt.value) {
            yearBuilt.focus();
            showCalculatorNotification('Please select when your home was built', 'error');
            return false;
        }
    }
    
    return true;
}

function updatePremiumEstimate() {
    const homeValueSlider = document.getElementById('homeValueSlider');
    const yearBuiltSelect = document.getElementById('yearBuilt');
    const locationSelect = document.getElementById('homeLocation');
    const premiumDisplay = document.getElementById('estimatedPremium');
    
    if (!homeValueSlider || !premiumDisplay) return;
    
    const homeValue = parseInt(homeValueSlider.value || 250000);
    const yearBuilt = yearBuiltSelect ? yearBuiltSelect.value : '';
    const location = locationSelect ? locationSelect.value : 'elkin';
    
    // Basic premium calculation logic
    let basePremium = homeValue * 0.0035; // 0.35% of home value
    
    // Adjust for year built
    if (yearBuilt) {
        const year = parseInt(yearBuilt);
        if (year >= 2020) basePremium *= 0.85;
        else if (year >= 2000) basePremium *= 0.95;
        else if (year >= 1980) basePremium *= 1.1;
        else basePremium *= 1.25;
    }
    
    // Adjust for location (North Carolina specific)
    const locationMultipliers = {
        'elkin': 0.9,
        'statesville': 0.95,
        'winston-salem': 1.0,
        'greensboro': 1.05,
        'charlotte': 1.1,
        'other-nc': 1.0,
        'other': 1.15
    };
    basePremium *= locationMultipliers[location] || 1.0;
    
    // Add some variation for realism
    basePremium += (Math.random() - 0.5) * 200;
    
    const estimatedPremium = Math.max(600, Math.round(basePremium));
    
    // Animate the number change
    const currentValue = parseInt(premiumDisplay.textContent.replace(/,/g, '')) || 0;
    animateNumber(premiumDisplay, currentValue, estimatedPremium);
}

function animateNumber(element, from, to) {
    const duration = 1000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(from + (to - from) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function handleCalculatorSubmission(e) {
    e.preventDefault();
    
    const formData = {
        homeValue: document.getElementById('homeValueSlider')?.value,
        yearBuilt: document.getElementById('yearBuilt')?.value,
        location: document.getElementById('homeLocation')?.value,
        name: document.getElementById('customerName')?.value,
        phone: document.getElementById('customerPhone')?.value,
        email: document.getElementById('customerEmail')?.value
    };
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.email) {
        showCalculatorNotification('Please fill in all contact information', 'error');
        return;
    }
    
    // Validate email format
    if (!isValidEmailCalculator(formData.email)) {
        showCalculatorNotification('Please enter a valid email address', 'error');
        document.getElementById('customerEmail').focus();
        return;
    }
    
    // Simulate form submission
    showCalculatorNotification('Thank you! We\'ll contact you within 24 hours with your personalized quote.', 'success');
    
    // Log form data (in a real app, this would be sent to a server)
    console.log('Calculator form submitted with data:', formData);
    
    // Reset form after delay
    setTimeout(() => {
        resetCalculatorForm();
    }, 3000);
}

function resetCalculatorForm() {
    currentCalculatorStep = 1;
    document.querySelectorAll('.calculator-step').forEach(step => step.classList.remove('active'));
    document.getElementById('step1').classList.add('active');
    updateCalculatorProgress();
    
    document.getElementById('calculatorForm').reset();
    document.getElementById('homeValueDisplay').textContent = '250,000';
    document.getElementById('estimatedPremium').textContent = '0';
}

function showCalculatorNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.calculator-notification');
    existingNotifications.forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `calculator-notification calculator-notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        if (window.innerWidth <= 768) {
            notification.classList.add('show');
        } else {
            notification.style.transform = 'translateX(0)';
        }
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (window.innerWidth <= 768) {
            notification.classList.remove('show');
        } else {
            notification.style.transform = 'translateX(100%)';
        }
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

function isValidEmailCalculator(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Reviews Carousel Functionality
let currentReviewIndex = 0;
let reviews = [];
let totalReviews = 0;

function showReview(index) {
    if (reviews.length === 0) return;
    
    // Hide all reviews
    reviews.forEach(review => review.style.display = 'none');
    
    // Show current review
    if (reviews[index]) {
        reviews[index].style.display = 'block';
    }
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextReview() {
    if (reviews.length === 0) return;
    currentReviewIndex = (currentReviewIndex + 1) % totalReviews;
    showReview(currentReviewIndex);
}

function previousReview() {
    if (reviews.length === 0) return;
    currentReviewIndex = (currentReviewIndex - 1 + totalReviews) % totalReviews;
    showReview(currentReviewIndex);
}

function currentReview(index) {
    if (reviews.length === 0) return;
    currentReviewIndex = index - 1;
    showReview(currentReviewIndex);
}

// Auto-rotate reviews every 5 seconds
function startReviewCarousel() {
    if (reviews.length > 1) {
        setInterval(nextReview, 5000);
    }
}

// Social Proof Animation
function updateRecentActivity() {
    const activities = [
        "James from Statesville just received a quote • 2 minutes ago",
        "Sarah from Elkin just purchased a policy • 5 minutes ago", 
        "Mike from Winston-Salem just filed a claim • 8 minutes ago",
        "Lisa from Greensboro just got a quote • 12 minutes ago",
        "David from Charlotte just renewed his policy • 15 minutes ago"
    ];
    
    const activityElement = document.querySelector('.recent-activity span:last-child');
    if (activityElement) {
        let activityIndex = 0;
        setInterval(() => {
            activityElement.textContent = activities[activityIndex];
            activityIndex = (activityIndex + 1) % activities.length;
        }, 8000);
    }
}

// Recent Saves Ticker
function updateRecentSaves() {
    const saves = [
        "Sarah from Winston-Salem saved $312/year",
        "Mike from Elkin saved $487/year",
        "The Johnson family saved $623/year", 
        "Lisa from Greensboro saved $259/year",
        "David from Charlotte saved $405/year",
        "The Smith family saved $531/year",
        "John from Statesville saved $378/year"
    ];
    
    const saveElement = document.querySelector('.recent-save-text');
    if (saveElement) {
        let saveIndex = 0;
        setInterval(() => {
            saveIndex = (saveIndex + 1) % saves.length;
            saveElement.style.opacity = '0';
            setTimeout(() => {
                saveElement.textContent = saves[saveIndex];
                saveElement.style.opacity = '1';
            }, 500);
        }, 10000);
    }
}

// Initialize carousel and social proof when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize calculator
    initializeCalculator();
    
    // Initialize reviews
    reviews = document.querySelectorAll('.review-card');
    totalReviews = reviews.length;
    
    // Show all reviews on desktop, use carousel on mobile
    if (window.innerWidth > 768 && reviews.length > 0) {
        // Show all reviews in grid on desktop
        reviews.forEach(review => review.style.display = 'block');
        // Hide carousel controls on desktop since we show all reviews
        const carouselControls = document.querySelector('.carousel-controls');
        if (carouselControls) {
            carouselControls.style.display = 'none';
        }
    } else if (reviews.length > 0) {
        // Show carousel on mobile
        showReview(0);
        startReviewCarousel();
    }
    
    updateRecentActivity();
    updateRecentSaves();
});

// Handle responsive behavior for reviews
window.addEventListener('resize', function() {
    const carouselControls = document.querySelector('.carousel-controls');
    
    if (window.innerWidth > 768) {
        // Show all reviews in grid on desktop
        reviews.forEach(review => review.style.display = 'block');
        if (carouselControls) {
            carouselControls.style.display = 'none';
        }
    } else if (reviews.length > 0) {
        // Show carousel on mobile
        showReview(currentReviewIndex);
        if (carouselControls) {
            carouselControls.style.display = 'flex';
        }
    }
});

// Smooth scroll enhancement for anchor links
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enhanced form submission tracking
function trackFormSubmission(formType, data) {
    // Log form submission for analytics
    console.log(`Form submitted: ${formType}`, data);
    
    // You could integrate with Google Analytics, Facebook Pixel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'form_type': formType,
            'value': 1
        });
    }
}

// Enhanced notification system with better positioning
function showEnhancedNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.enhanced-notification');
    existingNotifications.forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `enhanced-notification enhanced-notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px',
        borderRadius: '12px',
        color: 'white',
        fontWeight: '500',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '350px',
        minWidth: '300px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        fontSize: '14px',
        lineHeight: '1.4'
    });
    
    // Set background color based on type
    const colors = {
        success: 'linear-gradient(135deg, #28a745, #20c997)',
        error: 'linear-gradient(135deg, #dc3545, #e74c3c)',
        warning: 'linear-gradient(135deg, #ffc107, #f39c12)',
        info: 'linear-gradient(135deg, #17a2b8, #3498db)'
    };
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, duration);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// Make functions available globally for onclick handlers
window.nextCalculatorStep = nextCalculatorStep;
window.prevCalculatorStep = prevCalculatorStep;
window.nextReview = nextReview;
window.previousReview = previousReview;
window.currentReview = currentReview;
window.smoothScrollTo = smoothScrollTo;

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle
    };
}