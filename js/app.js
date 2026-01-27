import { seedData } from "./seed.js";
import { renderProducts } from "./products.js";
import { initTabs } from "./tabs.js";
import { initTheme } from "./theme.js";
import { initLanguage } from "./i18n.js";

console.log(" app.js is running");


document.addEventListener("DOMContentLoaded", () => {
    
    seedData();

    const cafes = JSON.parse(localStorage.getItem("cafes")) || [];
    const books = JSON.parse(localStorage.getItem("books")) || [];

    let currentType = "cafes";

    const renderCurrent = (sort = null) => {
        const data = currentType === "cafes" ? cafes : books;
        renderProducts(data, sort);
    };

    renderCurrent();

    initTabs(type => {
        currentType = type;
        renderCurrent();
    });

    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
        sortSelect.addEventListener("change", e => {
            renderCurrent(e.target.value);
        });
    }

    initTheme();
    initLanguage();
});
