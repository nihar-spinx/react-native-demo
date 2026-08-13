import { ImageSourcePropType } from "react-native";

export type Product = {
  id: string;
  name: string;
  type: string;
  price: number;
  rating: number; // 0–5, supports halves
  image: ImageSourcePropType;
};

export const PRODUCT_TYPES = [
  "All Product Types",
  "Seafood",
  "Meat & Jerky",
  "Pantry",
  "Herbal",
] as const;

export const PRICE_RANGES = [
  "All Prices",
  "Under $20",
  "$20 – $40",
  "Over $40",
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Alder-Smoked Oysters",
    type: "Seafood",
    price: 42,
    rating: 4,
    image: require("../../assets/images/products/oysters.jpg"),
  },
  {
    id: "2",
    name: "Bison Jerky Trio",
    type: "Meat & Jerky",
    price: 34,
    rating: 4.5,
    image: require("../../assets/images/products/jerky.jpg"),
  },
  {
    id: "3",
    name: "Blue Corn Mush Mix",
    type: "Pantry",
    price: 14,
    rating: 5,
    image: require("../../assets/images/products/salmon.jpg"),
  },
  {
    id: "4",
    name: "Cedar & Sage Smudge Bundle",
    type: "Herbal",
    price: 16,
    rating: 4.5,
    image: require("../../assets/images/products/smudge.jpg"),
  },
];

export function getProductById(id: string | undefined): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
