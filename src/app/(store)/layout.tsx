import { CartProvider } from "@/context/CartContext";
import { CustomizationProvider } from "@/context/CustomizationContext";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CustomizationProvider>
      <CartProvider>
        {children}
        <WhatsAppButton />
      </CartProvider>
    </CustomizationProvider>
  );
}
