function toggleCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const cartSidebar = document.querySelector('.cart-sidebar');
        const cartOverlay = document.querySelector('.cart-overlay');
        
        if (cartSidebar.classList.contains('active')) {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
        }
    }
});

const searchInput = document.querySelector('.search-bar input');
const searchSuggestions = document.querySelector('.search-suggestions');
const productCards = document.querySelectorAll('.product-card');

searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    searchSuggestions.innerHTML = '';
    
    if (searchTerm === '') {
        searchSuggestions.classList.remove('active');
        return;
    }
    
    const matchingProducts = [];
    productCards.forEach(card => {
        const title = card.querySelector('.product-title').textContent;
        const price = card.querySelector('.product-price').textContent;
        const imageDiv = card.querySelector('.product-image');
        
        let category = 'Produto';
        let currentElement = card.parentElement;
        while (currentElement) {
            const prevHeader = currentElement.previousElementSibling;
            if (prevHeader && prevHeader.classList.contains('section-header')) {
                category = prevHeader.textContent;
                break;
            }
            currentElement = currentElement.previousElementSibling;
        }
        
        if (title.toLowerCase().includes(searchTerm) || price.toLowerCase().includes(searchTerm)) {
            matchingProducts.push({ 
                title, 
                price, 
                card,
                imageHtml: imageDiv.innerHTML,
                category: category
            });
        }
    });
    
    if (matchingProducts.length > 0) {
        matchingProducts.forEach(product => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'search-suggestion-item';
            suggestionItem.innerHTML = `
                <div class="suggestion-image">
                    ${product.imageHtml}
                </div>
                <div class="suggestion-content">
                    <div class="suggestion-title">${product.title}</div>
                    <div class="suggestion-category">${product.category}</div>
                </div>
                <div class="suggestion-price">${product.price}</div>
            `;
            
            suggestionItem.addEventListener('click', () => {
                product.card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                product.card.style.animation = 'highlight 1s ease';
                searchInput.value = '';
                searchSuggestions.classList.remove('active');
            });
            
            searchSuggestions.appendChild(suggestionItem);
        });
        searchSuggestions.classList.add('active');
    } else {

        searchSuggestions.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search"></i>
                <div>Nenhum produto encontrado</div>
            </div>
        `;
        searchSuggestions.classList.add('active');
    }
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-bar')) {
        searchSuggestions.classList.remove('active');
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes highlight {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.03); box-shadow: 0 10px 40px rgba(0, 191, 255, 0.4); }
    }
`;
document.head.appendChild(style);