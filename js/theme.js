const THEME_KEY = "theme";

export function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || "light";
    setTheme(savedTheme);

    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
        const current = document.body.dataset.theme;
        const next = current === "dark" ? "light" : "dark";

        setTheme(next);
        localStorage.setItem(THEME_KEY, next);
    });
}

function setTheme(theme) {
    document.body.dataset.theme = theme;
}
