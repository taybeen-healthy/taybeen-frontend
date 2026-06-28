import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm",
});

const playfair = localFont({
  src: [
    {
      path: "../../public/Playfair_Display/PlayfairDisplay-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../../public/Playfair_Display/PlayfairDisplay-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://taybeen.com"),
  title: "Taybeen | Premium Dates — Pure, Natural & Authentic",
  description:
    "Taybeen is India's premium date brand, offering mindfully sourced, 100% natural, and organic date varieties including Ajwa, Mejdool, Safawi, and Mabroom.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Taybeen | Premium Dates — Pure, Natural & Authentic",
    description:
      "Sourced directly from Saudi Arabia, Jordan, and Iran. Discover Ajwa, Mejdool, Safawi, and Mabroom dates - clean, natural nutrition for your active life.",
    url: "https://taybeen.com",
    siteName: "Taybeen Dates",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taybeen | Premium Dates — Pure, Natural & Authentic",
    description:
      "Sourced directly from Saudi Arabia, Jordan, and Iran. Discover Ajwa, Mejdool, Safawi, and Mabroom dates.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Taybeen Premium Dates",
  url: "https://taybeen.com",
  logo: "/TaybeenLogo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9867805123",
    contactType: "customer service",
  },
  sameAs: ["https://www.facebook.com/taybeen", "https://www.instagram.com/taybeen"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Taybeen Premium Dates",
  url: "https://taybeen.com",
};

const productListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Selling Date Varieties",
  numberOfItems: 4,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "Mejdool Dates",
        image: "/Image (Premium dates on a plate).png",
        description:
          "The 'King of Dates' - large, soft, and intensely caramel - sweet fudge like texture. Exceptionally rich in natural sugar and potassium.",
        offers: {
          "@type": "Offer",
          price: "499",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "1240",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "Ajwa Dates",
        image: "/Image (Dates in wooden bowl).png",
        description:
          "From the holy city of Madinah. Dark, soft and uniquely flavoured with a dry finish. Revered for centuries for their extraordinary health properties.",
        offers: {
          "@type": "Offer",
          price: "799",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: "840",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "Safawi Dates",
        image: "/Image (Pile of premium dates).png",
        description:
          "Moist, tender, and moderately sweet with a deep chocolately undertone. A favourite for daily snacking and excellent source of iron and fibre.",
        offers: {
          "@type": "Offer",
          price: "549",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.5",
          reviewCount: "470",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Product",
        name: "Mabroom Dates",
        image: "/ComingSoon Dates.png",
        description:
          "Long, slender and semi-dry with a rich, concentrated sweetness. Less sugar making them ideal for health-conscious snackers.",
        offers: {
          "@type": "Offer",
          price: "499",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "1240",
        },
      },
    },
  ],
};

import { ToastProvider } from "@/context/ToastContext";
import { ConfirmationProvider } from "@/context/ConfirmationContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          poppins.variable,
          poppins.className,
          dmSans.variable,
          playfair.variable
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productListSchema),
          }}
        />
        <ConfirmationProvider>
          <ToastProvider>{children}</ToastProvider>
        </ConfirmationProvider>
      </body>
    </html>
  );
}
