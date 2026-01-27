import { setData } from "./storage.js";

export function seedData() {
    if (!localStorage.getItem("cafes")) {
        const cafes = [
            {
                id: "cafe-1",
                name: "Latte Vainilla",
                price: 65,
                popularity: 120,
                image: "coffee.jpg"
            },
            {
                id: "cafe-2",
                name: "Cappuccino",
                price: 60,
                popularity: 95,
                image: "coffee.jpg"
            },
            {
                id: "cafe-3",
                name: "Cold Brew",
                price: 70,
                popularity: 80,
                image: "coffee.jpg"
            }
        ];

        setData("cafes", cafes);
    }

    if (!localStorage.getItem("books")) {
        const books = [
            {
                id: "book-1",
                title: "El infinito en un junco",
                author: "Irene Vallejo",
                price: 320,
                popularity: 110,
                image: "book.jpg"
            },
            {
                id: "book-2",
                title: "Rayuela",
                author: "Julio Cortázar",
                price: 280,
                popularity: 90,
                image: "book.jpg"
            },
            {
                id: "book-3",
                title: "1984",
                author: "George Orwell",
                price: 250,
                popularity: 130,
                image: "book.jpg"
            }
        ];

        setData("books", books);
    }
}

seedData();
