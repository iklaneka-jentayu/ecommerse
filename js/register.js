// Registration Page Specific JavaScript

// Initialize registration page
document.addEventListener('DOMContentLoaded', function() {
    initializeRegistrationPage();
});

function initializeRegistrationPage() {
    // Check if we're on the registration page
    if (!window.location.pathname.includes('register.html')) {
        return;
    }
    
    // Initialize registration form enhancements
    initRegistrationFormEnhancements();
    
    // Add registration page specific event listeners
    addRegistrationPageEventListeners();
    
    // Initialize password strength indicator
    initPasswordStrengthIndicator();
    
    // Add registration page styles
    addRegistrationPageStyles();
    
    // Check for referral code
    checkReferralCode();
}

function initRegistrationFormEnhancements() {
    const form = document.getElementById('registerForm');
    if (!form) return;
    
    // Add real-time validation
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateRegistrationField);
        input.addEventListener('input', clearRegistrationFieldError);
    });
    
    // Add password confirmation validation
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (passwordInput && confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            validatePasswordConfirmation();
        });
    }
    
    // Add terms agreement validation
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', function() {
            validateTermsAgreement();
        });
    }
}

function addRegistrationPageEventListeners() {
    // Add animation to form inputs
    const formInputs = document.querySelectorAll('.auth-form input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const registerForm = document.getElementById('registerForm');
            if (registerForm) {
                registerForm.dispatchEvent(new Event('submit'));
            }
        }
    });
    
    // Add visual feedback for form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function() {
            // Add submission animation
            this.classList.add('submitting');
            
            // Remove animation class after submission
            setTimeout(() => {
                this.classList.remove('submitting');
            }, 1500);
        });
    }
}

function validateRegistrationField() {
    const field = this;
    const value = field.value.trim();
    
    switch (field.id) {
        case 'fullName':
            validateNameField(field, value);
            break;
        case 'email':
            validateEmailFieldRegistration(field, value);
            break;
        case 'phone':
            validatePhoneField(field, value);
            break;
        case 'password':
            validatePasswordField(field, value);
            break;
        case 'confirmPassword':
            validatePasswordConfirmation();
            break;
    }
}

function validateNameField(field, value) {
    if (!value) {
        showRegistrationFieldError(field, 'Full name is required');
        return false;
    }
    
    if (value.length < 2) {
        showRegistrationFieldError(field, 'Name must be at least 2 characters');
        return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(value)) {
        showRegistrationFieldError(field, 'Name can only contain letters and spaces');
        return false;
    }
    
    showRegistrationFieldSuccess(field);
    return true;
}

function validateEmailFieldRegistration(field, value) {
    if (!value) {
        showRegistrationFieldError(field, 'Email is required');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        showRegistrationFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    // Check for common disposable email domains
    const disposableDomains = ['tempmail.com', 'guerrillamail.com', 'mailinator.com'];
    const domain = value.split('@')[1];
    if (disposableDomains.includes(domain)) {
        showRegistrationFieldError(field, 'Please use a permanent email address');
        return false;
    }
    
    showRegistrationFieldSuccess(field);
    return true;
}

function validatePhoneField(field, value) {
    if (!value) {
        showRegistrationFieldError(field, 'Phone number is required');
        return false;
    }
    
    // Remove all non-digits for validation
    const digitsOnly = value.replace(/\D/g, '');
    
    if (digitsOnly.length < 10) {
        showRegistrationFieldError(field, 'Phone number must be at least 10 digits');
        return false;
    }
    
    if (!/^[+]?[\d\s\-\(\)]+$/.test(value)) {
        showRegistrationFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    showRegistrationFieldSuccess(field);
    return true;
}

function validatePasswordField(field, value) {
    if (!value) {
        showRegistrationFieldError(field, 'Password is required');
        return false;
    }
    
    const requirements = {
        length: value.length >= 6,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        special: /[^A-Za-z0-9]/.test(value)
    };
    
    let errorMessage = '';
    
    if (!requirements.length) {
        errorMessage = 'Password must be at least 6 characters';
    } else if (!requirements.uppercase) {
        errorMessage = 'Password must contain at least one uppercase letter';
    } else if (!requirements.lowercase) {
        errorMessage = 'Password must contain at least one lowercase letter';
    } else if (!requirements.number) {
        errorMessage = 'Password must contain at least one number';
    } else if (!requirements.special) {
        errorMessage = 'Password must contain at least one special character';
    }
    
    if (errorMessage) {
        showRegistrationFieldError(field, errorMessage);
        return false;
    }
    
    showRegistrationFieldSuccess(field);
    return true;
}

function validatePasswordConfirmation() {
    const passwordField = document.getElementById('password');
    const confirmField = document.getElementById('confirmPassword');
    
    if (!passwordField || !confirmField) return;
    
    const password = passwordField.value;
    const confirmation = confirmField.value;
    
    if (!confirmation) {
        showRegistrationFieldError(confirmField, 'Please confirm your password');
        return false;
    }
    
    if (password !== confirmation) {
        showRegistrationFieldError(confirmField, 'Passwords do not match');
        return false;
    }
    
    showRegistrationFieldSuccess(confirmField);
    return true;
}

function validateTermsAgreement() {
    const termsField = document.getElementById('terms');
    if (!termsField) return;
    
    if (!termsField.checked) {
        showRegistrationFieldError(termsField, 'You must accept the terms and conditions');
        return false;
    }
    
    showRegistrationFieldSuccess(termsField);
    return true;
}

function showRegistrationFieldError(field, message) {
    const parent = field.closest('.form-group');
    
    // Add error class
    field.classList.add('error');
    field.classList.remove('success');
    
    // Add or update error message
    let errorElement = parent.querySelector('.registration-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'registration-error text-sm text-red-600 mt-1';
        parent.appendChild(errorElement);
    }
    errorElement.textContent = message;
    
    // Add error icon
    let errorIcon = parent.querySelector('.field-error-icon');
    if (!errorIcon && field.type !== 'checkbox') {
        errorIcon = document.createElement('span');
        errorIcon.className = 'field-error-icon absolute right-3 top-1/2 transform -translate-y-1/2';
        errorIcon.innerHTML = '<i class="fas fa-exclamation-circle text-red-500"></i>';
        
        const inputContainer = field.closest('.input-with-icon');
        if (inputContainer) {
            inputContainer.appendChild(errorIcon);
        }
    }
    
    // Remove success icon if exists
    const successIcon = parent.querySelector('.field-success-icon');
    if (successIcon) {
        successIcon.remove();
    }
}

function showRegistrationFieldSuccess(field) {
    const parent = field.closest('.form-group');
    
    // Add success class
    field.classList.add('success');
    field.classList.remove('error');
    
    // Remove error message
    const errorElement = parent.querySelector('.registration-error');
    if (errorElement) {
        errorElement.remove();
    }
    
    // Remove error icon
    const errorIcon = parent.querySelector('.field-error-icon');
    if (errorIcon) {
        errorIcon.remove();
    }
    
    // Add success icon
    if (field.type !== 'checkbox') {
        let successIcon = parent.querySelector('.field-success-icon');
        if (!successIcon) {
            successIcon = document.createElement('span');
            successIcon.className = 'field-success-icon absolute right-3 top-1/2 transform -translate-y-1/2';
            successIcon.innerHTML = '<i class="fas fa-check-circle text-green-500"></i>';
            
            const inputContainer = field.closest('.input-with-icon');
            if (inputContainer) {
                inputContainer.appendChild(successIcon);
            }
        }
    }
}

function clearRegistrationFieldError() {
    const field = this;
    const parent = field.closest('.form-group');
    
    // Remove error class
    field.classList.remove('error');
    
    // Remove error message
    const errorElement = parent.querySelector('.registration-error');
    if (errorElement) {
        errorElement.remove();
    }
    
    // Remove error icon
    const errorIcon = parent.querySelector('.field-error-icon');
    if (errorIcon) {
        errorIcon.remove();
    }
    
    // Remove success icon
    const successIcon = parent.querySelector('.field-success-icon');
    if (successIcon) {
        successIcon.remove();
    }
}

function initPasswordStrengthIndicator() {
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return;
    
    // Create strength indicator container
    const strengthContainer = document.createElement('div');
    strengthContainer.className = 'password-strength-container mt-2';
    strengthContainer.innerHTML = `
        <div class="strength-visual mb-2">
            <div class="strength-bars flex gap-1">
                <div class="strength-bar w-1/5 h-2 bg-gray-200 rounded"></div>
                <div class="strength-bar w-1/5 h-2 bg-gray-200 rounded"></div>
                <div class="strength-bar w-1/5 h-2 bg-gray-200 rounded"></div>
                <div class="strength-bar w-1/5 h-2 bg-gray-200 rounded"></div>
                <div class="strength-bar w-1/5 h-2 bg-gray-200 rounded"></div>
            </div>
            <div class="strength-label text-xs mt-1 font-medium"></div>
        </div>
        <div class="requirements-list text-xs space-y-1">
            <div class="requirement flex items-center" data-type="length">
                <i class="fas fa-circle text-gray-300 mr-2"></i>
                <span>At least 6 characters</span>
            </div>
            <div class="requirement flex items-center" data-type="uppercase">
                <i class="fas fa-circle text-gray-300 mr-2"></i>
                <span>One uppercase letter</span>
            </div>
            <div class="requirement flex items-center" data-type="lowercase">
                <i class="fas fa-circle text-gray-300 mr-2"></i>
                <span>One lowercase letter</span>
            </div>
            <div class="requirement flex items-center" data-type="number">
                <i class="fas fa-circle text-gray-300 mr-2"></i>
                <span>One number</span>
            </div>
            <div class="requirement flex items-center" data-type="special">
                <i class="fas fa-circle text-gray-300 mr-2"></i>
                <span>One special character</span>
            </div>
        </div>
    `;
    
    passwordInput.parentNode.appendChild(strengthContainer);
    
    // Update on input
    passwordInput.addEventListener('input', updatePasswordStrength);
}

function updatePasswordStrength() {
    const password = this.value;
    const bars = document.querySelectorAll('.strength-bar');
    const label = document.querySelector('.strength-label');
    const requirements = document.querySelectorAll('.requirement');
    
    if (!bars.length || !label) return;
    
    // Check requirements
    const checks = {
        length: password.length >= 6,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };
    
    // Count fulfilled requirements
    const fulfilled = Object.values(checks).filter(Boolean).length;
    
    // Update bars
    bars.forEach((bar, index) => {
        if (index < fulfilled) {
            let color;
            switch (fulfilled) {
                case 1:
                case 2:
                    color = '#ef4444'; // red
                    break;
                case 3:
                    color = '#f59e0b'; // amber
                    break;
                case 4:
                    color = '#10b981'; // green
                    break;
                case 5:
                    color = '#059669'; // emerald
                    break;
                default:
                    color = '#e5e7eb'; // gray
            }
            bar.style.backgroundColor = color;
        } else {
            bar.style.backgroundColor = '#e5e7eb';
        }
    });
    
    // Update label
    let strengthText = 'Very Weak';
    let textColor = '#ef4444';
    
    switch (fulfilled) {
        case 0:
        case 1:
            strengthText = 'Very Weak';
            textColor = '#ef4444';
            break;
        case 2:
            strengthText = 'Weak';
            textColor = '#f59e0b';
            break;
        case 3:
            strengthText = 'Fair';
            textColor = '#f59e0b';
            break;
        case 4:
            strengthText = 'Good';
            textColor = '#10b981';
            break;
        case 5:
            strengthText = 'Strong';
            textColor = '#059669';
            break;
    }
    
    label.textContent = `Strength: ${strengthText}`;
    label.style.color = textColor;
    
    // Update requirement icons
    requirements.forEach(req => {
        const type = req.getAttribute('data-type');
        const icon = req.querySelector('i');
        
        if (checks[type]) {
            icon.className = 'fas fa-check-circle text-green-500 mr-2';
            req.style.color = '#059669';
        } else {
            icon.className = 'fas fa-circle text-gray-300 mr-2';
            req.style.color = '#6b7280';
        }
    });
}

function checkReferralCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref');
    
    if (referralCode) {
        // Store referral code for registration
        sessionStorage.setItem('referralCode', referralCode);
        
        // Show referral message
        const authHeader = document.querySelector('.auth-header');
        if (authHeader) {
            const referralMessage = document.createElement('div');
            referralMessage.className = 'referral-message mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700';
            referralMessage.innerHTML = `
                <i class="fas fa-gift mr-1"></i>
                You were referred by a friend! Enjoy special welcome benefits.
            `;
            authHeader.appendChild(referralMessage);
        }
        
        // Log referral click
        logToSheet('REFERRAL_CLICK', `Referral code clicked: ${referralCode}`);
    }
}

function addRegistrationPageStyles() {
    const styles = `
        /* Registration page specific styles */
        .registration-error {
            animation: fadeIn 0.3s ease;
        }
        
        .field-error-icon, .field-success-icon {
            font-size: 1rem;
            pointer-events: none;
        }
        
        /* Password strength indicator */
        .password-strength-container {
            animation: slideDown 0.3s ease;
        }
        
        .strength-bar {
            transition: background-color 0.3s ease;
        }
        
        /* Referral message */
        .referral-message {
            animation: fadeInUp 0.5s ease;
        }
        
        /* Terms and conditions styling */
        .terms-agreement label,
        .marketing-consent label {
            cursor: pointer;
            user-select: none;
        }
        
        .terms-agreement a,
        .marketing-consent a {
            text-decoration: underline;
            transition: color 0.3s ease;
        }
        
        .terms-agreement a:hover,
        .marketing-consent a:hover {
            color: #1d4ed8;
        }
        
        /* Phone input formatting */
        #phone {
            font-family: monospace;
            letter-spacing: 1px;
        }
        
        /* Success modal */
        .success-icon {
            animation: scaleIn 0.5s ease;
        }
        
        @keyframes scaleIn {
            from { transform: scale(0); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        /* Registration form animations */
        .auth-form .form-group {
            animation: fadeInUp 0.5s ease;
        }
        
        .auth-form .form-group:nth-child(1) { animation-delay: 0.1s; }
        .auth-form .form-group:nth-child(2) { animation-delay: 0.2s; }
        .auth-form .form-group:nth-child(3) { animation-delay: 0.3s; }
        .auth-form .form-group:nth-child(4) { animation-delay: 0.4s; }
        .auth-form .form-group:nth-child(5) { animation-delay: 0.5s; }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
            .password-strength-container {
                font-size: 0.75rem;
            }
            
            .requirements-list {
                font-size: 0.7rem;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Enhanced registration validation
function validateRegistrationFormEnhanced() {
    let isValid = true;
    
    // Validate all fields
    const fields = [
        { id: 'fullName', validator: validateNameField },
        { id: 'email', validator: validateEmailFieldRegistration },
        { id: 'phone', validator: validatePhoneField },
        { id: 'password', validator: validatePasswordField },
        { id: 'confirmPassword', validator: validatePasswordConfirmation },
        { id: 'terms', validator: validateTermsAgreement }
    ];
    
    fields.forEach(({ id, validator }) => {
        const field = document.getElementById(id);
        if (field) {
            const value = field.type === 'checkbox' ? field.checked : field.value.trim();
            const fieldIsValid = validator(field, value);
            if (!fieldIsValid) {
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateRegistrationFormEnhanced,
        updatePasswordStrength,
        checkReferralCode,
        initializeRegistrationPage
    };
}