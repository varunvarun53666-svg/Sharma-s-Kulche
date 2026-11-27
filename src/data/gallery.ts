// Swap these for your own photos. kind decides which filter tab shows them.
import hero from "@/assets/hero-kulcha.jpg";
import chole from "@/assets/chole-kulche.jpg";
import stuffed from "@/assets/stuffed-kulcha.jpg";
import lassi from "@/assets/lassi.jpg";
import chaat from "@/assets/chaat.jpg";
import dessert from "@/assets/dessert.jpg";
import making from "@/assets/making-kulcha.jpg";
import interior from "@/assets/branch-interior.jpg";
import storefront from "@/assets/branch-storefront.jpg";

export const galleryFilters = ["All", "Food", "Branches", "Making of Kulche"] as const;
export type GalleryKind = Exclude<(typeof galleryFilters)[number], "All">;
export type GalleryItem = { src: string; alt: string; kind: GalleryKind; tall?: boolean; video?: string };

export const gallery: GalleryItem[] = [
  { src: hero, alt: "Butter kulche sizzling on the tawa", kind: "Food", tall: true },
  { src: storefront, alt: "Sharma's Kulche storefront with glowing sign", kind: "Branches", tall: true },
  { src: chole, alt: "Chole kulche plate with onions and chutney", kind: "Food" },
  { src: making, alt: "Kulcha being slapped onto the hot tawa", kind: "Making of Kulche" },
  { src: hero, alt: "Tawa action video", kind: "Making of Kulche", video: "/videos/tawa-hero.mp4", tall: true },
  { src: stuffed, alt: "Paneer kulcha cut open", kind: "Food" },
  { src: interior, alt: "Inside a Sharma's Kulche branch", kind: "Branches" },
  { src: lassi, alt: "Malai lassi in a kulhad", kind: "Food", tall: true },
  { src: chaat, alt: "Aloo tikki chaat and samosa", kind: "Food" },
  { src: dessert, alt: "Gulab jamun and rabri", kind: "Food" },
];
