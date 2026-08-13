import { ImageSourcePropType } from "react-native";

export type Business = {
  id: string;
  name: string;
  location: string;
  description: string;
  tags: string[];
  image: ImageSourcePropType;
};

export const BUSINESSES: Business[] = [
  {
    id: "1",
    name: "Rising Raven Roastery",
    location: "Fife, Washington",
    description:
      "Small-batch beans roasted in Fife on the Puget Sound, cup by cup. We source from Indigenous-run farms and roast to order.",
    tags: ["Coffee & Beverages", "Grocery & Retail"],
    image: require("../../assets/images/businesses/coffee.jpg"),
  },
  {
    id: "2",
    name: "1855 Plants",
    location: "Gresham, Oregon",
    description:
      "1855 Plants grows containerized natives from Washington to California, including traditional Indigenous first foods and pollinator plants.",
    tags: ["Farms & Ranches", "Herbal & Foraged"],
    image: require("../../assets/images/businesses/plants.jpg"),
  },
  {
    id: "3",
    name: "Brigham Fish Market",
    location: "Cascade Locks, Oregon",
    description:
      "We are a local Native American family of fishermen and women, dedicated to providing you with fresh, wild caught salmon.",
    tags: ["Seafood"],
    image: require("../../assets/images/businesses/seafood.jpg"),
  },
  {
    id: "4",
    name: "Cedar & Sage Bakery",
    location: "Spokane, Washington",
    description:
      "Handcrafted breads and pastries made with heritage grains and traditional recipes passed down through generations.",
    tags: ["Bakery Foods", "Grocery & Retail"],
    image: require("../../assets/images/businesses/bakery.jpg"),
  },
];

export function getBusinessById(id: string | undefined): Business | undefined {
  return BUSINESSES.find((b) => b.id === id);
}
