import { getCurrentUser, logout } from "./auth.js";
import { initLanguage } from "./i18n.js";
import { renderProducts } from "./products.js";
import { seedData } from "./seed.js";
import { initTabs } from "./tabs.js";
import { initTheme } from "./theme.js";

console.log(" app.js is running");

document.addEventListener("DOMContentLoaded", () => {
    const user = getCurrentUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const userEmail = document.getElementById("user-email");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");

    userEmail.textContent = user.email;
    loginBtn.classList.add("d-none");
    logoutBtn.classList.remove("d-none");

    logoutBtn.addEventListener("click", () => {
        logout();
        window.location.href = "login.html";
    });

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
