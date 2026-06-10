import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/context/CartContext";
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
  "name": "Taybeen Premium Dates",
  "url": "https://taybeen.com",
  "logo": "https://s3-alpha-sig.figma.com/img/aef5/42bb/91997904de2c2fba272a345f8e640566?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FkHOx1DQ9tCpg2LfaGWPEahyYclX5a07TKu8PWLxLk3iSdpazH8XGXMYe8TpS23YZfpwXmAz-AZkM9jf3WSWFX3VM7Aol9uKZzY~iTeh~XLi7tXNle78G63lxxLQsPO5qF8O6dnYVoDlAuoYEhEHcTABf7RhrrYHPEjF-NOwpyfzVfQpmobUjFvJamM7vfxxCNehvQ3s5ioKA0OXGibBcUyQ7xhKg4IL70pP9yeI4c5N~6yvjoAM2Qw-6rj2rMslOTohfYJjBMV~ghZpoHtXxEAcXfXSM5Vz00H93O0yHKZ915D0kFsATfjYNighrCUBoONcchwDqXihkU0x1-M4ug__",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9867805123",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://www.facebook.com/taybeen",
    "https://www.instagram.com/taybeen"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Taybeen Premium Dates",
  "url": "https://taybeen.com"
};

const productListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Best Selling Date Varieties",
  "numberOfItems": 4,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Product",
        "name": "Mejdool Dates",
        "image": "https://s3-alpha-sig.figma.com/img/aeca/036a/d00b3d5c0a23c50c2a5904a3a0bf4f97?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GuokJ9-TOZuO0ffk4-kkXrIoviFFAYL7jnEhuGCXqCr0yTJVZM~8YWk90F9Jj3zUbYhWbBQUNfrsFOpJLeTb5kv6UeGqh3aZ2jCzLs0bPicHnOaDWmfX2kasIyYI5kTC6LrYzyigYOOybS2Lk4GjfjSehMTfdvB3UpIUWgTPdCDkMpX9E4oy-LNIT6yTp2Sj5i-VKN03~EnDr6roo-aLdedfZW52OSMRpx-XD-crYcRBpnwARTcVeQ5AtS8McCryUavYAm0JhNeboBVPu8d6nlzuhoFf3Tc5Y37itJFsy22q7PAsD6ANkscok-Seb5~4yFgFwXXQvwELO7F4MvDv2w__",
        "description": "The 'King of Dates' - large, soft, and intensely caramel - sweet fudge like texture. Exceptionally rich in natural sugar and potassium.",
        "offers": {
          "@type": "Offer",
          "price": "499",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1240"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Product",
        "name": "Ajwa Dates",
        "image": "https://s3-alpha-sig.figma.com/img/cc9f/1b5e/6a2aa10b77d50a2a53738530eff845ba?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qOl3te8RaPpOlSzb5JgnonWzVXkzOH6Ne0kbNCLfQovaOI7RO3Efx2P5QyVeYfX1qY4Zt19fzQNN4lnGmmHGTVvSQUsUFb1o40nwm5HX2hnHZjEGMQTB249bzyF5iUbC4HZN9lvxfXg1qmpxyF8469nXK9ZCRUEjt7hK2mzHWHIVy-UI~pptewnZ0EwyCEcmiU1N4cy4SpV-qrQCshdC8z2GmEsTIBboOjyLOvW2DjjF4oxmmc-cbFDuYIwYOFaG8qA46Ga6vjrF2mtI-FXg6xbhfa6oPBIy0JocersSl4nIDA6Cxp1W9gUJ7e91uH7FyY~O9eDriLkolsm~LYFrSA__",
        "description": "From the holy city of Madinah. Dark, soft and uniquely flavoured with a dry finish. Revered for centuries for their extraordinary health properties.",
        "offers": {
          "@type": "Offer",
          "price": "799",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "840"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Product",
        "name": "Safawi Dates",
        "image": "https://s3-alpha-sig.figma.com/img/4899/d334/711770072c9bfcfcf8508aa89b253dc0?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SLlbyyUfITqA37JRfy5Q7hfABOEHkYU-OweiBylX4UBGM5lRQa6tAT79ytldlaTt0bw~-t63uYKIgeH17HpirLrYsCoMOKVUJCOFjXeJAGr887flJQLvSOySwzOCMfGIS6lcDJj1fonNJLWjPKSv2D-vKs4ztDfn3YPqeSVmDw2N-N648VlUc3yB3BABeiAiDy9yrmICpZc4ot0~GEYew6Arok0Biqo0y848vohmvmZ41DL1DK6yAyQxSZNoGI7ps3GlYQs6XkFomZ4nwtaGJn1-dMyt9GvURJuj-nLvxaRW-VMV70HoUsEv69MGtJbgA6WJkLLgag8hEwhteJv52Q__",
        "description": "Moist, tender, and moderately sweet with a deep chocolately undertone. A favourite for daily snacking and excellent source of iron and fibre.",
        "offers": {
          "@type": "Offer",
          "price": "549",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "reviewCount": "470"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Product",
        "name": "Mabroom Dates",
        "image": "https://s3-alpha-sig.figma.com/img/9a6c/3043/a1c315d1b0aa88dd1fbe7b668c1e160e?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FAmNQjNon-~NjOtIknLAEMCPbDk59lLJP1RUU3YvoorM-rn4ztIMVEJXvPNAFTHq208FYoZSRU7hXtGXYSX-7c3NtyWbLQdisapsVAqqClKE9Ir3PcTQ0FdpolJH0T7hZneGw64NJZQiFMRngPkKzzxuqq-XumKXANOdRlvK~uvSxvYkIb77fGT~Rwn7t5o8wbZ2--mLYuC9WzLmYWEOxW-CxNOBQidFMaxdXKl2IByqRpntrEfPkZsELZsZPwJk9mgSUZAtaGUOWHQYycU1FSicOSCh37XhT5rTXSbi586NzN33I-iFwL7x3MhR~lFlWyXPh~-eIBPs54fl4Iuwmw__",
        "description": "Long, slender and semi-dry with a rich, concentrated sweetness. Less sugar making them ideal for health-conscious snackers.",
        "offers": {
          "@type": "Offer",
          "price": "499",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1240"
        }
      }
    }
  ]
};

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
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
