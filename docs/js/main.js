// AI Time is Money - Static Demo JavaScript

// Global state
let currentBusinessType = 'sme';
let currentEmployeeCount = 5;

// Demo data for static version
const demoAIUseCases = [
    {
        category: 'Customer Service & Communication',
        priority: 'High Impact',
        tools: [
            {
                name: 'AI Chatbots & Virtual Assistants',
                description: '24/7 customer support, handles FAQs, basic queries, appointment scheduling',
                costSavings: '60-80% reduction in customer service costs',
                timeSavings: '24/7 availability, instant responses',
                monthlyROI: 2500,
                tools: ['Zendesk Answer Bot', 'Intercom Resolution Bot', 'Freshchat']
            }
        ]
    }
];

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCalculator();
    initializeForm();
    setupSmoothScrolling();
    showGitHubNotice();
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

// Update Calculator (Static Version)
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
    
    // Static calculations
    const baseROI = currentBusinessType === 'nonprofit' ? 800 : 1200;
    const multiplier = Math.min(currentEmployeeCount / 5, 10);
    
    const monthlyROI = Math.round(baseROI * multiplier);
    const threeMonthROI = Math.round(monthlyROI * 3 * 1.1);
    const yearlyROI = Math.round(monthlyROI * 12 * 1.2);
    
    const cost = currentBusinessType === 'nonprofit' ? 4.99 : 9.99;
    const vatRate = 0.2;
    const totalCost = cost * (1 + vatRate);
    const paybackTime = totalCost / monthlyROI * 30;
    
    updateCalculatorDisplay({
        savings: {
            oneMonth: monthlyROI,
            threeMonths: threeMonthROI,
            oneYear: yearlyROI
        },
        paybackTime: paybackTime
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

// Handle Form Submission (Static Version)
function handleFormSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Show demo message for static version
    const reportId = Math.random().toString(36).substr(2, 9);
    
    showSuccessMessage({
        reportId: reportId,
        message: 'This is a demo version hosted on GitHub Pages. For full functionality, please visit the live application.',
        estimatedTime: 'Demo only'
    });
}

// Show Success Message
function showSuccessMessage(result) {
    const modal = createModal(
        'Demo Submission Complete!',
        `
        <div class="success-message">
            <div class="success-icon">✅</div>
            <h3>Thank you for trying the demo!</h3>
            <p>${result.message}</p>
            <p><strong>Demo Report ID:</strong> ${result.reportId}</p>
            <div style="margin-top: 2rem;">
                <p>This is a static demo hosted on GitHub Pages. For full functionality including:</p>
                <ul style="text-align: left; margin: 1rem 0; color: #666;">
                    <li>Live ROI calculations with real-time API</li>
                    <li>Comprehensive AI assessment reports</li>
                    <li>Stripe payment integration</li>
                    <li>Email delivery system</li>
                    <li>Website audit features</li>
                </ul>
                <p>Please visit the full application:</p>
                <a href="https://github.com/MFangler1/AI-Time-is-money" class="btn btn-primary" target="_blank">
                    View Full Source Code
                </a>
            </div>
        </div>
        `
    );
    
    showModal(modal);
}

// Smooth Scrolling
function setupSmoothScrolling() {
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
    
    const businessTypeSelect = document.querySelector('[name="businessType"]');
    if (businessTypeSelect) {
        businessTypeSelect.value = type;
    }
    
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
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
        modalContent.style.transition = 'all 0.3s ease';
    }, 10);
    
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

// Show GitHub Notice
function showGitHubNotice() {
    setTimeout(() => {
        const notice = createModal(
            'GitHub Pages Demo',
            `
            <div style="text-align: center; padding: 1rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🚀</div>
                <h3>Welcome to the AI Time is Money Demo!</h3>
                <p>You're viewing a static demo version hosted on GitHub Pages.</p>
                <div style="background: #f8f9ff; padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0; text-align: left;">
                    <h4>Demo Features Available:</h4>
                    <ul style="color: #666; line-height: 1.8;">
                        <li>✅ Interactive ROI calculator</li>
                        <li>✅ Responsive design showcase</li>
                        <li>✅ Feature demonstrations</li>
                        <li>✅ Form interface preview</li>
                    </ul>
                    <h4>Full Version Features:</h4>
                    <ul style="color: #666; line-height: 1.8;">
                        <li>🔧 Live API integration</li>
                        <li>🔧 Payment processing</li>
                        <li>🔧 Report generation</li>
                        <li>🔧 Email notifications</li>
                    </ul>
                </div>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="https://github.com/MFangler1/AI-Time-is-money" class="btn btn-primary" target="_blank">
                        View Source Code
                    </a>
                    <button class="btn btn-secondary" onclick="closeModal()">
                        Explore Demo
                    </button>
                </div>
            </div>
            `
        );
        
        showModal(notice);
    }, 2000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDemo();
        closeModal();
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

// Console branding
console.log('%c🤖 AI Time is Money - GitHub Pages Demo', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cStatic demo version - Full source code: https://github.com/MFangler1/AI-Time-is-money', 'color: #764ba2; font-size: 12px;');