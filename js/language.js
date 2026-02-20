// Multi-language support for GlobalMart

const translations = {
    en: {
        // Navigation
        home: "Home",
        products: "Products",
        categories: "Categories",
        deals: "Deals",
        register: "Register",
        login: "Login",
        
        // Hero section
        heroTitle: "Shop Everything You Need",
        heroSubtitle: "From electronics to fashion, home essentials to luxury items - All in one place with secure payments via Toyib Pay",
        heroButton: "Start Shopping Now",
        
        // Features
        freeShipping: "Free Shipping",
        freeShippingDesc: "Free delivery for orders above RM100",
        securePayment: "Secure Payment",
        securePaymentDesc: "100% secure payments with Toyib Pay",
        intlDelivery: "International Delivery",
        intlDeliveryDesc: "Ship to over 50 countries worldwide",
        
        // Products
        featuredProducts: "Featured Products",
        addToCart: "Add to Cart",
        
        // Freight Calculator
        calculateShipping: "Calculate Shipping Cost",
        localDelivery: "Local Delivery",
        intlDelivery: "International Delivery",
        calculate: "Calculate",
        
        // Footer
        aboutUs: "About Us",
        contact: "Contact",
        terms: "Terms & Conditions",
        privacy: "Privacy Policy",
        paymentMethods: "Payment Methods"
    },
    
    ms: {
        // Navigation
        home: "Laman Utama",
        products: "Produk",
        categories: "Kategori",
        deals: "Tawaran",
        register: "Daftar",
        login: "Log Masuk",
        
        // Hero section
        heroTitle: "Beli Semua Yang Anda Perlukan",
        heroSubtitle: "Dari elektronik ke fesyen, keperluan rumah ke barang mewah - Semua di satu tempat dengan pembayaran selamat melalui Toyib Pay",
        heroButton: "Mulakan Membeli-belah Sekarang",
        
        // Features
        freeShipping: "Penghantaran Percuma",
        freeShippingDesc: "Penghantaran percuma untuk pesanan melebihi RM100",
        securePayment: "Pembayaran Selamat",
        securePaymentDesc: "100% pembayaran selamat dengan Toyib Pay",
        intlDelivery: "Penghantaran Antarabangsa",
        intlDeliveryDesc: "Hantar ke lebih 50 negara di seluruh dunia",
        
        // Products
        featuredProducts: "Produk Pilihan",
        addToCart: "Tambah ke Troli",
        
        // Freight Calculator
        calculateShipping: "Kira Kos Penghantaran",
        localDelivery: "Penghantaran Tempatan",
        intlDelivery: "Penghantaran Antarabangsa",
        calculate: "Kira",
        
        // Footer
        aboutUs: "Tentang Kami",
        contact: "Hubungi",
        terms: "Terma & Syarat",
        privacy: "Dasar Privasi",
        paymentMethods: "Kaedah Pembayaran"
    },
    
    zh: {
        // Navigation
        home: "首页",
        products: "产品",
        categories: "分类",
        deals: "优惠",
        register: "注册",
        login: "登录",
        
        // Hero section
        heroTitle: "购买您所需的一切",
        heroSubtitle: "从电子产品到时尚，家居必需品到奢侈品 - 一切尽在一处，通过 Toyib Pay 安全支付",
        heroButton: "立即开始购物",
        
        // Features
        freeShipping: "免费送货",
        freeShippingDesc: "订单满 RM100 免费送货",
        securePayment: "安全支付",
        securePaymentDesc: "通过 Toyib Pay 实现 100% 安全支付",
        intlDelivery: "国际配送",
        intlDeliveryDesc: "配送至全球 50 多个国家",
        
        // Products
        featuredProducts: "特色产品",
        addToCart: "加入购物车",
        
        // Freight Calculator
        calculateShipping: "计算运费",
        localDelivery: "本地送货",
        intlDelivery: "国际配送",
        calculate: "计算",
        
        // Footer
        aboutUs: "关于我们",
        contact: "联系我们",
        terms: "条款和条件",
        privacy: "隐私政策",
        paymentMethods: "支付方式"
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('languageSelect');
    
    if (languageSelect) {
        languageSelect.value = currentLanguage;
        languageSelect.addEventListener('change', function() {
            setLanguage(this.value);
        });
    }
    
    // Set initial language
    setLanguage(currentLanguage);
});

function setLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('language', language);
    
    // Update all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(element => {
        const langKey = element.getAttribute('data-lang');
        if (langKey === language) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
    
    // Update language select if exists
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = language;
    }
    
    // Update dynamic text elements
    updateDynamicText(language);
}

function updateDynamicText(language) {
    const langData = translations[language];
    
    // Update button texts
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.textContent = langData.addToCart;
    });
    
    // Update select options
    const deliverySelect = document.getElementById('deliveryType');
    if (deliverySelect) {
        Array.from(deliverySelect.options).forEach(option => {
            const langKey = option.getAttribute('data-lang');
            if (langKey === language) {
                option.style.display = '';
            } else {
                option.style.display = 'none';
            }
        });
    }
    
    // Log language change
    logToSheet('LANGUAGE_CHANGE', `Language changed to ${language}`);
}