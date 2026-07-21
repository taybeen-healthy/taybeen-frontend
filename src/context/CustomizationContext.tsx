"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "@/lib/apiClient";
import { homeData } from "@/data/user/homeData";

interface CustomizationContextProps {
  hero: any;
  story: any;
  offer: any;
  gifting: any;
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
  const [gifting, setGifting] = useState<any>(homeData.gifting);
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
          const {
            hero: backendHero,
            story: backendStory,
            offer: backendOffer,
            delivery: backendDelivery,
            gifting: backendGifting,
          } = customizationData;

          if (backendHero) {
            setHero({
              ...homeData.hero,
              heading: backendHero.mainHeading || homeData.hero.heading,
              heading2: backendHero.heading2 || "Dates.",
              description: backendHero.supportingText || homeData.hero.description,
              tag: backendHero.tag || homeData.hero.tag,
              tagline: backendHero.tagline || homeData.hero.tagline,
              energyTitle: backendHero.energyTitle || homeData.hero.badges.energyTitle,
              energyValue: backendHero.energyValue || homeData.hero.badges.energyValue,
              energyDesc: backendHero.energyDesc || homeData.hero.badges.energyDesc,
              farmTitle: backendHero.farmTitle || homeData.hero.badges.farmToTableTitle,
              farmDesc: backendHero.farmDesc || homeData.hero.badges.farmToTableDesc,
              heroImages:
                backendHero.heroImages && backendHero.heroImages.length === 4
                  ? backendHero.heroImages
                  : [
                      homeData.hero.varieties.ajwa.image,
                      homeData.hero.varieties.kalmi.image,
                      homeData.hero.varieties.sukkary.image,
                      homeData.hero.varieties.safawi.image,
                    ],
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
                ? backendStory.brandValues.map((v: any) => ({
                    title: v.title,
                    desc: v.description || v.desc,
                  }))
                : homeData.ourStory.highlights,
            });
          }

          if (backendOffer) {
            setOffer({
              ...homeData.specialOffer,
              tag: backendOffer.badgeText || homeData.specialOffer.tag,
              heading: backendOffer.heading || homeData.specialOffer.heading,
              description: backendOffer.description || homeData.specialOffer.description,
              imageUrl: backendOffer.imageUrl || homeData.specialOffer.imageUrl,
            });
          }

          if (backendGifting) {
            setGifting({
              ...homeData.gifting,
              tag: backendGifting.tag || homeData.gifting.tag,
              heading: backendGifting.heading || homeData.gifting.heading,
              mainCard: backendGifting.mainCard
                ? {
                    image: backendGifting.mainCard.image || homeData.gifting.mainCard.image,
                    tag: backendGifting.mainCard.tag || homeData.gifting.mainCard.tag,
                    category:
                      backendGifting.mainCard.category || homeData.gifting.mainCard.category,
                    title: backendGifting.mainCard.title || homeData.gifting.mainCard.title,
                  }
                : homeData.gifting.mainCard,
              subCards: backendGifting.subCards
                ? backendGifting.subCards.map((c: any, idx: number) => ({
                    image: c.image || homeData.gifting.subCards[idx]?.image,
                    tag: c.tag || homeData.gifting.subCards[idx]?.tag,
                    title: c.title || homeData.gifting.subCards[idx]?.title,
                  }))
                : homeData.gifting.subCards,
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
    <CustomizationContext.Provider value={{ hero, story, offer, gifting, delivery, isLoading }}>
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
