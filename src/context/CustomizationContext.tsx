"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "@/lib/apiClient";
import { homeData } from "@/data/user/homeData";

interface CustomizationContextProps {
  hero: any;
  story: any;
  offer: any;
  delivery: {
    maximumAmount: number;
    deliveryCharges: number;
    gstPercent: number;
  };
  isLoading: boolean;
}

const CustomizationContext = createContext<CustomizationContextProps | undefined>(undefined);

export const CustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hero, setHero] = useState<any>(homeData.hero);
  const [story, setStory] = useState<any>(homeData.ourStory);
  const [offer, setOffer] = useState<any>(homeData.specialOffer);
  const [delivery, setDelivery] = useState<any>({
    maximumAmount: 999,
    deliveryCharges: 79,
    gstPercent: 5,
  });

  useEffect(() => {
    let active = true;
    const fetchCustomization = async () => {
      try {
        const response = await apiClient.get("/customization");
        const customizationData = response.data?.data || response.data;
        if (active && customizationData) {
          const { hero: backendHero, story: backendStory, offer: backendOffer, delivery: backendDelivery } = customizationData;

          // Merge backend properties, keeping local fields as fallbacks
          if (backendHero) {
            setHero({
              ...homeData.hero,
              heading: backendHero.mainHeading || homeData.hero.heading,
              description: backendHero.supportingText || homeData.hero.description,
              tag: backendHero.highlights?.[0] || homeData.hero.tag,
              ...backendHero,
            });
          }

          if (backendStory) {
            setStory({
              ...homeData.ourStory,
              title: backendStory.sectionLabel || homeData.ourStory.title,
              subtitle: backendStory.heading || homeData.ourStory.subtitle,
              description: backendStory.description || homeData.ourStory.description,
              imageUrl: backendStory.sectionImage || homeData.ourStory.imageUrl,
              highlights: backendStory.brandValues 
                ? backendStory.brandValues.map((v: any) => ({ title: v.title, desc: v.description || v.desc }))
                : homeData.ourStory.highlights,
            });
          }

          if (backendOffer) {
            setOffer({
              ...homeData.specialOffer,
              tag: backendOffer.badgeText || homeData.specialOffer.tag,
              heading: backendOffer.heading || homeData.specialOffer.heading,
              description: backendOffer.description || homeData.specialOffer.description,
              ...backendOffer,
            });
          }

          if (backendDelivery) {
            setDelivery({
              maximumAmount: parseFloat(backendDelivery.maximumAmount) || 999,
              deliveryCharges: parseFloat(backendDelivery.deliveryCharges) || 79,
              gstPercent: parseFloat(backendDelivery.gstPercent) || 5,
            });
          }
        }
      } catch (error) {
        console.error("Failed to load storefront customization:", error);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    fetchCustomization();
    return () => {
      active = false;
    };
  }, []);

  return (
    <CustomizationContext.Provider value={{ hero, story, offer, delivery, isLoading }}>
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error("useCustomization must be used within a CustomizationProvider");
  }
  return context;
};
