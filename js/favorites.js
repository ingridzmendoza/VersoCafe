import { getCurrentUser, updateUser } from "./auth.js";

export function isFavorite(productId) {
    const user = getCurrentUser();
    if (!user) return false;
    return user.favorites.includes(productId);
}

export function toggleFavorite(productId) {
    const user = getCurrentUser();
    if (!user) return;

    if (user.favorites.includes(productId)) {
        user.favorites = user.favorites.filter(id => id !== productId);
    } else {
        user.favorites.push(productId);
    }

    updateUser(user);
}
