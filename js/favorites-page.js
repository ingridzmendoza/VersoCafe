import { getCurrentUser } from "./auth.js";
import { getData } from "./storage.js";

const container = document.getElementById("favorites-list");
const user = getCurrentUser();

if (!user || user.favorites.length === 0) {
    container.innerHTML = `
        <p class="text-muted">No tienes productos favoritos.</p>
    `;
} else {
    const cafes = getData("cafes") || [];
    const books = getData("books") || [];

    const allProducts = [
        ...cafes.map(c => ({
            ...c,
            type: "cafe",
            displayName: c.name
        })),
        ...books.map(b => ({
            ...b,
            type: "book",
            displayName: b.title
        }))
    ];

    const favoriteProducts = allProducts.filter(p =>
        user.favorites.includes(p.id)
    );

    container.innerHTML = "";

    favoriteProducts.forEach(p => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img
                    src="assets/images/${p.type}s/${p.image}"
                    class="card-img-top"
                    alt="${p.displayName}"
                />
                <div class="card-body">
                    <h5 class="card-title">${p.displayName}</h5>
                    <p class="price">$${p.price}</p>
                </div>
            </div>
        `;

        container.appendChild(col);
    });
}
