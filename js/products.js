import { getData } from "./storage.js";
import { getActiveTab } from "./tabs.js";
/*import { isFavorite, toggleFavorite } from "./favorites.js";
import { addToCart } from "./cart.js";
*/

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

function sortProducts(products, sortBy) {
    const sorted = [...products];

    switch (sortBy) {
        case "price-asc":
            return sorted.sort((a, b) => a.price - b.price);

        case "price-desc":
            return sorted.sort((a, b) => b.price - a.price);

        case "popular":
        default:
            return sorted.sort((a, b) => b.popularity - a.popularity);
    }
}


function filterByTab(products) {
    const activeTab = getActiveTab();

    if (activeTab === "cafes") {
        return products.filter(p => p.type === "cafe");
    }

    if (activeTab === "books") {
        return products.filter(p => p.type === "book");
    }

    // "all"
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

                ${
                    product.type === "book"
                        ? `<p class="text-muted small mb-2">${product.author}</p>`
                        : ""
                }

                <p class="price mb-2">$${product.price}</p>

                <div class="mt-auto d-flex justify-content-between align-items-center">
                    <button
                        class="btn btn-sm btn-outline-primary add-cart"
                        data-id="${product.id}"
                    >
                        Agregar
                    </button>

                    <button
                        class="btn btn-sm ${
                            favorite ? "btn-danger" : "btn-outline-danger"
                        } toggle-fav"
                        data-id="${product.id}"
                    >
                        ♥
                    </button>
                </div>
            </div>
        </div>
    `;

    // Eventos
    col.querySelector(".add-cart").addEventListener("click", () => {
        addToCart(product);
    });

    col.querySelector(".toggle-fav").addEventListener("click", () => {
        toggleFavorite(product.id);
    });

    return col;
}


const FAVORITES_KEY = "favorites";

function getFavorites() {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

function isFavorite(productId) {
    return getFavorites().includes(productId);
}

function toggleFavorite(productId) {
    let favorites = getFavorites();

    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
    } else {
        favorites.push(productId);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

    renderCurrent();
}



export function renderProducts(sortBy = "popular") {
    

    const grid = document.getElementById("products-grid");
    if (!grid) return;

    let products = getAllProducts();
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

