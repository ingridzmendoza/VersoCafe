import { addToCart, getCartCount } from "./cart.js";
import { isFavorite, toggleFavorite } from "./favorites.js";
import { getData } from "./storage.js";
import { getActiveTab } from "./tabs.js";


function getAllProducts() {
    const cafesData = getData("cafes") || [];
    const booksData = getData("books") || [];

    const cafes = cafesData.map(cafe => ({
        ...cafe,
        type: "cafe",
        displayName: cafe.name
    }));

    const books = booksData.map(book => ({
        ...book,
        type: "book",
        displayName: book.title
    }));

    return [...cafes, ...books];
}

function getFavoritesCountMap() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const countMap = {};

    users.forEach(user => {
        user.favorites.forEach(productId => {
            countMap[productId] = (countMap[productId] || 0) + 1;
        });
    });

    return countMap;
}


export function sortProducts(list, criteria) {
    const sorted = [...list];

    switch (criteria) {
        case "popular":
            sorted.sort((a, b) => b.popularity - a.popularity);
            break;

        case "price-asc":
            sorted.sort((a, b) => a.price - b.price);
            break;

        case "price-desc":
            sorted.sort((a, b) => b.price - a.price);
            break;

        default:
            sorted.sort((a, b) => b.popularity - a.popularity);
            break;
    }

    return sorted;
}

function filterByTab(products) {
    const activeTab = getActiveTab();

    if (activeTab === "cafes") {
        return products.filter(p => p.type === "cafe");
    }

    if (activeTab === "books") {
        return products.filter(p => p.type === "book");
    }

    return products;
}

function createProductCard(product) {
    const col = document.createElement("div");
    col.className = "col";

    const favorite = isFavorite(product.id);

    col.innerHTML = `
        <div class="card h-100 shadow-sm">
            <img
                src="assets/images/${product.type}s/${product.image}"
                class="card-img-top"
                alt="${product.displayName}"
            />

            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.displayName}</h5>

                ${product.type === "book"
            ? `<p class="text-muted small mb-2">${product.author}</p>`
            : ""
        }

                <p class="price mb-2">$${product.price}</p>
                
                <small class="text-muted mb-2">
                    ❤️ ${product.popularity}
                </small>

                <div class="mt-auto d-flex justify-content-between align-items-center">
                    <button
                        class="btn btn-sm btn-outline-primary add-cart"
                        data-id="${product.id}"
                    >
                        Agregar
                    </button>

                    <button
                        class="btn btn-sm ${favorite ? "btn-danger" : "btn-outline-danger"
        } toggle-fav"
                        data-id="${product.id}"
                    >
                        ♥
                    </button>
                </div>
            </div>
        </div>
    `;

    col.querySelector(".add-cart").addEventListener("click", () => {
        addToCart(product);

        const cartCount = document.getElementById("cart-count");
        if (cartCount) {
            cartCount.textContent = getCartCount();
        }
    });


    col.querySelector(".toggle-fav").addEventListener("click", () => {
        toggleFavorite(product.id);
        renderProducts();
    });


    return col;
}

export function renderProducts(sortBy = "popular") {


    const grid = document.getElementById("products-grid");
    if (!grid) return;

    const favoritesMap = getFavoritesCountMap();

    let products = getAllProducts().map(product => ({
        ...product,
        popularity: favoritesMap[product.id] || 0
    }));


    products = filterByTab(products);
    products = sortProducts(products, sortBy);

    grid.innerHTML = "";

    if (products.length === 0) {
        grid.innerHTML = `<p class="text-center text-muted">No hay productos para mostrar</p>`;
        return;
    }

    products.forEach(product => {
        grid.appendChild(createProductCard(product));
    });
}

