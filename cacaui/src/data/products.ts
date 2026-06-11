import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "creme",
    name: "Cacauí Creme",
    description:
      "Chocolate cremoso com notas suaves de baunilha.",
    price: 2.5,
    image: "/creme.jpg",
    stock: 150,
  },

  {
    id: "amendoa",
    name: "Cacauí Amêndoa",
    description:
      "Chocolate com amêndoas caramelizadas e crocância marcante.",
    price: 2.8,
    image: "/amendoa.jpg",
    stock: 120,
  },
];