import { getCartItems, getCartTotal, removeFromCart } from "./cart.js";
import { getCurrentUser } from "./auth.js";


const list = document.getElementById("cart-list");
const totalEl = document.getElementById("cart-total");

function renderCart() {
    const items = getCartItems();
    list.innerHTML = "";

    if (items.length === 0) {
        list.innerHTML = `<p class="text-muted">Tu carrito está vacío.</p>`;
        totalEl.textContent = "0";
        return;
    }

    items.forEach(item => {
        const col = document.createElement("div");
        col.className = "col-md-6";

        col.innerHTML = `
        <div class="card shadow-sm">
            <div class="card-body d-flex justify-content-between align-items-center">
            <div>
                <h5 class="mb-1">${item.displayName}</h5>
                <small class="text-muted">
                $${item.price} × ${item.qty}
                </small>
            </div>

            <div class="text-end">
                <p class="fw-bold mb-2">$${item.subtotal}</p>
                <button class="btn btn-sm btn-outline-danger">
                Eliminar
                </button>
            </div>
            </div>
        </div>
        `;

        col.querySelector("button").addEventListener("click", () => {
            removeFromCart(item.id);
            renderCart();
        });

        list.appendChild(col);
    });

    totalEl.textContent = getCartTotal();
}

renderCart();

const payBtn = document.getElementById("pay-btn");

if (payBtn) {
    payBtn.addEventListener("click", () => {
        const user = getCurrentUser();

        if (!user || !user.cart || user.cart.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        alert("Pago realizado con éxito. ¡Gracias por tu compra!");

        user.cart = [];

        localStorage.setItem("users", JSON.stringify(
            JSON.parse(localStorage.getItem("users")).map(u =>
                u.id === user.id ? user : u
            )
        ));

        location.reload();
    });
}
