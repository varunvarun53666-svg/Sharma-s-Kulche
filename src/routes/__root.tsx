import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Toaster } from "@/components/ui/sonner";
import { branches } from "@/data/branches";

const restaurantSchema = {
  "@context": "https://schema.org",
  "@graph": branches.map((b) => ({
    "@type": "Restaurant",
    name: `Sharma's Kulche — ${b.name}`,
    servesCuisine: ["North Indian", "Street Food"],
    priceRange: "₹",
    telephone: `+${b.phone}`,
    address: { "@type": "PostalAddress", streetAddress: b.address, addressLocality: "Bengaluru", addressRegion: "KA", addressCountry: "IN" },
    geo: { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng },
    openingHours: b.hoursLabel,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapsQuery)}`,
  })),
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal px-4 pt-20 text-center text-charcoal-foreground">
      <div className="max-w-md">
        <div className="text-8xl" aria-hidden="true">🫓</div>
        <h1 className="mt-4 text-7xl text-primary">404</h1>
        <h2 className="mt-4 text-2xl">This kulcha rolled off the tawa!</h2>
        <p className="mt-3 text-charcoal-foreground/70">
          We looked everywhere — under the chole, behind the butter — but this page is gone. Probably eaten.
        </p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-fire px-6 py-3 font-semibold text-primary-foreground shadow-warm">
          Take me back to the food
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Replace these placeholders with the app's name and description when first building the app.
    // Each content route, / included, must still set its own head(). Never add og:image or
    // twitter:image here: every page without its own would inherit the root's preview image.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sharma's Kulche — Delhi-style Kulche in Bengaluru" },
      { name: "description", content: "Soft, buttery Amritsari kulche and spicy chole, made fresh daily at 3 Bengaluru branches: Kammanahalli, VV Puram and Bharathiya City." },
      { name: "theme-color", content: "#1C1410" },
      { property: "og:title", content: "Sharma's Kulche — Delhi-style Kulche in Bengaluru" },
      { property: "og:description", content: "Soft, buttery kulche and spicy chole at 3 Bengaluru branches." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Poppins:wght@400;500;600;700&display=swap" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(restaurantSchema) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useLocation({ select: (l) => l.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main id="main" key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingActions />
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
