// Payment Module for GlobalMart - Toyib Pay Integration

const PAYMENT_CONFIG = {
    TOYIBPAY_API_URL: 'https://api.toyibpay.com/v1', // Replace with actual Toyib Pay API URL
    MERCHANT_ID: 'YOUR_MERCHANT_ID',
    API_KEY: 'YOUR_API_KEY',
    CURRENCY: 'MYR',
    SUCCESS_REDIRECT: 'order-success.html',
    FAILURE_REDIRECT: 'order-failed.html',
    WEBHOOK_URL: 'YOUR_WEBHOOK_ENDPOINT'
};

// Initialize payment module
document.addEventListener('DOMContentLoaded', function() {
    initializePaymentModule();
});

function initializePaymentModule() {
    // Check if we're on a payment-related page
    const isCheckoutPage = window.location.pathname.includes('checkout.html');
    const isPaymentPage = window.location.pathname.includes('payment.html');
    
    if (isCheckoutPage) {
        initCheckoutPage();
    }
    
    if (isPaymentPage) {
        initPaymentPage();
    }
    
    // Initialize payment methods
    initPaymentMethods();
    
    // Listen for payment status updates
    listenForPaymentStatus();
}

// Initialize checkout page
function initCheckoutPage() {
    const checkoutForm = document.getElementById('checkoutForm');
    if (!checkoutForm) return;
    
    // Load saved addresses
    loadSavedAddresses();
    
    // Initialize address validation
    initAddressValidation();
    
    // Initialize payment method selection
    initPaymentMethodSelection();
    
    // Handle form submission
    checkoutForm.addEventListener('submit', handleCheckoutSubmission);
}

// Initialize payment page
function initPaymentPage() {
    const paymentForm = document.getElementById('paymentForm');
    if (!paymentForm) return;
    
    // Load order summary
    loadOrderSummary();
    
    // Initialize payment form
    initPaymentForm();
    
    // Handle payment submission
    paymentForm.addEventListener('submit', handlePaymentSubmission);
}

// Initialize payment methods
function initPaymentMethods() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            updatePaymentMethodUI(this.value);
            savePaymentMethod(this.value);
        });
    });
    
    // Load saved payment method
    const savedMethod = localStorage.getItem('preferredPaymentMethod') || 'toyibpay';
    document.querySelector(`input[value="${savedMethod}"]`)?.click();
}

// Update UI based on selected payment method
function updatePaymentMethodUI(method) {
    // Hide all payment method details
    document.querySelectorAll('.payment-method-details').forEach(el => {
        el.style.display = 'none';
    });
    
    // Show selected payment method details
    const detailsElement = document.getElementById(`${method}Details`);
    if (detailsElement) {
        detailsElement.style.display = 'block';
    }
    
    // Update button text
    const submitButton = document.querySelector('#checkoutForm button[type="submit"]');
    if (submitButton) {
        switch (method) {
            case 'toyibpay':
                submitButton.innerHTML = '<i class="fas fa-credit-card"></i> Pay with Toyib Pay';
                break;
            case 'card':
                submitButton.innerHTML = '<i class="fas fa-credit-card"></i> Pay with Credit Card';
                break;
            case 'bank':
                submitButton.innerHTML = '<i class="fas fa-university"></i> Proceed to Bank Transfer';
                break;
            case 'cod':
                submitButton.innerHTML = '<i class="fas fa-money-bill-wave"></i> Place Order (Cash on Delivery)';
                break;
        }
    }
}

// Save payment method preference
function savePaymentMethod(method) {
    localStorage.setItem('preferredPaymentMethod', method);
}

// Load saved addresses
function loadSavedAddresses() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    
    // Load saved addresses from user data or API
    const savedAddresses = user.savedAddresses || [];
    
    if (savedAddresses.length > 0) {
        const addressSelect = document.getElementById('savedAddresses');
        if (addressSelect) {
            // Populate address selection
            savedAddresses.forEach((address, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${address.name} - ${address.address.substring(0, 30)}...`;
                addressSelect.appendChild(option);
            });
            
            // Add change listener
            addressSelect.addEventListener('change', function() {
                const selectedAddress = savedAddresses[this.value];
                if (selectedAddress) {
                    populateAddressFields(selectedAddress);
                }
            });
        }
    }
}

// Populate address fields
function populateAddressFields(address) {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip', 'country'];
    
    fields.forEach(field => {
        const element = document.getElementById(`billing${field.charAt(0).toUpperCase() + field.slice(1)}`);
        if (element && address[field]) {
            element.value = address[field];
        }
    });
}

// Initialize address validation
function initAddressValidation() {
    const addressFields = document.querySelectorAll('.address-field');
    
    addressFields.forEach(field => {
        field.addEventListener('blur', validateAddressField);
    });
}

// Validate address field
function validateAddressField() {
    const field = this;
    const value = field.value.trim();
    const fieldId = field.id;
    
    let isValid = true;
    let message = '';
    
    switch (fieldId) {
        case 'billingFirstName':
        case 'billingLastName':
            if (!value) {
                message = 'This field is required';
                isValid = false;
            } else if (value.length < 2) {
                message = 'Must be at least 2 characters';
                isValid = false;
            }
            break;
            
        case 'billingEmail':
            if (!value) {
                message = 'Email is required';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                message = 'Invalid email address';
                isValid = false;
            }
            break;
            
        case 'billingPhone':
            if (!value) {
                message = 'Phone number is required';
                isValid = false;
            } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
                message = 'Invalid phone number';
                isValid = false;
            }
            break;
            
        case 'billingAddress':
            if (!value) {
                message = 'Address is required';
                isValid = false;
            } else if (value.length < 10) {
                message = 'Please enter a complete address';
                isValid = false;
            }
            break;
            
        case 'billingCity':
        case 'billingState':
            if (!value) {
                message = 'This field is required';
                isValid = false;
            }
            break;
            
        case 'billingZip':
            if (!value) {
                message = 'ZIP code is required';
                isValid = false;
            } else if (!/^\d{5}(-\d{4})?$/.test(value)) {
                message = 'Invalid ZIP code';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, message);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    const parent = field.closest('.form-group');
    field.classList.add('error');
    
    // Remove existing error
    const existingError = parent.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error text-sm text-red-600 mt-1';
    errorElement.textContent = message;
    parent.appendChild(errorElement);
}

// Clear field error
function clearFieldError(field) {
    const parent = field.closest('.form-group');
    field.classList.remove('error');
    
    const errorElement = parent.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Initialize payment method selection
function initPaymentMethodSelection() {
    const sameAsBilling = document.getElementById('sameAsShipping');
    if (sameAsBilling) {
        sameAsBilling.addEventListener('change', function() {
            const shippingFields = document.getElementById('shippingFields');
            if (shippingFields) {
                shippingFields.style.display = this.checked ? 'none' : 'block';
                
                if (this.checked) {
                    // Copy billing to shipping
                    copyBillingToShipping();
                }
            }
        });
    }
}

// Copy billing address to shipping
function copyBillingToShipping() {
    const billingFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip', 'country'];
    
    billingFields.forEach(field => {
        const billingField = document.getElementById(`billing${field.charAt(0).toUpperCase() + field.slice(1)}`);
        const shippingField = document.getElementById(`shipping${field.charAt(0).toUpperCase() + field.slice(1)}`);
        
        if (billingField && shippingField) {
            shippingField.value = billingField.value;
        }
    });
}

// Handle checkout submission
async function handleCheckoutSubmission(e) {
    e.preventDefault();
    
    // Validate all fields
    const isValid = validateCheckoutForm();
    if (!isValid) {
        showNotification('Please fix the errors in the form', 'error');
        return;
    }
    
    // Get form data
    const formData = getFormData(e.target);
    
    // Get cart data
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    // Calculate totals
    const totals = calculateOrderTotals(cart);
    
    // Create order object
    const order = {
        ...formData,
        items: cart,
        totals: totals,
        paymentMethod: formData.paymentMethod,
        orderDate: new Date().toISOString(),
        status: 'pending',
        orderNumber: generateOrderNumber()
    };
    
    // Save order to session storage
    sessionStorage.setItem('currentOrder', JSON.stringify(order));
    
    // Redirect based on payment method
    switch (formData.paymentMethod) {
        case 'toyibpay':
            await processToyibPayPayment(order);
            break;
        case 'card':
            window.location.href = 'payment.html?method=card';
            break;
        case 'bank':
            window.location.href = 'payment.html?method=bank';
            break;
        case 'cod':
            await processCODOrder(order);
            break;
        default:
            showNotification('Please select a payment method', 'error');
    }
}

// Validate checkout form
function validateCheckoutForm() {
    let isValid = true;
    
    const requiredFields = [
        'billingFirstName', 'billingLastName', 'billingEmail',
        'billingPhone', 'billingAddress', 'billingCity',
        'billingState', 'billingZip', 'billingCountry'
    ];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (field) {
            validateAddressField.call(field);
        }
    });
    
    // Check payment method
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentMethod) {
        showNotification('Please select a payment method', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Get form data
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

// Calculate order totals
function calculateOrderTotals(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.06; // 6% tax
    const shipping = subtotal >= 100 ? 0 : 10; // Free shipping over RM100
    const total = subtotal + tax + shipping;
    
    return {
        subtotal: parseFloat(subtotal.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)),
        total: parseFloat(total.toFixed(2))
    };
}

// Generate order number
function generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
}

// Process Toyib Pay payment
async function processToyibPayPayment(order) {
    try {
        showLoading('Processing payment with Toyib Pay...');
        
        // In production, this would call the actual Toyib Pay API
        // For demo purposes, we'll simulate the API call
        
        const paymentData = {
            merchant_id: PAYMENT_CONFIG.MERCHANT_ID,
            amount: order.totals.total,
            currency: PAYMENT_CONFIG.CURRENCY,
            order_id: order.orderNumber,
            customer_email: order.billingEmail,
            customer_name: `${order.billingFirstName} ${order.billingLastName}`,
            customer_phone: order.billingPhone,
            return_url: window.location.origin + '/' + PAYMENT_CONFIG.SUCCESS_REDIRECT,
            callback_url: PAYMENT_CONFIG.WEBHOOK_URL,
            description: `Order ${order.orderNumber} - GlobalMart`,
            metadata: {
                order_details: JSON.stringify(order)
            }
        };
        
        // Simulate API call
        await simulateToyibPayApiCall(paymentData);
        
        // For demo, simulate successful payment
        const paymentResult = {
            success: true,
            payment_id: 'TYP' + Date.now(),
            status: 'completed',
            amount: order.totals.total,
            currency: PAYMENT_CONFIG.CURRENCY,
            timestamp: new Date().toISOString()
        };
        
        // Process payment result
        await handlePaymentResult(paymentResult, order);
        
    } catch (error) {
        console.error('Toyib Pay payment error:', error);
        showNotification('Payment processing failed. Please try again.', 'error');
        hideLoading();
    }
}

// Simulate Toyib Pay API call
async function simulateToyibPayApiCall(paymentData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate API response
            resolve({
                success: true,
                payment_url: `https://payment.toyibpay.com/pay/${paymentData.order_id}`,
                payment_id: 'TYP' + Date.now()
            });
        }, 2000);
    });
}

// Process COD order
async function processCODOrder(order) {
    try {
        showLoading('Placing your order...');
        
        // Save order
        const saved = await saveOrderToDatabase(order);
        
        if (saved) {
            // Clear cart
            localStorage.removeItem('cart');
            
            // Redirect to success page
            setTimeout(() => {
                window.location.href = `order-success.html?order=${order.orderNumber}`;
            }, 1500);
        }
        
    } catch (error) {
        console.error('COD order error:', error);
        showNotification('Failed to place order. Please try again.', 'error');
        hideLoading();
    }
}

// Handle payment result
async function handlePaymentResult(paymentResult, order) {
    try {
        // Update order with payment details
        order.payment = {
            method: 'toyibpay',
            transactionId: paymentResult.payment_id,
            status: paymentResult.status,
            amount: paymentResult.amount,
            currency: paymentResult.currency,
            timestamp: paymentResult.timestamp
        };
        
        order.status = paymentResult.status === 'completed' ? 'processing' : 'pending';
        
        // Save order
        const saved = await saveOrderToDatabase(order);
        
        if (saved) {
            // Clear cart
            localStorage.removeItem('cart');
            
            // Show success message
            showNotification('Payment successful! Order placed.', 'success');
            
            // Redirect to success page
            setTimeout(() => {
                window.location.href = `order-success.html?order=${order.orderNumber}`;
            }, 1500);
        }
        
    } catch (error) {
        console.error('Error handling payment result:', error);
        showNotification('Error processing payment result', 'error');
        hideLoading();
    }
}

// Save order to database (Google Sheets)
async function saveOrderToDatabase(order) {
    try {
        // Prepare order data for Google Sheets
        const orderData = {
            orderNumber: order.orderNumber,
            customerName: `${order.billingFirstName} ${order.billingLastName}`,
            customerEmail: order.billingEmail,
            customerPhone: order.billingPhone,
            shippingAddress: `${order.billingAddress}, ${order.billingCity}, ${order.billingState} ${order.billingZip}, ${order.billingCountry}`,
            items: JSON.stringify(order.items),
            subtotal: order.totals.subtotal,
            tax: order.totals.tax,
            shipping: order.totals.shipping,
            total: order.totals.total,
            paymentMethod: order.paymentMethod,
            paymentStatus: order.payment?.status || 'pending',
            orderStatus: order.status,
            orderDate: order.orderDate,
            notes: order.notes || ''
        };
        
        // Save to Google Sheets
        const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL/saveOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
            const result = await response.json();
            
            // Log order creation
            logToSheet('ORDER_CREATE', `Order ${order.orderNumber} created`, order.customerEmail);
            
            return result.success;
        }
        
        throw new Error('Failed to save order');
        
    } catch (error) {
        console.error('Error saving order:', error);
        throw error;
    }
}

// Load order summary on payment page
function loadOrderSummary() {
    const order = JSON.parse(sessionStorage.getItem('currentOrder'));
    if (!order) {
        window.location.href = 'cart.html';
        return;
    }
    
    // Display order summary
    const summaryElement = document.getElementById('orderSummary');
    if (summaryElement) {
        summaryElement.innerHTML = `
            <div class="order-summary-details">
                <h4 class="font-semibold mb-3">Order Summary</h4>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span>Order Number:</span>
                        <span class="font-semibold">${order.orderNumber}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Items:</span>
                        <span>${order.items.length} items</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Subtotal:</span>
                        <span>RM ${order.totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Tax:</span>
                        <span>RM ${order.totals.tax.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Shipping:</span>
                        <span>${order.totals.shipping === 0 ? 'FREE' : `RM ${order.totals.shipping.toFixed(2)}`}</span>
                    </div>
                    <div class="flex justify-between border-t pt-2 mt-2">
                        <span class="font-semibold">Total:</span>
                        <span class="font-semibold text-lg">RM ${order.totals.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize payment form
function initPaymentForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const method = urlParams.get('method') || 'card';
    
    // Show appropriate payment form
    updatePaymentMethodUI(method);
    
    // Initialize credit card form if needed
    if (method === 'card') {
        initCreditCardForm();
    }
}

// Initialize credit card form
function initCreditCardForm() {
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCvc = document.getElementById('cardCvc');
    const cardName = document.getElementById('cardName');
    
    if (cardNumber) {
        cardNumber.addEventListener('input', formatCardNumber);
        cardNumber.addEventListener('keypress', validateCardNumber);
    }
    
    if (cardExpiry) {
        cardExpiry.addEventListener('input', formatCardExpiry);
    }
    
    if (cardCvc) {
        cardCvc.addEventListener('input', validateCardCvc);
    }
}

// Format card number
function formatCardNumber() {
    let value = this.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    
    // Add spaces every 4 digits
    const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
    this.value = formatted;
    
    // Detect card type
    const cardType = detectCardType(value);
    updateCardTypeIcon(cardType);
}

// Detect card type
function detectCardType(number) {
    const patterns = {
        visa: /^4/,
        mastercard: /^5[1-5]/,
        amex: /^3[47]/,
        discover: /^6(?:011|5)/
    };
    
    for (const [type, pattern] of Object.entries(patterns)) {
        if (pattern.test(number)) {
            return type;
        }
    }
    
    return 'unknown';
}

// Update card type icon
function updateCardTypeIcon(cardType) {
    const icon = document.querySelector('.card-type-icon');
    if (!icon) return;
    
    const icons = {
        visa: 'fab fa-cc-visa',
        mastercard: 'fab fa-cc-mastercard',
        amex: 'fab fa-cc-amex',
        discover: 'fab fa-cc-discover',
        unknown: 'fas fa-credit-card'
    };
    
    icon.className = icons[cardType] || icons.unknown;
}

// Validate card number input
function validateCardNumber(e) {
    const charCode = e.which ? e.which : e.keyCode;
    
    // Only allow numbers
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
        return false;
    }
    
    return true;
}

// Format card expiry
function formatCardExpiry() {
    let value = this.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    this.value = value;
}

// Validate card CVC
function validateCardCvc() {
    let value = this.value.replace(/\D/g, '');
    value = value.substring(0, 4);
    this.value = value;
}

// Handle payment submission
async function handlePaymentSubmission(e) {
    e.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const method = urlParams.get('method');
    
    switch (method) {
        case 'card':
            await processCardPayment(e.target);
            break;
        case 'bank':
            await processBankTransfer(e.target);
            break;
        default:
            showNotification('Invalid payment method', 'error');
    }
}

// Process card payment
async function processCardPayment(form) {
    try {
        // Validate card details
        if (!validateCardForm()) {
            showNotification('Please check your card details', 'error');
            return;
        }
        
        showLoading('Processing card payment...');
        
        // Get order from session storage
        const order = JSON.parse(sessionStorage.getItem('currentOrder'));
        if (!order) {
            throw new Error('Order not found');
        }
        
        // Simulate card payment processing
        await simulateCardPayment();
        
        // Create payment result
        const paymentResult = {
            success: true,
            payment_id: 'CARD' + Date.now(),
            status: 'completed',
            amount: order.totals.total,
            currency: PAYMENT_CONFIG.CURRENCY,
            timestamp: new Date().toISOString()
        };
        
        // Process payment result
        await handlePaymentResult(paymentResult, order);
        
    } catch (error) {
        console.error('Card payment error:', error);
        showNotification('Card payment failed. Please try again.', 'error');
        hideLoading();
    }
}

// Validate card form
function validateCardForm() {
    let isValid = true;
    
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCvc = document.getElementById('cardCvc');
    const cardName = document.getElementById('cardName');
    
    // Validate card number
    if (!cardNumber || !cardNumber.value.trim() || cardNumber.value.replace(/\D/g, '').length < 16) {
        showFieldError(cardNumber, 'Valid card number is required');
        isValid = false;
    }
    
    // Validate expiry date
    if (!cardExpiry || !cardExpiry.value.trim() || !/^\d{2}\/\d{2}$/.test(cardExpiry.value)) {
        showFieldError(cardExpiry, 'Valid expiry date is required (MM/YY)');
        isValid = false;
    }
    
    // Validate CVC
    if (!cardCvc || !cardCvc.value.trim() || cardCvc.value.length < 3) {
        showFieldError(cardCvc, 'Valid CVC is required');
        isValid = false;
    }
    
    // Validate card name
    if (!cardName || !cardName.value.trim() || cardName.value.length < 2) {
        showFieldError(cardName, 'Cardholder name is required');
        isValid = false;
    }
    
    return isValid;
}

// Simulate card payment
async function simulateCardPayment() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate payment processing
            const success = Math.random() > 0.2; // 80% success rate for demo
            
            if (success) {
                resolve();
            } else {
                reject(new Error('Card payment declined'));
            }
        }, 3000);
    });
}

// Process bank transfer
async function processBankTransfer(form) {
    try {
        showLoading('Preparing bank transfer details...');
        
        // Get order from session storage
        const order = JSON.parse(sessionStorage.getItem('currentOrder'));
        if (!order) {
            throw new Error('Order not found');
        }
        
        // Generate bank transfer reference
        const reference = `GLOB${Date.now()}`;
        
        // Show bank transfer details
        showBankTransferDetails(order, reference);
        
        // Mark order as pending payment
        order.paymentMethod = 'bank';
        order.status = 'pending_payment';
        order.paymentReference = reference;
        
        // Save order
        await saveOrderToDatabase(order);
        
        hideLoading();
        
    } catch (error) {
        console.error('Bank transfer error:', error);
        showNotification('Failed to process bank transfer', 'error');
        hideLoading();
    }
}

// Show bank transfer details
function showBankTransferDetails(order, reference) {
    const modal = document.createElement('div');
    modal.className = 'modal fixed inset-0 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="modal-overlay absolute inset-0 bg-black opacity-50"></div>
        <div class="modal-content bg-white rounded-lg p-6 max-w-md w-full mx-4 relative z-10">
            <div class="modal-header flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Bank Transfer Instructions</h3>
                <button class="modal-close text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="bank-details space-y-3">
                    <div class="flex justify-between">
                        <span class="font-medium">Bank:</span>
                        <span>Maybank Berhad</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Account Name:</span>
                        <span>GlobalMart Sdn Bhd</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Account Number:</span>
                        <span>5648 1234 5678</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Amount:</span>
                        <span class="font-semibold">RM ${order.totals.total.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Reference:</span>
                        <span class="font-semibold">${reference}</span>
                    </div>
                </div>
                <div class="instructions mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p class="text-sm text-yellow-800">
                        <i class="fas fa-exclamation-circle mr-1"></i>
                        Please include the reference number in your transfer. Orders will be processed within 24 hours of payment confirmation.
                    </p>
                </div>
                <div class="modal-footer mt-6">
                    <button class="btn btn-primary w-full confirm-transfer">
                        <i class="fas fa-check-circle mr-2"></i>
                        I have completed the transfer
                    </button>
                    <button class="btn btn-outline w-full mt-2 print-details">
                        <i class="fas fa-print mr-2"></i>
                        Print Details
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.modal-overlay').addEventListener('click', () => modal.remove());
    
    modal.querySelector('.confirm-transfer').addEventListener('click', () => {
        modal.remove();
        showNotification('Thank you! We will notify you once payment is confirmed.', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
    
    modal.querySelector('.print-details').addEventListener('click', () => {
        window.print();
    });
}

// Listen for payment status updates
function listenForPaymentStatus() {
    // Check for payment status in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment_status');
    const orderId = urlParams.get('order_id');
    
    if (paymentStatus && orderId) {
        handlePaymentCallback(paymentStatus, orderId);
    }
}

// Handle payment callback
async function handlePaymentCallback(status, orderId) {
    try {
        // Update order status based on payment status
        const order = await getOrderFromDatabase(orderId);
        
        if (order) {
            order.payment.status = status;
            order.status = status === 'completed' ? 'processing' : 'failed';
            
            await updateOrderStatus(order);
            
            // Show appropriate message
            if (status === 'completed') {
                showNotification('Payment successful! Your order is being processed.', 'success');
                // Clear cart
                localStorage.removeItem('cart');
            } else {
                showNotification('Payment failed. Please try again.', 'error');
            }
        }
        
    } catch (error) {
        console.error('Error handling payment callback:', error);
    }
}

// Get order from database
async function getOrderFromDatabase(orderId) {
    // This would call your backend API
    // For demo, we'll use session storage
    const orders = JSON.parse(sessionStorage.getItem('orders')) || [];
    return orders.find(order => order.orderNumber === orderId);
}

// Update order status
async function updateOrderStatus(order) {
    // This would call your backend API
    // For demo, we'll update session storage
    const orders = JSON.parse(sessionStorage.getItem('orders')) || [];
    const index = orders.findIndex(o => o.orderNumber === order.orderNumber);
    
    if (index !== -1) {
        orders[index] = order;
        sessionStorage.setItem('orders', JSON.stringify(orders));
    }
}

// Show loading overlay
function showLoading(message = 'Processing...') {
    const loading = document.createElement('div');
    loading.id = 'paymentLoading';
    loading.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
    loading.innerHTML = `
        <div class="bg-white rounded-lg p-6 flex flex-col items-center">
            <div class="loader w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p class="text-gray-700">${message}</p>
        </div>
    `;
    
    document.body.appendChild(loading);
}

// Hide loading overlay
function hideLoading() {
    const loading = document.getElementById('paymentLoading');
    if (loading) {
        loading.remove();
    }
}

// Log to Google Sheets
async function logToSheet(action, message, userId = 'guest') {
    try {
        const logData = {
            action: action,
            message: message,
            userId: userId,
            timestamp: new Date().toISOString(),
            module: 'payment'
        };
        
        const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logData)
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error logging payment:', error);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Use notification function from main.js if available
    if (window.showNotification) {
        window.showNotification(message, type);
        return;
    }
    
    // Fallback notification
    const notification = document.createElement('div');
    notification.className = `notification ${type} fixed top-4 right-4 px-4 py-3 rounded shadow-lg z-50`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        processToyibPayPayment,
        processCardPayment,
        processBankTransfer,
        validateCheckoutForm,
        calculateOrderTotals
    };
}