const USERS_KEY = "users";
const SESSION_KEY = "session";

function hashPassword(password) {
    return btoa(password);
}

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function register(email, password) {
    const users = getUsers();

    if (users.find(u => u.email === email)) {
        throw new Error("El usuario ya existe");
    }

    users.push({
        email,
        password: hashPassword(password),
        favorites: [],
        cart: []
    });

    saveUsers(users);
}

export async function login(email, password) {
    const users = getUsers();
    const hashed = hashPassword(password);

    let user = users.find(u => u.email === email);

    if (!user) {
        user = {
            email,
            password: hashed,
            favorites: [],
            cart: []
        };
        users.push(user);
        saveUsers(users);
    } else {
        if (user.password !== hashed) {
            throw new Error("Contraseña incorrecta");
        }
    }

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ email: user.email })
    );
}


export function getSession() {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
}

export function getCurrentUser() {
    const session = getSession();
    if (!session) return null;

    const users = getUsers();
    return users.find(u => u.email === session.email) || null;
}

export function logout() {
    localStorage.removeItem(SESSION_KEY);
}
