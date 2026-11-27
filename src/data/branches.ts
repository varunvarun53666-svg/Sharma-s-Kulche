// Edit branch details here — every page reads from this one file.
// hours: per weekday (0 = Sunday … 6 = Saturday), 24h "HH:MM". Use null for a closed day.
import interior from "@/assets/branch-interior.jpg";
import storefront from "@/assets/branch-storefront.jpg";
import bharathiyaCity from "@/assets/bharathiya-city.jpg";

export type DayHours = { open: string; close: string } | null;

export type Branch = {
  slug: string;
  name: string;
  area: string;
  address: string;
  phone: string; // digits with country code, e.g. 919876543210
  phoneDisplay: string;
  hours: DayHours[];
  hoursLabel: string;
  mapsQuery: string;
  image: string;
  lat: number;
  lng: number;
};

const everyday = (open: string, close: string): DayHours[] => Array.from({ length: 7 }, () => ({ open, close }));

export const branches: Branch[] = [
  {
    slug: "kammanahalli",
    name: "Kammanahalli",
    area: "East Bengaluru",
    address: "[ADDRESS] Main Road, Kammanahalli, Bengaluru, Karnataka 560084",
    phone: "919000000001",
    phoneDisplay: "+91 90000 00001",
    hours: everyday("11:00", "23:00"),
    hoursLabel: "Every day · 11:00 AM – 11:00 PM",
    mapsQuery: "Sharma's Kulche Kammanahalli Bengaluru",
    image: storefront,
    lat: 13.0159,
    lng: 77.6379,
  },
  {
    slug: "vv-puram",
    name: "VV Puram",
    area: "Food Street, South Bengaluru",
    address: "[ADDRESS] VV Puram Food Street, Basavanagudi, Bengaluru, Karnataka 560004",
    phone: "919000000002",
    phoneDisplay: "+91 90000 00002",
    hours: everyday("16:00", "23:30"),
    hoursLabel: "Every day · 4:00 PM – 11:30 PM",
    mapsQuery: "Sharma's Kulche VV Puram Bengaluru",
    image: interior,
    lat: 12.9496,
    lng: 77.5735,
  },
  {
    slug: "bharathiya-city",
    name: "Bharathiya City",
    area: "North Bengaluru",
    address: "[ADDRESS] Bhartiya City Mall, Thanisandra Main Road, Bengaluru, Karnataka 560064",
    phone: "919000000003",
    phoneDisplay: "+91 90000 00003",
    hours: everyday("11:00", "22:30"),
    hoursLabel: "Every day · 11:00 AM – 10:30 PM",
    mapsQuery: "Sharma's Kulche Bhartiya City Bengaluru",
    image: bharathiyaCity,
    lat: 13.0817,
    lng: 77.6406,
  },
];

export const brand = {
  name: "Sharma's Kulche",
  whatsapp: "919000000001", // [WHATSAPP] number, digits only
  instagram: "https://instagram.com/", // [INSTAGRAM]
  facebook: "https://facebook.com/", // [FACEBOOK]
  googleReviewLink: "https://www.google.com/maps/search/?api=1&query=Sharma%27s+Kulche+Bengaluru", // [GOOGLE_REVIEW_LINK]
  stats: { customers: 150000, years: 8 }, // [X] placeholders
};

export const directionsUrl = (b: Branch) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(b.mapsQuery)}`;
export const embedUrl = (b: Branch) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(b.mapsQuery)}&z=15&output=embed`;
export const whatsappUrl = (text: string, number = brand.whatsapp) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
