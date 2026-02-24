// Language Management Module for GlobalMart

const LANGUAGE_CONFIG = {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'ms', 'zh'],
    storageKey: 'globalmart_language',
    fallbackEnabled: true
};

// Translations object
const TRANSLATIONS = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.products': 'Products',
        'nav.categories': 'Categories',
        'nav.deals': 'Deals',
        'nav.register': 'Register',
        'nav.login': 'Login',
        'nav.logout': 'Logout',
        'nav.profile': 'My Profile',
        'nav.orders': 'My Orders',
        'nav.wishlist': 'Wishlist',
        'nav.cart': 'Cart',
        'nav.admin': 'Admin Panel',
        
        // Hero Section
        'hero.title': 'Shop Everything You Need',
        'hero.subtitle': 'From electronics to fashion, home essentials to luxury items - All in one place with secure payments via Toyib Pay',
        'hero.button': 'Start Shopping Now',
        
        // Features
        'feature.shipping': 'Free Shipping',
        'feature.shipping.desc': 'Free delivery for orders above RM100',
        'feature.payment': 'Secure Payment',
        'feature.payment.desc': '100% secure payments with Toyib Pay',
        'feature.delivery': 'International Delivery',
        'feature.delivery.desc': 'Ship to over 50 countries worldwide',
        
        // Products
        'products.featured': 'Featured Products',
        'products.addToCart': 'Add to Cart',
        'products.viewDetails': 'View Details',
        'products.outOfStock': 'Out of Stock',
        'products.lowStock': 'Low Stock',
        'products.inStock': 'In Stock',
        
        // Freight Calculator
        'freight.title': 'Calculate Shipping Cost',
        'freight.local': 'Local Delivery',
        'freight.international': 'International Delivery',
        'freight.country': 'Select Country',
        'freight.weight': 'Weight (kg)',
        'freight.calculate': 'Calculate',
        'freight.result': 'Shipping Estimate',
        'freight.total': 'Total Cost',
        'freight.type': 'Delivery Type',
        'freight.destination': 'Destination',
        'freight.deliveryTime': 'Estimated delivery',
        'freight.free': 'FREE',
        
        // Footer
        'footer.about': 'About Us',
        'footer.contact': 'Contact',
        'footer.terms': 'Terms & Conditions',
        'footer.privacy': 'Privacy Policy',
        'footer.payment': 'Payment Methods',
        'footer.copyright': '© 2024 GlobalMart. All rights reserved.',
        
        // Authentication
        'auth.welcome': 'Welcome Back',
        'auth.welcome.subtitle': 'Login to access your account and continue shopping',
        'auth.createAccount': 'Create Your Account',
        'auth.createAccount.subtitle': 'Join thousands of happy shoppers on GlobalMart',
        'auth.email': 'Email Address',
        'auth.password': 'Password',
        'auth.fullName': 'Full Name',
        'auth.phone': 'Phone Number',
        'auth.confirmPassword': 'Confirm Password',
        'auth.remember': 'Remember me',
        'auth.forgotPassword': 'Forgot your password?',
        'auth.noAccount': 'Don\'t have an account?',
        'auth.hasAccount': 'Already have an account?',
        'auth.signUp': 'Sign up now',
        'auth.loginHere': 'Login here',
        'auth.continueWith': 'Or continue with',
        'auth.adminLogin': 'Admin Login',
        'auth.resetPassword': 'Reset Password',
        'auth.resetPassword.subtitle': 'Enter your email address and we\'ll send you a link to reset your password.',
        'auth.sendReset': 'Send Reset Link',
        'auth.admin.subtitle': 'Please enter admin credentials to access the admin panel.',
        'auth.loginAsAdmin': 'Login as Admin',
        'auth.securityCode': 'Security Code (Optional)',
        
        // Cart
        'cart.title': 'Shopping Cart',
        'cart.empty': 'Your cart is empty',
        'cart.empty.subtitle': 'Add some products to your cart',
        'cart.continue': 'Continue Shopping',
        'cart.item': 'Item',
        'cart.price': 'Price',
        'cart.quantity': 'Quantity',
        'cart.total': 'Total',
        'cart.subtotal': 'Subtotal',
        'cart.tax': 'Tax',
        'cart.shipping': 'Shipping',
        'cart.grandTotal': 'Grand Total',
        'cart.update': 'Update Cart',
        'cart.clear': 'Clear Cart',
        'cart.checkout': 'Proceed to Checkout',
        
        // Checkout
        'checkout.title': 'Checkout',
        'checkout.billing': 'Billing Details',
        'checkout.shipping': 'Shipping Details',
        'checkout.payment': 'Payment Method',
        'checkout.review': 'Order Review',
        'checkout.firstName': 'First Name',
        'checkout.lastName': 'Last Name',
        'checkout.address': 'Address',
        'checkout.city': 'City',
        'checkout.state': 'State',
        'checkout.zip': 'ZIP Code',
        'checkout.country': 'Country',
        'checkout.sameAsBilling': 'Shipping address same as billing',
        'checkout.placeOrder': 'Place Order',
        'checkout.backToCart': 'Back to Cart',
        
        // Admin
        'admin.dashboard': 'Dashboard',
        'admin.products': 'Products',
        'admin.orders': 'Orders',
        'admin.users': 'Users',
        'admin.freight': 'Freight Settings',
        'admin.payments': 'Payments',
        'admin.logs': 'System Logs',
        'admin.settings': 'Settings',
        'admin.search': 'Search...',
        'admin.logout': 'Logout',
        
        // Notifications
        'notification.success': 'Success',
        'notification.error': 'Error',
        'notification.info': 'Info',
        'notification.warning': 'Warning',
        
        // Common
        'common.loading': 'Loading...',
        'common.saving': 'Saving...',
        'common.deleting': 'Deleting...',
        'common.edit': 'Edit',
        'common.delete': 'Delete',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.confirm': 'Confirm',
        'common.yes': 'Yes',
        'common.no': 'No',
        'common.close': 'Close',
        'common.back': 'Back',
        'common.next': 'Next',
        'common.previous': 'Previous',
        'common.submit': 'Submit',
        'common.reset': 'Reset',
        'common.search': 'Search',
        'common.filter': 'Filter',
        'common.sort': 'Sort',
        'common.view': 'View',
        'common.download': 'Download',
        'common.print': 'Print',
        'common.share': 'Share',
        'common.copy': 'Copy',
        'common.paste': 'Paste',
        'common.refresh': 'Refresh',
        'common.more': 'More',
        'common.less': 'Less'
    },
    
    ms: {
        // Navigation
        'nav.home': 'Laman Utama',
        'nav.products': 'Produk',
        'nav.categories': 'Kategori',
        'nav.deals': 'Tawaran',
        'nav.register': 'Daftar',
        'nav.login': 'Log Masuk',
        'nav.logout': 'Log Keluar',
        'nav.profile': 'Profil Saya',
        'nav.orders': 'Pesanan Saya',
        'nav.wishlist': 'Senarai Harapan',
        'nav.cart': 'Troli',
        'nav.admin': 'Panel Admin',
        
        // Hero Section
        'hero.title': 'Beli Semua Yang Anda Perlukan',
        'hero.subtitle': 'Dari elektronik ke fesyen, keperluan rumah ke barang mewah - Semua di satu tempat dengan pembayaran selamat melalui Toyib Pay',
        'hero.button': 'Mulakan Membeli-belah Sekarang',
        
        // Features
        'feature.shipping': 'Penghantaran Percuma',
        'feature.shipping.desc': 'Penghantaran percuma untuk pesanan melebihi RM100',
        'feature.payment': 'Pembayaran Selamat',
        'feature.payment.desc': '100% pembayaran selamat dengan Toyib Pay',
        'feature.delivery': 'Penghantaran Antarabangsa',
        'feature.delivery.desc': 'Hantar ke lebih 50 negara di seluruh dunia',
        
        // Products
        'products.featured': 'Produk Pilihan',
        'products.addToCart': 'Tambah ke Troli',
        'products.viewDetails': 'Lihat Butiran',
        'products.outOfStock': 'Stok Habis',
        'products.lowStock': 'Stok Sedikit',
        'products.inStock': 'Dalam Stok',
        
        // Freight Calculator
        'freight.title': 'Kira Kos Penghantaran',
        'freight.local': 'Penghantaran Tempatan',
        'freight.international': 'Penghantaran Antarabangsa',
        'freight.country': 'Pilih Negara',
        'freight.weight': 'Berat (kg)',
        'freight.calculate': 'Kira',
        'freight.result': 'Anggaran Penghantaran',
        'freight.total': 'Jumlah Kos',
        'freight.type': 'Jenis Penghantaran',
        'freight.destination': 'Destinasi',
        'freight.deliveryTime': 'Anggaran penghantaran',
        'freight.free': 'PERCUMA',
        
        // Footer
        'footer.about': 'Tentang Kami',
        'footer.contact': 'Hubungi',
        'footer.terms': 'Terma & Syarat',
        'footer.privacy': 'Dasar Privasi',
        'footer.payment': 'Kaedah Pembayaran',
        'footer.copyright': '© 2024 GlobalMart. Hak cipta terpelihara.',
        
        // Authentication
        'auth.welcome': 'Selamat Kembali',
        'auth.welcome.subtitle': 'Log masuk untuk mengakses akaun anda dan terus membeli-belah',
        'auth.createAccount': 'Buat Akaun Anda',
        'auth.createAccount.subtitle': 'Sertai beribu-ribu pembeli yang gembira di GlobalMart',
        'auth.email': 'Alamat Emel',
        'auth.password': 'Kata Laluan',
        'auth.fullName': 'Nama Penuh',
        'auth.phone': 'Nombor Telefon',
        'auth.confirmPassword': 'Sahkan Kata Laluan',
        'auth.remember': 'Ingat saya',
        'auth.forgotPassword': 'Lupa kata laluan anda?',
        'auth.noAccount': 'Tiada akaun?',
        'auth.hasAccount': 'Sudah mempunyai akaun?',
        'auth.signUp': 'Daftar sekarang',
        'auth.loginHere': 'Log masuk di sini',
        'auth.continueWith': 'Atau teruskan dengan',
        'auth.adminLogin': 'Log Masuk Admin',
        'auth.resetPassword': 'Set Semula Kata Laluan',
        'auth.resetPassword.subtitle': 'Masukkan alamat emel anda dan kami akan hantar pautan untuk menetapkan semula kata laluan anda.',
        'auth.sendReset': 'Hantar Pautan',
        'auth.admin.subtitle': 'Sila masukkan kelayakan admin untuk mengakses panel admin.',
        'auth.loginAsAdmin': 'Log Masuk sebagai Admin',
        'auth.securityCode': 'Kod Keselamatan (Pilihan)',
        
        // Cart
        'cart.title': 'Troli Beli-belah',
        'cart.empty': 'Troli anda kosong',
        'cart.empty.subtitle': 'Tambah beberapa produk ke troli anda',
        'cart.continue': 'Teruskan Membeli-belah',
        'cart.item': 'Item',
        'cart.price': 'Harga',
        'cart.quantity': 'Kuantiti',
        'cart.total': 'Jumlah',
        'cart.subtotal': 'Jumlah kecil',
        'cart.tax': 'Cukai',
        'cart.shipping': 'Penghantaran',
        'cart.grandTotal': 'Jumlah Keseluruhan',
        'cart.update': 'Kemaskini Troli',
        'cart.clear': 'Kosongkan Troli',
        'cart.checkout': 'Teruskan ke Pembayaran',
        
        // Common
        'common.loading': 'Memuatkan...',
        'common.saving': 'Menyimpan...',
        'common.deleting': 'Memadam...',
        'common.edit': 'Edit',
        'common.delete': 'Padam',
        'common.save': 'Simpan',
        'common.cancel': 'Batal',
        'common.confirm': 'Sahkan',
        'common.yes': 'Ya',
        'common.no': 'Tidak',
        'common.close': 'Tutup',
        'common.back': 'Kembali',
        'common.next': 'Seterusnya',
        'common.previous': 'Sebelumnya',
        'common.submit': 'Hantar',
        'common.reset': 'Set Semula',
        'common.search': 'Cari',
        'common.filter': 'Tapis',
        'common.sort': 'Isih',
        'common.view': 'Lihat',
        'common.download': 'Muat Turun',
        'common.print': 'Cetak',
        'common.share': 'Kongsi',
        'common.copy': 'Salin',
        'common.paste': 'Tampal',
        'common.refresh': 'Muat Semula',
        'common.more': 'Lagi',
        'common.less': 'Kurang'
    },
    
    zh: {
        // Navigation
        'nav.home': '首页',
        'nav.products': '产品',
        'nav.categories': '分类',
        'nav.deals': '优惠',
        'nav.register': '注册',
        'nav.login': '登录',
        'nav.logout': '登出',
        'nav.profile': '我的资料',
        'nav.orders': '我的订单',
        'nav.wishlist': '愿望清单',
        'nav.cart': '购物车',
        'nav.admin': '管理面板',
        
        // Hero Section
        'hero.title': '购买您所需的一切',
        'hero.subtitle': '从电子产品到时尚，家居必需品到奢侈品 - 一切尽在一处，通过 Toyib Pay 安全支付',
        'hero.button': '立即开始购物',
        
        // Features
        'feature.shipping': '免费送货',
        'feature.shipping.desc': '订单满 RM100 免费送货',
        'feature.payment': '安全支付',
        'feature.payment.desc': '通过 Toyib Pay 实现 100% 安全支付',
        'feature.delivery': '国际配送',
        'feature.delivery.desc': '配送至全球 50 多个国家',
        
        // Products
        'products.featured': '特色产品',
        'products.addToCart': '加入购物车',
        'products.viewDetails': '查看详情',
        'products.outOfStock': '缺货',
        'products.lowStock': '库存不足',
        'products.inStock': '有库存',
        
        // Freight Calculator
        'freight.title': '计算运费',
        'freight.local': '本地送货',
        'freight.international': '国际配送',
        'freight.country': '选择国家',
        'freight.weight': '重量 (公斤)',
        'freight.calculate': '计算',
        'freight.result': '运费估算',
        'freight.total': '总费用',
        'freight.type': '送货类型',
        'freight.destination': '目的地',
        'freight.deliveryTime': '预计送达时间',
        'freight.free': '免费',
        
        // Footer
        'footer.about': '关于我们',
        'footer.contact': '联系我们',
        'footer.terms': '条款和条件',
        'footer.privacy': '隐私政策',
        'footer.payment': '支付方式',
        'footer.copyright': '© 2024 全球市场。保留所有权利。',
        
        // Authentication
        'auth.welcome': '欢迎回来',
        'auth.welcome.subtitle': '登录以访问您的账户并继续购物',
        'auth.createAccount': '创建您的账户',
        'auth.createAccount.subtitle': '加入全球数千名快乐购物者的行列',
        'auth.email': '电子邮件地址',
        'auth.password': '密码',
        'auth.fullName': '全名',
        'auth.phone': '电话号码',
        'auth.confirmPassword': '确认密码',
        'auth.remember': '记住我',
        'auth.forgotPassword': '忘记密码？',
        'auth.noAccount': '还没有账户？',
        'auth.hasAccount': '已有账户？',
        'auth.signUp': '立即注册',
        'auth.loginHere': '在此登录',
        'auth.continueWith': '或使用以下方式继续',
        'auth.adminLogin': '管理员登录',
        'auth.resetPassword': '重置密码',
        'auth.resetPassword.subtitle': '输入您的电子邮件地址，我们将向您发送重置密码的链接。',
        'auth.sendReset': '发送重置链接',
        'auth.admin.subtitle': '请输入管理员凭据以访问管理面板。',
        'auth.loginAsAdmin': '以管理员身份登录',
        'auth.securityCode': '安全代码（可选）',
        
        // Cart
        'cart.title': '购物车',
        'cart.empty': '您的购物车是空的',
        'cart.empty.subtitle': '添加一些产品到您的购物车',
        'cart.continue': '继续购物',
        'cart.item': '商品',
        'cart.price': '价格',
        'cart.quantity': '数量',
        'cart.total': '总计',
        'cart.subtotal': '小计',
        'cart.tax': '税费',
        'cart.shipping': '运费',
        'cart.grandTotal': '总计金额',
        'cart.update': '更新购物车',
        'cart.clear': '清空购物车',
        'cart.checkout': '进行结算',
        
        // Common
        'common.loading': '加载中...',
        'common.saving': '保存中...',
        'common.deleting': '删除中...',
        'common.edit': '编辑',
        'common.delete': '删除',
        'common.save': '保存',
        'common.cancel': '取消',
        'common.confirm': '确认',
        'common.yes': '是',
        'common.no': '否',
        'common.close': '关闭',
        'common.back': '返回',
        'common.next': '下一步',
        'common.previous': '上一步',
        'common.submit': '提交',
        'common.reset': '重置',
        'common.search': '搜索',
        'common.filter': '筛选',
        'common.sort': '排序',
        'common.view': '查看',
        'common.download': '下载',
        'common.print': '打印',
        'common.share': '分享',
        'common.copy': '复制',
        'common.paste': '粘贴',
        'common.refresh': '刷新',
        'common.more': '更多',
        'common.less': '更少'
    }
};

// Language Manager Class
class LanguageManager {
    constructor() {
        this.currentLanguage = this.getSavedLanguage();
        this.isInitialized = false;
    }
    
    // Initialize language manager
    init() {
        if (this.isInitialized) return;
        
        this.setupLanguageSelector();
        this.setLanguage(this.currentLanguage);
        this.isInitialized = true;
        
        console.log(`Language manager initialized with language: ${this.currentLanguage}`);
    }
    
    // Get saved language from storage
    getSavedLanguage() {
        try {
            const saved = localStorage.getItem(LANGUAGE_CONFIG.storageKey);
            if (saved && LANGUAGE_CONFIG.supportedLanguages.includes(saved)) {
                return saved;
            }
            
            // Try to detect browser language
            const browserLang = navigator.language.split('-')[0];
            if (LANGUAGE_CONFIG.supportedLanguages.includes(browserLang)) {
                return browserLang;
            }
            
        } catch (error) {
            console.error('Error getting saved language:', error);
        }
        
        return LANGUAGE_CONFIG.defaultLanguage;
    }
    
    // Save language to storage
    saveLanguage(language) {
        try {
            localStorage.setItem(LANGUAGE_CONFIG.storageKey, language);
        } catch (error) {
            console.error('Error saving language:', error);
        }
    }
    
    // Setup language selector dropdown
    setupLanguageSelector() {
        const selector = document.getElementById('languageSelect');
        if (!selector) return;
        
        // Populate options
        selector.innerHTML = '';
        LANGUAGE_CONFIG.supportedLanguages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang;
            option.textContent = this.getLanguageName(lang);
            selector.appendChild(option);
        });
        
        // Set current language
        selector.value = this.currentLanguage;
        
        // Add change event listener
        selector.addEventListener('change', (e) => {
            this.setLanguage(e.target.value);
        });
    }
    
    // Get display name for language
    getLanguageName(code) {
        const names = {
            'en': 'English',
            'ms': 'Bahasa Malaysia',
            'zh': '中文'
        };
        return names[code] || code;
    }
    
    // Set application language
    setLanguage(language) {
        if (!LANGUAGE_CONFIG.supportedLanguages.includes(language)) {
            console.warn(`Unsupported language: ${language}`);
            
            if (LANGUAGE_CONFIG.fallbackEnabled) {
                language = LANGUAGE_CONFIG.defaultLanguage;
            } else {
                return;
            }
        }
        
        this.currentLanguage = language;
        this.saveLanguage(language);
        
        // Update selector if exists
        const selector = document.getElementById('languageSelect');
        if (selector) {
            selector.value = language;
        }
        
        // Update all translatable elements
        this.updatePageContent();
        
        // Dispatch language change event
        this.dispatchLanguageChangeEvent();
        
        // Update HTML lang attribute
        document.documentElement.lang = language;
        
        console.log(`Language changed to: ${language}`);
    }
    
    // Update all translatable content on page
    updatePageContent() {
        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update elements with data-i18n-html attribute (for HTML content)
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = this.translate(key);
            if (translation) {
                element.innerHTML = translation;
            }
        });
        
        // Update elements with data-i18n-title attribute (for title attributes)
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.translate(key);
            if (translation) {
                element.title = translation;
            }
        });
        
        // Update elements with data-i18n-alt attribute (for alt attributes)
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            const translation = this.translate(key);
            if (translation) {
                element.alt = translation;
            }
        });
        
        // Update select options with data-i18n-value attribute
        document.querySelectorAll('option[data-i18n-value]').forEach(option => {
            const key = option.getAttribute('data-i18n-value');
            const translation = this.translate(key);
            if (translation) {
                option.textContent = translation;
            }
        });
        
        // Update elements with data-lang attribute (legacy support)
        document.querySelectorAll('[data-lang]').forEach(element => {
            const lang = element.getAttribute('data-lang');
            element.style.display = lang === this.currentLanguage ? '' : 'none';
        });
    }
    
    // Translate a key to current language
    translate(key, fallback = '') {
        try {
            const keys = key.split('.');
            let translation = TRANSLATIONS[this.currentLanguage];
            
            for (const k of keys) {
                if (translation && translation[k] !== undefined) {
                    translation = translation[k];
                } else {
                    // Try fallback to default language
                    if (LANGUAGE_CONFIG.fallbackEnabled && this.currentLanguage !== LANGUAGE_CONFIG.defaultLanguage) {
                        let fallbackTranslation = TRANSLATIONS[LANGUAGE_CONFIG.defaultLanguage];
                        for (const fk of keys) {
                            if (fallbackTranslation && fallbackTranslation[fk] !== undefined) {
                                fallbackTranslation = fallbackTranslation[fk];
                            } else {
                                return fallback || key;
                            }
                        }
                        return fallbackTranslation;
                    }
                    return fallback || key;
                }
            }
            
            return translation || fallback || key;
            
        } catch (error) {
            console.error('Translation error:', error);
            return fallback || key;
        }
    }
    
    // Format currency based on language
    formatCurrency(amount, currency = 'RM') {
        const formats = {
            'en': { style: 'currency', currency: currency === 'RM' ? 'MYR' : currency },
            'ms': { style: 'currency', currency: currency === 'RM' ? 'MYR' : currency },
            'zh': { style: 'currency', currency: currency === 'RM' ? 'MYR' : currency, currencyDisplay: 'narrowSymbol' }
        };
        
        const format = formats[this.currentLanguage] || formats['en'];
        
        try {
            return new Intl.NumberFormat(this.currentLanguage, format).format(amount);
        } catch (error) {
            return `${currency} ${amount.toFixed(2)}`;
        }
    }
    
    // Format date based on language
    formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        const formatOptions = { ...defaultOptions, ...options };
        
        try {
            return new Intl.DateTimeFormat(this.currentLanguage, formatOptions).format(new Date(date));
        } catch (error) {
            return new Date(date).toLocaleDateString();
        }
    }
    
    // Format number based on language
    formatNumber(number, options = {}) {
        const defaultOptions = {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        };
        
        const formatOptions = { ...defaultOptions, ...options };
        
        try {
            return new Intl.NumberFormat(this.currentLanguage, formatOptions).format(number);
        } catch (error) {
            return number.toString();
        }
    }
    
    // Dispatch language change event
    dispatchLanguageChangeEvent() {
        const event = new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage }
        });
        document.dispatchEvent(event);
    }
    
    // Get current language direction (LTR/RTL)
    getDirection() {
        const rtlLanguages = ['ar', 'he', 'fa'];
        return rtlLanguages.includes(this.currentLanguage) ? 'rtl' : 'ltr';
    }
    
    // Update page direction if needed
    updatePageDirection() {
        const direction = this.getDirection();
        document.documentElement.dir = direction;
        
        // Add direction class to body for CSS targeting
        document.body.classList.remove('ltr', 'rtl');
        document.body.classList.add(direction);
    }
    
    // Add dynamic translation to new elements
    addDynamicTranslation(element, key, attribute = 'textContent') {
        element.setAttribute('data-i18n', key);
        this.updateElement(element, key, attribute);
    }
    
    // Update single element
    updateElement(element, key, attribute = 'textContent') {
        const translation = this.translate(key);
        if (translation && element[attribute] !== undefined) {
            element[attribute] = translation;
        }
    }
    
    // Get all available languages
    getAvailableLanguages() {
        return LANGUAGE_CONFIG.supportedLanguages.map(code => ({
            code,
            name: this.getLanguageName(code),
            native: this.getNativeLanguageName(code)
        }));
    }
    
    // Get native language name
    getNativeLanguageName(code) {
        const nativeNames = {
            'en': 'English',
            'ms': 'Bahasa Melayu',
            'zh': '简体中文'
        };
        return nativeNames[code] || this.getLanguageName(code);
    }
    
    // Check if language is RTL
    isRTL(language = this.currentLanguage) {
        return this.getDirection(language) === 'rtl';
    }
    
    // Get language with country code
    getLanguageWithCountry() {
        const countryCodes = {
            'en': 'en-US',
            'ms': 'ms-MY',
            'zh': 'zh-CN'
        };
        return countryCodes[this.currentLanguage] || this.currentLanguage;
    }
}

// Create global instance
const languageManager = new LanguageManager();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    languageManager.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = languageManager;
} else {
    window.languageManager = languageManager;
}

// Helper function for quick translations
function t(key, fallback = '') {
    return languageManager.translate(key, fallback);
}

// Helper function for currency formatting
function formatCurrency(amount, currency = 'RM') {
    return languageManager.formatCurrency(amount, currency);
}

// Helper function for date formatting
function formatDate(date, options = {}) {
    return languageManager.formatDate(date, options);
}

// Example usage in HTML:
// <h1 data-i18n="hero.title">Default Title</h1>
// <input data-i18n="auth.email" placeholder="Email">
// <button data-i18n="common.submit">Submit</button>

// Example usage in JavaScript:
// element.textContent = t('nav.home');
// element.placeholder = t('auth.email');
// console.log(formatCurrency(100.50)); // RM 100.50 (in English)

// To change language programmatically:
// languageManager.setLanguage('ms');