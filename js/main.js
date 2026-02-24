// Main JavaScript for GlobalMart E-commerce

// Configuration
const CONFIG = {
    SHEET_URL: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL',
    CURRENCY: 'RM',
    TAX_RATE: 0.06,
    FREE_SHIPPING_THRESHOLD: 100,
    DEFAULT_LANGUAGE: 'en'
};

// Global State
let appState = {
    cart: [],
    user: null,
    language: CONFIG.DEFAULT_LANGUAGE,
    products: [],
    isMobileMenuOpen: false
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Load saved state
        loadStateFromStorage();
        
        // Initialize components
        initMobileMenu();
        initCart();
        initLanguage();
        initFreightCalculator();
        
        // Load data
        await loadProducts();
        await checkAuthStatus();
        
        // Update UI
        updateCartCount();
        updateUserUI();
        
        // Add event listeners
        addGlobalEventListeners();
        
        console.log('GlobalMart initialized successfully');
        
        // Log initialization
        await logToSheet('APP_INIT', 'Application initialized');
        
    } catch (error) {
        console.error('Error initializing app:', error);
        showNotification('Error initializing application', 'error');
        await logToSheet('APP_INIT_ERROR', error.toString());
    }
}

// State Management
function loadStateFromStorage() {
    try {
        // Load cart
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            appState.cart = JSON.parse(savedCart);
        }
        
        // Load user
        const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (savedUser) {
            appState.user = JSON.parse(savedUser);
        }
        
        // Load language
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            appState.language = savedLanguage;
        }
        
    } catch (error) {
        console.error('Error loading state from storage:', error);
        // Reset to defaults
        appState = {
            cart: [],
            user: null,
            language: CONFIG.DEFAULT_LANGUAGE,
            products: [],
            isMobileMenuOpen: false
        };
    }
}

function saveStateToStorage() {
    try {
        // Save cart
        localStorage.setItem('cart', JSON.stringify(appState.cart));
        
        // Save language
        localStorage.setItem('language', appState.language);
        
    } catch (error) {
        console.error('Error saving state to storage:', error);
    }
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-btn')) {
                closeMobileMenu();
            }
        });
        
        // Close menu on link click
        mainNav.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const mainNav = document.querySelector('.main-nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn i');
    
    if (mainNav) {
        appState.isMobileMenuOpen = !appState.isMobileMenuOpen;
        mainNav.classList.toggle('active', appState.isMobileMenuOpen);
        
        // Update menu icon
        if (mobileMenuBtn) {
            mobileMenuBtn.className = appState.isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars';
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = appState.isMobileMenuOpen ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    const mainNav = document.querySelector('.main-nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn i');
    
    if (mainNav && appState.isMobileMenuOpen) {
        appState.isMobileMenuOpen = false;
        mainNav.classList.remove('active');
        
        // Update menu icon
        if (mobileMenuBtn) {
            mobileMenuBtn.className = 'fas fa-bars';
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Cart Management
function initCart() {
    // Load cart from state
    updateCartCount();
    
    // Initialize cart event listeners if on cart page
    if (window.location.pathname.includes('cart.html')) {
        initCartPage();
    }
}

function initCartPage() {
    // Cart page specific initialization
    const updateCartBtn = document.getElementById('updateCart');
    const clearCartBtn = document.getElementById('clearCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (updateCartBtn) {
        updateCartBtn.addEventListener('click', updateCartItems);
    }
    
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
    
    // Load cart items
    loadCartItems();
    updateCartSummary();
}

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (appState.cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart</p>
                <a href="index.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    appState.cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image || 'https://via.placeholder.com/100x100?text=Product'}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">${CONFIG.CURRENCY} ${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                </div>
            </div>
            <div class="cart-item-total">
                <p>${CONFIG.CURRENCY} ${(item.price * item.quantity).toFixed(2)}</p>
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners for quantity changes
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const isPlus = this.classList.contains('plus');
            updateCartItemQuantity(index, isPlus);
        });
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const quantity = parseInt(this.value) || 1;
            updateCartItemQuantity(index, null, quantity);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeCartItem(index);
        });
    });
}

function updateCartItemQuantity(index, isPlus, quantity = null) {
    if (index >= 0 && index < appState.cart.length) {
        if (quantity !== null) {
            appState.cart[index].quantity = Math.max(1, quantity);
        } else {
            appState.cart[index].quantity += isPlus ? 1 : -1;
            if (appState.cart[index].quantity < 1) {
                appState.cart[index].quantity = 1;
            }
        }
        
        saveCart();
        loadCartItems();
        updateCartSummary();
        updateCartCount();
        
        // Log cart update
        logToSheet('CART_UPDATE', `Updated quantity for ${appState.cart[index].name}`);
    }
}

function removeCartItem(index) {
    if (index >= 0 && index < appState.cart.length) {
        const item = appState.cart[index];
        appState.cart.splice(index, 1);
        
        saveCart();
        loadCartItems();
        updateCartSummary();
        updateCartCount();
        
        showNotification(`Removed ${item.name} from cart`, 'info');
        logToSheet('CART_REMOVE', `Removed ${item.name} from cart`);
    }
}

function updateCartItems() {
    // Update cart from input values
    document.querySelectorAll('.quantity-input').forEach((input, index) => {
        if (index < appState.cart.length) {
            const quantity = parseInt(input.value) || 1;
            appState.cart[index].quantity = Math.max(1, quantity);
        }
    });
    
    saveCart();
    loadCartItems();
    updateCartSummary();
    updateCartCount();
    
    showNotification('Cart updated successfully', 'success');
}

function clearCart() {
    if (appState.cart.length === 0) return;
    
    if (confirm('Are you sure you want to clear your cart?')) {
        appState.cart = [];
        saveCart();
        loadCartItems();
        updateCartSummary();
        updateCartCount();
        
        showNotification('Cart cleared successfully', 'success');
        logToSheet('CART_CLEAR', 'Cart cleared');
    }
}

function proceedToCheckout() {
    if (appState.cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    // Check if user is logged in
    if (!appState.user) {
        showNotification('Please login to proceed to checkout', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html?redirect=checkout';
        }, 1500);
        return;
    }
    
    // Proceed to checkout
    window.location.href = 'checkout.html';
}

function updateCartSummary() {
    const subtotalElement = document.getElementById('cartSubtotal');
    const taxElement = document.getElementById('cartTax');
    const shippingElement = document.getElementById('cartShipping');
    const totalElement = document.getElementById('cartTotal');
    
    if (!subtotalElement) return;
    
    const subtotal = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * CONFIG.TAX_RATE;
    const shipping = subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD ? 0 : 10; // RM10 shipping
    
    subtotalElement.textContent = `${CONFIG.CURRENCY} ${subtotal.toFixed(2)}`;
    taxElement.textContent = `${CONFIG.CURRENCY} ${tax.toFixed(2)}`;
    shippingElement.textContent = shipping === 0 ? 'FREE' : `${CONFIG.CURRENCY} ${shipping.toFixed(2)}`;
    totalElement.textContent = `${CONFIG.CURRENCY} ${(subtotal + tax + shipping).toFixed(2)}`;
}

// Product Management
async function loadProducts() {
    try {
        const products = await fetchProducts();
        appState.products = products;
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        // Use demo products as fallback
        loadDemoProducts();
    }
}

async function fetchProducts() {
    try {
        const response = await fetch(`${CONFIG.SHEET_URL}/getData?sheet=products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    } catch (error) {
        console.warn('Using demo products:', error);
        return getDemoProducts();
    }
}

function getDemoProducts() {
    return [
        {
            id: 1,
            name: "Smartphone X10 Pro",
            description: "Latest smartphone with advanced camera features",
            price: 1299.99,
            category: "electronics",
            image: "https://via.placeholder.com/300x200?text=Smartphone",
            rating: 4.5,
            stock: 50
        },
        {
            id: 2,
            name: "Wireless Headphones",
            description: "Noise cancelling wireless headphones",
            price: 199.99,
            category: "electronics",
            image: "https://via.placeholder.com/300x200?text=Headphones",
            rating: 4.2,
            stock: 100
        },
        {
            id: 3,
            name: "Designer T-Shirt",
            description: "Premium cotton designer t-shirt",
            price: 49.99,
            category: "fashion",
            image: "https://via.placeholder.com/300x200?text=T-Shirt",
            rating: 4.7,
            stock: 200
        },
        {
            id: 4,
            name: "Coffee Maker",
            description: "Automatic coffee maker with timer",
            price: 89.99,
            category: "home",
            image: "https://via.placeholder.com/300x200?text=Coffee+Maker",
            rating: 4.3,
            stock: 75
        },
        {
            id: 5,
            name: "Running Shoes",
            description: "Lightweight running shoes for athletes",
            price: 129.99,
            category: "sports",
            image: "https://via.placeholder.com/300x200?text=Shoes",
            rating: 4.6,
            stock: 60
        },
        {
            id: 6,
            name: "Smart Watch",
            description: "Fitness tracking smart watch",
            price: 299.99,
            category: "electronics",
            image: "https://via.placeholder.com/300x200?text=Smart+Watch",
            rating: 4.4,
            stock: 40
        }
    ];
}

function displayProducts(products) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            ${product.stock <= 10 ? '<span class="stock-badge low-stock">Low Stock</span>' : ''}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
                ${generateStars(product.rating)}
                <span class="rating-count">(${product.rating})</span>
            </div>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <p class="product-price">${CONFIG.CURRENCY} ${product.price.toFixed(2)}</p>
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    return card;
}

function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Cart Operations
function addToCart(productId) {
    const product = appState.products.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found', 'error');
        return;
    }
    
    // Check stock availability
    if (product.stock <= 0) {
        showNotification('Product is out of stock', 'error');
        return;
    }
    
    const existingItem = appState.cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Check if we have enough stock
        if (existingItem.quantity >= product.stock) {
            showNotification(`Only ${product.stock} items available in stock`, 'warning');
            return;
        }
        existingItem.quantity++;
    } else {
        appState.cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    
    // Show notification
    showNotification(`${product.name} added to cart!`, 'success');
    
    // Log to Google Sheets
    logToSheet('CART_ADD', `Product ${productId} added to cart`, appState.user?.id || 'guest');
}

function saveCart() {
    appState.cart = appState.cart.filter(item => item.quantity > 0);
    localStorage.setItem('cart', JSON.stringify(appState.cart));
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = appState.cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

// Freight Calculator
function initFreightCalculator() {
    const calculateBtn = document.getElementById('calculateFreight');
    if (!calculateBtn) return;
    
    calculateBtn.addEventListener('click', calculateFreight);
    
    // Load saved freight rates
    loadFreightRates();
}

async function loadFreightRates() {
    try {
        const response = await fetch(`${CONFIG.SHEET_URL}/getSettings?type=freight`);
        if (response.ok) {
            const rates = await response.json();
            // Store rates for later use
            localStorage.setItem('freightRates', JSON.stringify(rates));
        }
    } catch (error) {
        console.warn('Could not load freight rates:', error);
    }
}

async function calculateFreight() {
    const deliveryType = document.getElementById('deliveryType').value;
    const country = document.getElementById('countrySelect').value;
    const weight = parseFloat(document.getElementById('weight').value);
    
    if (!weight || weight <= 0) {
        showNotification('Please enter a valid weight', 'error');
        return;
    }
    
    let cost = 0;
    let currency = CONFIG.CURRENCY;
    
    // Get rates from storage or use defaults
    const rates = JSON.parse(localStorage.getItem('freightRates')) || {
        local: { baseRate: 5, ratePerKg: 2 },
        international: { baseRate: 15, ratePerKg: 5 }
    };
    
    if (deliveryType === 'local') {
        cost = rates.local.baseRate + (weight * rates.local.ratePerKg);
        currency = CONFIG.CURRENCY;
    } else {
        cost = rates.international.baseRate + (weight * rates.international.ratePerKg);
        currency = 'USD';
        
        // Add surcharge for certain countries
        if (country === 'US') cost += 10;
        if (country === 'AU') cost += 8;
        if (country === 'EU') cost += 12;
    }
    
    const resultDiv = document.getElementById('freightResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <div class="freight-result-content">
                <h4>Shipping Estimate</h4>
                <p><strong>Total Cost:</strong> ${currency} ${cost.toFixed(2)}</p>
                <p><strong>Delivery Type:</strong> ${deliveryType === 'local' ? 'Local' : 'International'}</p>
                <p><strong>Destination:</strong> ${getCountryName(country)}</p>
                <p><strong>Weight:</strong> ${weight} kg</p>
                <p><small>Estimated delivery: ${deliveryType === 'local' ? '3-5 business days' : '7-14 business days'}</small></p>
            </div>
        `;
    }
    
    // Log to Google Sheets
    logToSheet('FREIGHT_CALC', `Calculated ${currency}${cost.toFixed(2)} for ${weight}kg to ${country}`);
}

function getCountryName(code) {
    const countries = {
        'MY': 'Malaysia',
        'SG': 'Singapore',
        'US': 'United States',
        'AU': 'Australia',
        'EU': 'European Union'
    };
    return countries[code] || code;
}

// Language Management
function initLanguage() {
    const languageSelect = document.getElementById('languageSelect');
    
    if (languageSelect) {
        languageSelect.value = appState.language;
        languageSelect.addEventListener('change', function() {
            setLanguage(this.value);
        });
    }
    
    // Set initial language
    setLanguage(appState.language);
}

function setLanguage(language) {
    appState.language = language;
    localStorage.setItem('language', language);
    
    // Update all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(element => {
        const langKey = element.getAttribute('data-lang');
        element.style.display = langKey === language ? '' : 'none';
    });
    
    // Update language select if exists
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = language;
    }
    
    // Log language change
    logToSheet('LANGUAGE_CHANGE', `Language changed to ${language}`, appState.user?.id || 'guest');
}

// User Management
async function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    
    if (user) {
        appState.user = user;
        updateUserUI(user);
        
        // If on login/register page and already logged in, redirect
        if (window.location.pathname.includes('login.html') || 
            window.location.pathname.includes('register.html')) {
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    }
}

function updateUserUI(user) {
    const nav = document.querySelector('.main-nav ul');
    if (!nav || !user) return;
    
    // Remove existing user menu items
    document.querySelectorAll('.user-menu-item').forEach(item => item.remove());
    
    const userItem = document.createElement('li');
    userItem.className = 'user-menu-item';
    userItem.innerHTML = `
        <a href="#" class="user-menu">
            <i class="fas fa-user-circle"></i>
            ${user.fullName?.split(' ')[0] || 'User'}
        </a>
        <div class="user-dropdown">
            <a href="profile.html"><i class="fas fa-user"></i> My Profile</a>
            <a href="orders.html"><i class="fas fa-shopping-bag"></i> My Orders</a>
            <a href="wishlist.html"><i class="fas fa-heart"></i> Wishlist</a>
            <div class="dropdown-divider"></div>
            <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
    `;
    
    // Replace login link with user menu
    const loginLink = nav.querySelector('a[href="login.html"]');
    if (loginLink) {
        loginLink.closest('li').replaceWith(userItem);
    } else {
        nav.appendChild(userItem);
    }
    
    // Add logout event listener
    document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);
    
    // Initialize dropdown
    initUserDropdown();
}

function initUserDropdown() {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.querySelector('.user-dropdown');
    
    if (userMenu && dropdown) {
        userMenu.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.user-menu-item')) {
                dropdown.style.display = 'none';
            }
        });
    }
}

function handleLogout(e) {
    e.preventDefault();
    
    // Clear user data
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    appState.user = null;
    
    showNotification('Logged out successfully', 'success');
    
    // Reload page to update UI
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'notification-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.addEventListener('click', () => notification.remove());
    notification.appendChild(closeBtn);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

async function logToSheet(action, message, userId = 'guest') {
    try {
        const logData = {
            action: action,
            message: message,
            userId: userId,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            page: window.location.pathname,
            platform: navigator.platform,
            language: navigator.language
        };
        
        const response = await fetch(CONFIG.SHEET_URL + '/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logData)
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error logging to sheet:', error);
    }
}

function addGlobalEventListeners() {
    // Add any global event listeners here
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        appState,
        showNotification,
        logToSheet
    };
}