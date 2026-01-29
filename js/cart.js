import { getCurrentUser, updateUser } from "./auth.js";
import { getData } from "./storage.js";

function getAllProducts() {
    const cafes = getData("cafes") || [];
    const books = getData("books") || [];

    return [
        ...cafes.map(c => ({ ...c, type: "cafe", displayName: c.name })),
        ...books.map(b => ({ ...b, type: "book", displayName: b.title }))
    ];
}

export function addToCart(product) {
    const user = getCurrentUser();
    if (!user) return;

    const existing = user.cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty += 1;
    } else {
        user.cart.push({ id: product.id, qty: 1 });
    }

    updateUser(user);
}

export function removeFromCart(productId) {
    const user = getCurrentUser();
    if (!user) return;

    user.cart = user.cart.filter(item => item.id !== productId);
    updateUser(user);
}

export function getCartItems() {
    const user = getCurrentUser();
    if (!user) return [];

    const products = getAllProducts();

    return user.cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return {
            ...product,
            qty: item.qty,
            subtotal: product.price * item.qty
        };
    });
}

export function getCartTotal() {
    return getCartItems().reduce((sum, item) => sum + item.subtotal, 0);
}

export function getCartCount() {
    const user = getCurrentUser();
    if (!user) return 0;

    return user.cart.reduce((total, item) => total + item.qty, 0);
}
