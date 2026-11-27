# Sharma’s Kulche

Build a stunning, premium, mobile-first multi-page website for "Sharma's Kulche", a beloved Indian street-food restaurant in Bengaluru with 3 branches: Kammanahalli, VV Puram and Bharathiya City. The site should make people hungry the moment it loads. Think cinematic food photography, warm colours, smooth animations and a modern but authentic Delhi-style street-food personality.

TECH
React + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion + React Router. Fully responsive (mobile first, since most visitors will come from phones). Use Supabase for the review feature.

BRAND & DESIGN
- Palette: deep saffron/orange (#E8710A), rich tomato red (#B3261E), warm cream (#FFF6E5), charcoal (#1C1410), with a touch of golden yellow for highlights.
- Fonts: a bold, characterful display font for headings (e.g. "Playfair Display" or "Abril Fatface"), and "Poppins" or "Inter" for body text.
- Style: warm, appetizing, slightly textured backgrounds (subtle paper/tandoor-smoke texture), rounded cards, soft shadows, big photography, generous spacing.
- Micro-interactions: fade-up on scroll, image hover zoom, parallax sections, animated section dividers, a sticky transparent-to-solid navbar, smooth page transitions.
- Add a small steam/spice-particle or floating-ingredient animation in the hero for extra life.
- Logo: a simple text logo "Sharma's Kulche" in the display font with a small kulcha or tawa icon. Leave a clear spot to swap in the real logo later.

PAGES (6 total, with a shared navbar and footer)

1. HOME
- Full-screen hero with a looping, muted, autoplay background video ([VIDEO_FILE]) with a dark gradient overlay. Add a poster image fallback for slow connections.
- Headline: "Soft. Buttery. Straight off the Tawa." Subheadline: "Bengaluru's favourite kulche, served fresh at 3 branches." Two buttons: "View Menu" and "Find a Branch".
- A scrolling marquee strip: "Fresh Kulche • Spicy Chole • Tangy Chutneys • Made Fresh Daily".
- "Signature Dishes" section with 4-6 animated cards (photo, name, short mouth-watering description, price).
- "Why People Love Us" section with 3-4 icon features (fresh daily, authentic recipe, generous portions, 3 branches).
- A big stats counter: "3 Branches • [X]+ Happy Customers • [X] Years of Taste" (placeholders).
- A 3-card preview of the branches with "View Details" links.
- A reviews carousel preview with star ratings.
- A bold call-to-action banner before the footer: "Hungry? Visit your nearest branch today."

2. MENU
- Category tabs with smooth animated filtering: [CATEGORIES e.g. Kulche, Chole, Combos, Snacks, Beverages, Desserts].
- Each item card shows a photo, name, short description, price in ₹, and a veg indicator.
- Mark popular items with a "Bestseller" badge.
- Include a sample menu with realistic placeholder items and prices that are easy to edit, stored in a single data file. Use [MENU_ITEMS] if I provide them.

3. LOCATIONS (3 branches)
- One premium card per branch: Kammanahalli, VV Puram, Bharathiya City.
- Each card has: a photo of the outlet, full address [ADDRESS], opening hours [HOURS], phone number [PHONE] with a click-to-call button, "Get Directions" button (Google Maps link), and an embedded Google Map.
- Keep all branch data in one config file so it's easy to update.

4. GALLERY
- A masonry photo grid with hover zoom and a lightbox viewer.
- Filter tabs: All / Food / Branches / Making of Kulche.
- Add a short looping video tile of the tawa action.

5. REVIEWS
- Hero strip with the overall rating and total review count.
- A "Write a Review" form: name, branch dropdown, 1-5 star rating, comment. Save submissions to Supabase and show approved reviews in a beautiful testimonial grid. Include simple spam protection and a moderation flag (approved: true/false).
- Prepare a clearly marked section, "Google Reviews", with a placeholder component and a code comment so I can connect the Google Places reviews API or a review widget later.
- A "Review us on Google" button linking to [GOOGLE_REVIEW_LINK].

6. OUR STORY & CONTACT
- A story section about the origin of Sharma's Kulche, the family recipe and the passion for fresh food. Use warm placeholder copy that I can edit.
- A "Meet the Kitchen" photo block.
- A contact form (name, phone, message, which branch). Add a WhatsApp chat button with a pre-filled message and a catering/bulk-order enquiry option.
- Social media icon links (Instagram, Facebook).

GLOBAL FEATURES
- Floating WhatsApp button on every page (bottom right).
- A sticky mobile bottom bar: Call | Directions | Menu.
- An "Open now / Closed" badge on each branch, calculated from the opening hours.
- SEO: proper titles and meta descriptions, Open Graph tags, and JSON-LD LocalBusiness / Restaurant schema for all 3 branches.
- Fast loading: lazy-load images, optimised video, and good accessibility (alt text, contrast, keyboard navigation).
- A custom 404 page with a funny kulche-themed message.

IMAGES & VIDEO
- Use my uploaded photos for all food, branch and gallery images. Until I upload them, use clearly labelled temporary food photos that are easy to swap.
- Enhance every photo visually: consistent warm colour grade, slight contrast and saturation boost, rounded corners, soft vignette on hero images, and consistent aspect ratios.
- The home hero uses a muted, looping background video.

Start by building the Home page and the shared layout (navbar, footer, theme), then the remaining 5 pages. Make the design feel premium, appetizing and unique, not like a generic template.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a282e43a-d8fd-420e-afa8-784fa0fe602b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
