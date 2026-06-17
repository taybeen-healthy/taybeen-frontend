import { CartProvider } from "@/context/CartContext";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      {children}
      <WhatsAppButton />
    </CartProvider>
  );
}
