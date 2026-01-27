const TAB_KEY = "activeTab";

export function initTabs(onTabChange) {
    const tabs = document.querySelectorAll("#product-tabs .nav-link");

    if (!tabs.length) return;

    const savedTab = localStorage.getItem(TAB_KEY) || "all";
    setActiveTab(savedTab, tabs);

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const selectedTab = tab.dataset.tab;
            localStorage.setItem(TAB_KEY, selectedTab);
            setActiveTab(selectedTab, tabs);
            onTabChange();
        });
    });
}

export function getActiveTab() {
    return localStorage.getItem(TAB_KEY) || "all";
}

function setActiveTab(active, tabs) {
    tabs.forEach(tab => {
        tab.classList.toggle("active", tab.dataset.tab === active);
    });
}
