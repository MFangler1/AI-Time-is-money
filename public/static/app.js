// AI Time is Money - Interactive JavaScript

// Global state
let currentBusinessType = 'sme';
let currentEmployeeCount = 5;

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCalculator();
    initializeForm();
    setupSmoothScrolling();
});

// Initialize Calculator
function initializeCalculator() {
    const businessTypeSelect = document.getElementById('businessType');
    const employeeSlider = document.getElementById('employeeSlider');
    const employeeCount = document.getElementById('employeeCount');
    
    if (businessTypeSelect) {
        businessTypeSelect.addEventListener('change', updateCalculator);
    }
    
    if (employeeSlider) {
        employeeSlider.addEventListener('input', function() {
            currentEmployeeCount = parseInt(this.value);
            if (employeeCount) {
                employeeCount.textContent = currentEmployeeCount;
            }
            updateCalculator();
        });
    }
    
    // Initial calculation
    updateCalculator();
}

// Update Calculator
function updateCalculator() {
    const businessTypeSelect = document.getElementById('businessType');
    const employeeSlider = document.getElementById('employeeSlider');
    
    if (businessTypeSelect) {
        currentBusinessType = businessTypeSelect.value;
    }
    
    if (employeeSlider) {
        currentEmployeeCount = parseInt(employeeSlider.value);
        const employeeCount = document.getElementById('employeeCount');
        if (employeeCount) {
            employeeCount.textContent = currentEmployeeCount;
        }
    }
    
    // Fetch updated calculations
    fetch(`/api/calculate-savings?type=${currentBusinessType}&employees=${currentEmployeeCount}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateCalculatorDisplay(data.data);
            }
        })
        .catch(error => {
            console.error('Error calculating savings:', error);
        });
}

// Update Calculator Display
function updateCalculatorDisplay(data) {
    const oneMonthElement = document.getElementById('oneMonthSaving');
    const threeMonthElement = document.getElementById('threeMonthSaving');
    const oneYearElement = document.getElementById('oneYearSaving');
    const paybackTimeElement = document.getElementById('paybackTime');
    
    if (oneMonthElement) {
        oneMonthElement.textContent = `£${data.savings.oneMonth.toLocaleString()}`;
    }
    
    if (threeMonthElement) {
        threeMonthElement.textContent = `£${data.savings.threeMonths.toLocaleString()}`;
    }
    
    if (oneYearElement) {
        oneYearElement.textContent = `£${data.savings.oneYear.toLocaleString()}`;
    }
    
    if (paybackTimeElement) {
        const days = Math.ceil(data.paybackTime);
        paybackTimeElement.textContent = days < 1 ? '< 1 day' : `${days} days`;
    }
}

// Initialize Form
function initializeForm() {
    const assessmentForm = document.getElementById('assessmentForm');
    
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', handleFormSubmission);
    }
}

// Handle Form Submission
function handleFormSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Add business type from calculator if not set
    if (!data.businessType) {
        data.businessType = currentBusinessType;
    }
    
    // Show loading state
    const submitButton = event.target.querySelector('.btn-submit');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    
    // Submit assessment
    fetch('/api/assessment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // In a real app, redirect to payment or show success
            showSuccessMessage(result);
        } else {
            showErrorMessage('There was an error processing your assessment. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error submitting assessment:', error);
        showErrorMessage('Network error. Please check your connection and try again.');
    })
    .finally(() => {
        // Restore button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

// Show Success Message
function showSuccessMessage(result) {
    const modal = createModal(
        'Assessment Submitted Successfully!',
        `
        <div class="success-message">
            <div class="success-icon">✅</div>
            <h3>Thank you for your submission!</h3>
            <p>Your assessment has been received and your comprehensive AI report is being generated.</p>
            <p><strong>Report ID:</strong> ${result.reportId}</p>
            <p><strong>Estimated Time:</strong> ${result.estimatedTime}</p>
            <div style="margin-top: 2rem;">
                <p>To complete your purchase and receive your full report, you'll be redirected to our secure payment page.</p>
                <button class="btn-submit" onclick="proceedToPayment('${result.reportId}')">
                    Proceed to Payment - £${currentBusinessType === 'nonprofit' ? '4.99' : '9.99'}
                </button>
            </div>
        </div>
        `
    );
    
    showModal(modal);
}

// Show Error Message
function showErrorMessage(message) {
    const modal = createModal(
        'Error',
        `
        <div class="error-message">
            <div class="error-icon">❌</div>
            <p>${message}</p>
            <button class="btn-submit" onclick="closeModal()">Try Again</button>
        </div>
        `
    );
    
    showModal(modal);
}

// Smooth Scrolling
function setupSmoothScrolling() {
    // Smooth scroll for navigation links
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
}

// Scroll to Assessment
function scrollToAssessment() {
    const assessmentSection = document.getElementById('assessment');
    if (assessmentSection) {
        assessmentSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Start Assessment with Type
function startAssessment(type) {
    currentBusinessType = type;
    
    // Update form if visible
    const businessTypeSelect = document.querySelector('[name="businessType"]');
    if (businessTypeSelect) {
        businessTypeSelect.value = type;
    }
    
    // Update calculator
    const calculatorSelect = document.getElementById('businessType');
    if (calculatorSelect) {
        calculatorSelect.value = type;
        updateCalculator();
    }
    
    scrollToAssessment();
}

// Show Demo
function showDemo() {
    const demoModal = document.getElementById('demoModal');
    if (demoModal) {
        demoModal.style.display = 'block';
        
        // Add animation
        const modalContent = demoModal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
            modalContent.style.transition = 'all 0.3s ease';
        }, 10);
    }
}

// Close Demo
function closeDemo() {
    const demoModal = document.getElementById('demoModal');
    if (demoModal) {
        demoModal.style.display = 'none';
    }
}

// Create Modal
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2>${title}</h2>
            ${content}
        </div>
    `;
    
    return modal;
}

// Show Modal
function showModal(modal) {
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Add animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
        modalContent.style.transition = 'all 0.3s ease';
    }, 10);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close Modal
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (modal.style.display !== 'none') {
            modal.style.display = 'none';
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }
    });
}

// Proceed to Payment (placeholder)
function proceedToPayment(reportId) {
    // In a real application, this would integrate with Stripe
    const price = currentBusinessType === 'nonprofit' ? 4.99 : 9.99;
    const vat = price * 0.2;
    const total = price + vat;
    
    alert(`Payment Integration Coming Soon!\n\nReport ID: ${reportId}\nSubtotal: £${price.toFixed(2)}\nVAT (20%): £${vat.toFixed(2)}\nTotal: £${total.toFixed(2)}\n\nThis will integrate with Stripe for secure payment processing.`);
    
    closeModal();
}

// Load AI Use Cases
function loadAIUseCases() {
    fetch('/api/ai-use-cases')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('AI Use Cases loaded:', data.data);
                // Could be used to populate dynamic content
            }
        })
        .catch(error => {
            console.error('Error loading AI use cases:', error);
        });
}

// Matrix Animation (Enhanced)
function initMatrixAnimation() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.insertBefore(canvas, document.body.firstChild);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
    const letterArray = letters.split('');
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff9f';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = letterArray[Math.floor(Math.random() * letterArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    // Resize handler
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize matrix animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment the line below to enable matrix animation
    // initMatrixAnimation();
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modals
    if (e.key === 'Escape') {
        closeDemo();
        closeModal();
    }
    
    // Enter to submit form if focused
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'submit') {
        const form = e.target.closest('form');
        if (form) {
            const submitButton = form.querySelector('[type="submit"]');
            if (submitButton) {
                submitButton.click();
            }
        }
    }
});

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .calculator-container, .assessment-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Performance monitoring
let performanceMetrics = {
    loadTime: 0,
    apiCalls: 0,
    errors: 0
};

window.addEventListener('load', function() {
    performanceMetrics.loadTime = performance.now();
    console.log(`Page loaded in ${performanceMetrics.loadTime.toFixed(2)}ms`);
});

// Error tracking
window.addEventListener('error', function(e) {
    performanceMetrics.errors++;
    console.error('JavaScript error:', e.error);
});

// Console branding
console.log('%c🤖 AI Time is Money - Powered by AiConsultancy.org.uk', 'color: #00ff9f; font-size: 16px; font-weight: bold;');
console.log('%cMaking AI accessible to SMEs, solopreneurs, and non-profits worldwide', 'color: #0066cc; font-size: 12px;');