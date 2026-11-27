// Edit the menu here. Images: swap the imports below for your real photos.
import hero from "@/assets/hero-kulcha.jpg";
import chole from "@/assets/chole-kulche.jpg";
import stuffed from "@/assets/stuffed-kulcha.jpg";
import lassi from "@/assets/lassi.jpg";
import chaat from "@/assets/chaat.jpg";
import dessert from "@/assets/dessert.jpg";

export const categories = ["Kulche", "Chole", "Combos", "Snacks", "Beverages", "Desserts"] as const;
export type Category = (typeof categories)[number];

export type MenuItem = { id: string; name: string; desc: string; price: number; category: Category; veg: boolean; bestseller?: boolean; image: string };

export const menu: MenuItem[] = [
  { id: "amritsari", name: "Amritsari Aloo Kulcha", desc: "Crisp-edged, butter-soaked, stuffed with spiced potato and onion.", price: 140, category: "Kulche", veg: true, bestseller: true, image: stuffed },
  { id: "paneer", name: "Paneer Kulcha", desc: "Soft dough wrapped around masala paneer, finished with white butter.", price: 170, category: "Kulche", veg: true, bestseller: true, image: stuffed },
  { id: "butter", name: "Butter Kulcha", desc: "Plain, pillowy and glistening straight off the tawa.", price: 70, category: "Kulche", veg: true, image: hero },
  { id: "gobhi", name: "Gobhi Kulcha", desc: "Grated cauliflower, green chilli and ajwain, Delhi-style.", price: 150, category: "Kulche", veg: true, image: stuffed },
  { id: "mix", name: "Mix Veg Kulcha", desc: "Loaded with paneer, potato, onion and coriander.", price: 180, category: "Kulche", veg: true, image: hero },
  { id: "pindi", name: "Pindi Chole", desc: "Dark, tangy chickpeas slow-cooked with whole spices.", price: 120, category: "Chole", veg: true, bestseller: true, image: chole },
  { id: "matar", name: "Delhi Matra", desc: "White peas street-style with lemon, onion and masala.", price: 110, category: "Chole", veg: true, image: chole },
  { id: "chole-kulche", name: "Chole Kulche Plate", desc: "Two butter kulche, a bowl of pindi chole, onions and chutney.", price: 180, category: "Combos", veg: true, bestseller: true, image: chole },
  { id: "thali", name: "Sharma's Thali", desc: "Stuffed kulcha, chole, raita, salad, pickle and a sweet lassi.", price: 280, category: "Combos", veg: true, image: chole },
  { id: "samosa", name: "Punjabi Samosa (2)", desc: "Flaky, peppery, served with mint and tamarind chutneys.", price: 60, category: "Snacks", veg: true, image: chaat },
  { id: "tikki", name: "Aloo Tikki Chaat", desc: "Crisp patties, curd, sev, pomegranate and sweet-sour chutneys.", price: 110, category: "Snacks", veg: true, bestseller: true, image: chaat },
  { id: "lassi", name: "Malai Lassi", desc: "Thick, chilled and topped with a layer of fresh malai.", price: 90, category: "Beverages", veg: true, bestseller: true, image: lassi },
  { id: "chaas", name: "Masala Chaas", desc: "Spiced buttermilk with roasted jeera and mint.", price: 50, category: "Beverages", veg: true, image: lassi },
  { id: "gulab", name: "Gulab Jamun (2)", desc: "Warm, syrupy and melt-in-the-mouth.", price: 70, category: "Desserts", veg: true, image: dessert },
  { id: "rabri", name: "Rabri", desc: "Slow-reduced milk with saffron and pistachio.", price: 100, category: "Desserts", veg: true, image: dessert },
];
