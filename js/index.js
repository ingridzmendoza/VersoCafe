import { renderProducts } from "./products.js";

document.addEventListener("DOMContentLoaded", () => {
    renderProducts("popular");

    const sortSelect = document.getElementById("sort-select");

    if (sortSelect) {
        sortSelect.addEventListener("change", e => {
            renderProducts(e.target.value);
        });
    }
});
