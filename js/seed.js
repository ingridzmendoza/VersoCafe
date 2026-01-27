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
            },
            {
                id: "cafe-4",
                name: "Americano",
                price: 45,
                popularity: 110,
                image: "coffee.jpg"
            },
            {
                id: "cafe-5",
                name: "Espresso",
                price: 40,
                popularity: 130,
                image: "coffee.jpg"
            },
            {
                id: "cafe-6",
                name: "Latte Caramelo",
                price: 68,
                popularity: 90,
                image: "coffee.jpg"
            },
            {
                id: "cafe-7",
                name: "Mocha",
                price: 72,
                popularity: 85,
                image: "coffee.jpg"
            },
            {
                id: "cafe-8",
                name: "Flat White",
                price: 62,
                popularity: 75,
                image: "coffee.jpg"
            },
            {
                id: "cafe-9",
                name: "Macchiato",
                price: 55,
                popularity: 70,
                image: "coffee.jpg"
            },
            {
                id: "cafe-10",
                name: "Affogato",
                price: 78,
                popularity: 65,
                image: "coffee.jpg"
            },
            {
                id: "cafe-11",
                name: "Café Mocha Blanco",
                price: 75,
                popularity: 60,
                image: "coffee.jpg"
            },
            {
                id: "cafe-12",
                name: "Irish Coffee",
                price: 85,
                popularity: 55,
                image: "coffee.jpg"
            },
            {
                id: "cafe-13",
                name: "Honey Latte",
                price: 70,
                popularity: 50,
                image: "coffee.jpg"
            },
            {
                id: "cafe-14",
                name: "Chai Latte",
                price: 65,
                popularity: 45,
                image: "coffee.jpg"
            },
            {
                id: "cafe-15",
                name: "Carajillo",
                price: 80,
                popularity: 40,
                image: "coffee.jpg"
            }
        ];

        setData("cafes", cafes);
    }

    if (!localStorage.getItem("books")) {
        const books = [
            {
                id: "book-1",
                title: "Strange Weather in Tokyo",
                author: "Hiromi Kawakami",
                price: 320,
                popularity: 110,
                image: "strange-weather-in-tokyo.jpg"
            },
            {
                id: "book-2",
                title: "Never Let Me Go",
                author: "Kazuo Ishiguro",
                price: 280,
                popularity: 90,
                image: "never-let-me-go.jpg"
            },
            {
                id: "book-3",
                title: "Alchemised",
                author: "Sen Lin Yu",
                price: 250,
                popularity: 130,
                image: "alchemised.jpg"
            },
            {
                id: "book-4",
                title: "White Nights",
                author: "Fyodor Dostoevsky",
                price: 300,
                popularity: 85,
                image: "white-nights.jpg"
            },
            {
                id: "book-5",
                title: "Blood Meridian",
                author: "Cormac McCarthy",
                price: 350,
                popularity: 95,
                image: "blood-meridian.jpg"
            },
            {
                id: "book-6",
                title: "Lapvona",
                author: "Ottessa Moshfegh",
                price: 330,
                popularity: 70,
                image: "lapvona.jpg"
            },
            {
                id: "book-7",
                title: "The Poppy War",
                author: "R.F. Kuang",
                price: 370,
                popularity: 120,
                image: "the-poppy-war.jpg"
            },
            {
                id: "book-8",
                title: "Pride & Prejudice",
                author: "Jane Austen",
                price: 280,
                popularity: 140,
                image: "pride-and-prejudice.jpg"
            },
            {
                id: "book-9",
                title: "The Master and Margarita",
                author: "Mikhail Bulgakov",
                price: 400,
                popularity: 100,
                image: "the-master-and-margarita.jpg"
            },
            {
                id: "book-10",
                title: "Penpal",
                author: "Dathan Auerbach",
                price: 260,
                popularity: 80,
                image: "penpal.jpg"
            },
            {
                id: "book-11",
                title: "Before The Coffee Gets Cold",
                author: "Toshikazu Kawaguchi",
                price: 290,
                popularity: 75,
                image: "before-the-coffee-gets-cold.jpg"
            },
            {
                id: "book-12",
                title: "No Longer Human",
                author: "Osamu Dazai",
                price: 310,
                popularity: 115,
                image: "no-longer-human.png"
            },
            {
                id: "book-13",
                title: "House of Leaves",
                author: "Mark Z. Danielewski",
                price: 380,
                popularity: 90,
                image: "house-of-leaves.jpg"
            },
            {
                id: "book-14",
                title: "Borrasca",
                author: "C.K. Walker",
                price: 270,
                popularity: 65,
                image: "borrasca.jpg"
            },
            {
                id: "book-15",
                title: "My Year of Rest and Relaxation",
                author: "Ottessa Moshfegh",
                price: 320,
                popularity: 110,
                image: "my-year-of-rest-and-relaxation.jpg"
            }
        ];

        setData("books", books);
    }
}

seedData();
