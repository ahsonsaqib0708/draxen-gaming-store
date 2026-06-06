// Shared Storefront JavaScript for DRAXEN Gaming Store
(() => {
    const CART_KEY = 'draxen_cart_v1';

    // Helper: Read Cart from LocalStorage
    function readCart() {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch {
            return [];
        }
    }

    // Helper: Save Cart to LocalStorage
    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartBadge();
    }

    // Helper: Toast notification
    function showToast(message) {
        let node = document.querySelector('.draxen-toast');
        if (!node) {
            node = document.createElement('div');
            node.className = 'draxen-toast';
            node.style.cssText = 'position:fixed;right:24px;bottom:24px;z-index:9999;background:#00f2ff;color:#00363a;padding:14px 18px;font-family:"JetBrains Mono",monospace;font-size:12px;text-transform:uppercase;box-shadow:0 0 24px rgba(0,242,255,.35);transform:translateY(16px);opacity:0;transition:all .25s ease;';
            document.body.appendChild(node);
        }
        node.textContent = message;
        // Trigger CSS reflow
        node.offsetHeight;
        node.style.transform = 'translateY(0)';
        node.style.opacity = '1';
        clearTimeout(node._timer);
        node._timer = setTimeout(() => {
            node.style.transform = 'translateY(16px)';
            node.style.opacity = '0';
        }, 2600);
    }

    // Helper: Add to Cart
    function addToCart(product, quantity = 1) {
        const cart = readCart();
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                slug: product.slug || product.id,
                name: product.name,
                price: Number(product.price || 0),
                quantity
            });
        }
        saveCart(cart);
        showToast(`${product.name} added to cart`);
    }

    // Helper: Update Navigation Cart Badge
    function updateCartBadge() {
        const cart = readCart();
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);

        // Find any element containing shopping_cart icon
        document.querySelectorAll('button, a').forEach(element => {
            const icon = element.querySelector('.material-symbols-outlined');
            if (icon && icon.textContent.trim() === 'shopping_cart' || element.textContent.includes('shopping_cart')) {
                // If it is an anchor wrapper we created, style it
                element.style.position = 'relative';
                
                let badge = element.querySelector('.draxen-cart-badge');
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'draxen-cart-badge';
                    badge.style.cssText = 'position:absolute;top:-8px;right:-10px;background:#00f2ff;color:#00363a;border-radius:999px;min-width:18px;height:18px;padding:0 5px;font:700 11px/18px JetBrains Mono,monospace;text-align:center;box-shadow: 0 0 10px rgba(0,242,255,0.4);';
                    element.appendChild(badge);
                }
                badge.textContent = count;
            }
        });
    }

    // Search functionality
    async function runSearch() {
        const query = prompt('Search DRAXEN gear:');
        if (!query) return;
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            const match = data.products.find(p => 
                p.name.toLowerCase().includes(query.toLowerCase()) || 
                p.category.toLowerCase().includes(query.toLowerCase())
            );
            if (match) {
                addToCart(match);
            } else {
                showToast('No matching gear found');
            }
        } catch {
            showToast('Search service unavailable');
        }
    }

    // Initialize listeners
    document.addEventListener('DOMContentLoaded', () => {
        updateCartBadge();

        // Bind search buttons
        document.querySelectorAll('button, a').forEach(element => {
            const icon = element.querySelector('.material-symbols-outlined');
            if (icon && icon.textContent.trim() === 'search' || element.textContent.includes('search')) {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    runSearch();
                });
            }
        });

        // Add visual micro-interaction for active nav links
        const currentPath = window.location.pathname;
        document.querySelectorAll('nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
                link.classList.remove('text-on-surface-variant');
                link.classList.add('text-secondary', 'border-b-2', 'border-secondary', 'pb-1');
            }
        });
    });

    // Expose helpers globally
    window.DraxenCart = {
        readCart,
        saveCart,
        addToCart,
        updateCartBadge,
        showToast
    };
})();
