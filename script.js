// Funcionalidad del carrito de compras
document.addEventListener('DOMContentLoaded', function() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartSection = document.querySelector('.cart-section');
    const closeCart = document.querySelector('.close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.querySelector('.cart-count');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    let cart = [];
    let total = 0;
    
    // Abrir/cerrar carrito
    cartToggle.addEventListener('click', function(e) {
        e.preventDefault();
        cartSection.style.display = 'block';
    });
    
    closeCart.addEventListener('click', function() {
        cartSection.style.display = 'none';
    });
    
    // Agregar productos al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            
            // Verificar si el producto ya está en el carrito
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: id,
                    name: name,
                    price: price,
                    quantity: 1
                });
            }
            
            updateCart();
            cartSection.style.display = 'block';
        });
    });
    
    // Actualizar carrito
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="cart-item-img"></div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">S/ ${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" data-id="${item.id}">
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">Eliminar</button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        cartTotalElement.textContent = total.toFixed(2);
        cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Agregar eventos a los botones de cantidad y eliminar
        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const item = cart.find(item => item.id === id);
                
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    updateCart();
                }
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const item = cart.find(item => item.id === id);
                
                item.quantity += 1;
                updateCart();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                cart = cart.filter(item => item.id !== id);
                updateCart();
            });
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const id = this.getAttribute('data-id');
                const item = cart.find(item => item.id === id);
                const newQuantity = parseInt(this.value);
                
                if (newQuantity > 0) {
                    item.quantity = newQuantity;
                    updateCart();
                } else {
                    this.value = item.quantity;
                }
            });
        });
    }
    
    // Procesar compra
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        
        alert('¡Gracias por tu compra! Total: S/ ' + total.toFixed(2));
        cart = [];
        updateCart();
        cartSection.style.display = 'none';
    });
    
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});