// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    });
}

// Cart Functionality
let cartCount = 0;
let isLoggedIn = false; // Track login state
const cartButton = document.querySelector('.btn-cart');
const buyButtons = document.querySelectorAll('.btn-add');

if (cartButton && buyButtons) {
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!isLoggedIn) {
                // Show login popup if not logged in
                showLoginPopupForCart(button);
            } else {
                // Add to cart directly if logged in
                cartCount++;
                cartButton.textContent = `Cart (${cartCount})`;
                alert('Item added to cart!');
            }
        });
    });
}

// Search Functionality
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchBtn && searchInput && searchResults) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchResults.innerHTML = `<p>Search for "${query}" is not yet connected to a database.</p>`;
        } else {
            searchResults.innerHTML = '<p>Please enter a drug name.</p>';
        }
    });
}

// Login/Signup Popup Functionality
const loginBtn = document.getElementById('loginBtn');
const authPopup = document.getElementById('authPopup');
const closePopup = document.getElementById('closePopup');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');

let pendingBuyButton = null; // Store the button that triggered the login

if (loginBtn && authPopup && closePopup && loginForm && signupForm && showSignup && showLogin) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        authPopup.style.display = 'flex';
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    });

    closePopup.addEventListener('click', () => {
        authPopup.style.display = 'none';
        pendingBuyButton = null; // Clear pending action
    });

    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
    });

    authPopup.addEventListener('click', (e) => {
        if (e.target === authPopup) {
            authPopup.style.display = 'none';
            pendingBuyButton = null; // Clear pending action
        }
    });

    loginForm.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        console.log('Login attempt:', { email, password });
        // Simulate successful login (replace with real authentication later)
        isLoggedIn = true;
        alert('Login successful! (This is a demo)');
        authPopup.style.display = 'none';
        // If there’s a pending buy action, complete it
        if (pendingBuyButton) {
            cartCount++;
            cartButton.textContent = `Cart (${cartCount})`;
            alert('Item added to cart!');
            pendingBuyButton = null;
        }
    });

    signupForm.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('signupFullName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        console.log('Signup attempt:', { fullName, email, password });
        // Simulate successful signup and auto-login (replace with real logic later)
        isLoggedIn = true;
        alert('Signup successful! You are now logged in. (This is a demo)');
        authPopup.style.display = 'none';
        // If there’s a pending buy action, complete it
        if (pendingBuyButton) {
            cartCount++;
            cartButton.textContent = `Cart (${cartCount})`;
            alert('Item added to cart!');
            pendingBuyButton = null;
        }
    });
}

// Function to show login popup when Buy is clicked
function showLoginPopupForCart(button) {
    pendingBuyButton = button; // Store the button that triggered this
    authPopup.style.display = 'flex';
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
}

// Category Toggle
const categoryButtons = document.querySelectorAll('.category-btn');
const categories = document.querySelectorAll('.category');

if (categoryButtons && categories) {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            categories.forEach(cat => {
                if (category === 'all' || cat.getAttribute('data-category') === category) {
                    cat.classList.add('active');
                } else {
                    cat.classList.remove('active');
                }
            });
        });
    });

    const defaultButton = document.querySelector('.category-btn[data-category="all"]');
    if (defaultButton) {
        defaultButton.click();
    }
}