"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Share2, Truck, Award, Sprout, Plus, Minus, Loader2 } from "lucide-react";
import { Product } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { StarRating } from "@/components/ui/StarRating";
import { Select } from "@/components/ui/Select";
import { useCart } from "@/context/CartContext";
import { useCustomization } from "@/context/CustomizationContext";
import { formatIndianCurrency } from "@/lib/utils";
import { apiClient } from "@/lib/apiClient";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { delivery } = useCustomization();
  const [detailedProduct, setDetailedProduct] = useState<Product>(product);
  const [isLoading, setIsLoading] = useState(true);
  const isOutOfStock = detailedProduct.stock !== undefined && detailedProduct.stock <= 0;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "benefits">("description");
  const [selectedWeight, setSelectedWeight] = useState(
    product.weightOptions?.[0] || product.weight
  );
  const [quantity, setQuantity] = useState(1);
  const [shareStatus, setShareStatus] = useState("Share");

  useEffect(() => {
    let active = true;
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/products/${product.id}`);
        if (active && response.data && response.data.data) {
          const productData = response.data.data;
          setDetailedProduct(productData);
          if (productData.weightOptions && productData.weightOptions.length > 0) {
            setSelectedWeight(productData.weightOptions[0]);
          } else if (productData.weight) {
            setSelectedWeight(productData.weight);
          }
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };
    fetchDetails();
    return () => {
      active = false;
    };
  }, [product.id]);

  const productImages = detailedProduct.images || [detailedProduct.image];

  const isKgUnit =
    (detailedProduct.weight || "").toLowerCase().trim() === "kg" ||
    (product.weight || "").toLowerCase().trim() === "kg";

  const weightOptions = isKgUnit
    ? [
        { label: "500 gram", value: "500g" },
        { label: "Kilogram", value: "kg" },
      ]
    : detailedProduct.weightOptions && detailedProduct.weightOptions.length > 0
      ? detailedProduct.weightOptions
      : [detailedProduct.weight || product.weight || "500g"];

  const showWeightSelector = !["pcs", "pieces", "piece", "box", "boxes"].includes(
    (detailedProduct.weight || product.weight || "").toLowerCase().trim()
  );

  const productBenefits = detailedProduct.benefits || [
    "Rich in vitamins and minerals",
    "100% natural energy booster",
    "High source of dietary fiber",
  ];

  const getWeightInGrams = (weightStr: string): number => {
    if (!weightStr) return 0;
    const clean = weightStr.toLowerCase().replace(/\s+/g, "");
    if (clean === "kg" || clean === "kilogram") return 1000;
    if (clean === "g" || clean === "gram" || clean === "grams") return 1;

    const value = parseFloat(clean);
    if (isNaN(value)) return 0;
    if (clean.includes("kg") || clean.includes("kilogram")) {
      return value * 1000;
    }
    return value;
  };

  const getPriceForWeight = (option: string, baseWeight: string, basePrice: number) => {
    const optionWeight = getWeightInGrams(option);
    const baseWeightInGrams = getWeightInGrams(baseWeight);
    if (optionWeight === 0 || baseWeightInGrams === 0) return basePrice;

    const ratio = optionWeight / baseWeightInGrams;
    return Math.round(basePrice * ratio);
  };

  const currentPrice = getPriceForWeight(
    selectedWeight,
    detailedProduct.weight,
    detailedProduct.price
  );
  const currentOriginalPrice = detailedProduct.originalPrice
    ? getPriceForWeight(selectedWeight, detailedProduct.weight, detailedProduct.originalPrice)
    : undefined;

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = `Check out Taybeen's premium ${detailedProduct.name}!`;

    if (navigator.share) {
      try {
        await navigator.share({ title: detailedProduct.name, text: shareText, url: shareUrl });
      } catch {
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShareStatus("Copied!");
    setTimeout(() => setShareStatus("Share"), 2000);
  };

  const handleAddToCart = () => {
    addToCart(detailedProduct, selectedWeight, quantity);
    onClose();
    setIsCartOpen(true);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      flexRowDirection="row"
      className="max-w-md md:max-w-2xl lg:max-w-5xl xl:max-w-6xl lg:h-auto overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 md:top-5 md:right-5 z-50 w-8 h-8 sm:w-9 sm:h-9 bg-white/80 hover:bg-white text-brand-brown hover:text-black rounded-full flex items-center justify-center border border-[#F2EADA] transition-all cursor-pointer shadow-sm active:scale-95 focus:outline-none"
        aria-label="Close detail modal"
      >
        <X size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>

      {isLoading ? (
        <div className="w-full flex flex-col items-center justify-center py-32 px-4 bg-[#FDFAF3] min-h-[400px]">
          <Loader2 className="w-10 h-10 animate-spin text-[#5A3E2B] mb-4" />
          <p className="font-poppins text-[#5A3E2B]/80 font-medium">Loading product details...</p>
        </div>
      ) : (
        <>
          <div className="w-full lg:w-[45%] flex flex-col p-4 sm:p-5 md:p-6 lg:p-8 bg-[#FDFAF3] border-b lg:border-b-0 lg:border-r border-[#F2EADA] h-auto flex-shrink-0">
            <div className="relative w-full aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-[#F5F0E8] mb-4 flex-shrink-0">
              <Image
                src={productImages[selectedImageIndex] || detailedProduct.image}
                alt={detailedProduct.name}
                fill
                className={`object-cover select-none pointer-events-none ${isOutOfStock ? "grayscale opacity-60" : ""}`}
                priority
              />
            </div>

            <div className="flex gap-3 justify-start">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                    selectedImageIndex === i
                      ? "border-[#C4A482] shadow-sm"
                      : "border-transparent hover:border-[#C4A482]/40 bg-[#F5F0E8]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${detailedProduct.name} view ${i + 1}`}
                    fill
                    className={`object-cover ${isOutOfStock ? "grayscale opacity-60" : ""}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col h-auto select-text text-left bg-[#FDFAF3] overflow-visible">
            <h2 className="text-xl sm:text-2xl lg:text-[1.85rem] font-serif font-bold text-typo1 leading-tight mb-3">
              {detailedProduct.name}
            </h2>

            {(detailedProduct.reviewsCount || 0) > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={detailedProduct.rating} size={16} />
                <span className="text-xs sm:text-sm font-poppins text-typo1/80 font-semibold">
                  {detailedProduct.rating} ({detailedProduct.reviewsCount} reviews)
                </span>
              </div>
            )}

            <div className="mb-5">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-xl sm:text-2xl font-poppins font-bold text-typo1">
                  ₹{formatIndianCurrency(currentPrice, 2)}
                </span>
                {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                  <>
                    <span className="text-sm sm:text-base text-typo1/60 line-through font-poppins font-medium">
                      ₹{formatIndianCurrency(currentOriginalPrice, 2)}
                    </span>
                    <span className="text-xs text-typo2 font-poppins font-semibold">
                      (
                      {Math.round(
                        ((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100
                      )}
                      % OFF)
                    </span>
                  </>
                )}
              </div>
              <div className="text-xs sm:text-sm text-brand-green-light font-poppins mt-0.5">
                Inclusive of all taxes
              </div>
              {detailedProduct.stock !== undefined && detailedProduct.stock <= 0 && (
                <div className="mt-3 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-red-600 font-poppins text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <span>Currently Out of Stock !</span>
                </div>
              )}
            </div>

            <div className="flex gap-6 mb-5 border-b border-[#5A3E2B]/15">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-2.5 text-sm font-poppins transition-all cursor-pointer ${
                  activeTab === "description"
                    ? "font-bold text-brand-brown border-b-2 border-brand-brown"
                    : "font-medium text-[#8D7F75] hover:text-[#5A3E2B]"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("benefits")}
                className={`pb-2.5 text-sm font-poppins transition-all cursor-pointer ${
                  activeTab === "benefits"
                    ? "font-bold text-brand-brown border-b-2 border-brand-brown"
                    : "font-medium text-[#8D7F75] hover:text-[#5A3E2B]"
                }`}
              >
                Benefits
              </button>
            </div>

            <div className="text-xs sm:text-sm text-[#7D6B5E] font-poppins leading-relaxed mb-6 overflow-visible">
              {activeTab === "description" ? (
                <p>{detailedProduct.description}</p>
              ) : (
                <ul className="list-disc pl-5 space-y-1.5">
                  {productBenefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
              {showWeightSelector && (
                <div className="w-full sm:w-44">
                  <span className="text-[10px] sm:text-xs font-bold text-brand-brown tracking-widest uppercase mb-2 block font-poppins">
                    Weight
                  </span>
                  <Select
                    value={selectedWeight}
                    onChange={setSelectedWeight}
                    options={weightOptions}
                    className="w-full text-xs"
                  />
                </div>
              )}

              <div>
                <span className="text-[10px] sm:text-xs font-bold text-brand-brown tracking-widest uppercase mb-2 block font-poppins">
                  Quantity
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={detailedProduct.stock !== undefined && detailedProduct.stock <= 0}
                    className="w-10 h-10 flex items-center justify-center bg-[#E8E0D0] hover:bg-[#DDD5C5] text-brand-brown rounded-lg font-bold cursor-pointer transition-colors select-none active:scale-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus size={15} strokeWidth={2.5} />
                  </button>
                  <span className="w-10 text-center font-bold text-brand-brown font-poppins text-base select-none">
                    {detailedProduct.stock !== undefined && detailedProduct.stock <= 0
                      ? 0
                      : quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    disabled={
                      detailedProduct.stock !== undefined &&
                      (detailedProduct.stock <= 0 || quantity >= detailedProduct.stock)
                    }
                    className="w-10 h-10 flex items-center justify-center bg-[#E8E0D0] hover:bg-[#DDD5C5] text-brand-brown rounded-lg font-bold cursor-pointer transition-colors select-none active:scale-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={15} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              {detailedProduct.stock !== undefined && detailedProduct.stock <= 0 ? (
                <button
                  disabled
                  className="flex-1 bg-gray-200 text-gray-400 py-3.5 rounded-lg font-poppins font-semibold text-sm tracking-wide cursor-not-allowed text-center select-none focus:outline-none border border-gray-300"
                >
                  Out of Stock
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-typo1 hover:bg-[#443200] transition-colors text-btnText py-3.5 rounded-lg font-poppins font-semibold text-sm tracking-wide shadow-sm cursor-pointer text-center select-none active:scale-[0.98] focus:outline-none"
                >
                  Add to cart
                </button>
              )}
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 border border-typo1/30 hover:border-typo1 hover:bg-typo1/5 text-typo1 py-3.5 px-6 rounded-lg font-poppins font-semibold text-sm cursor-pointer transition-all select-none active:scale-[0.98] focus:outline-none"
              >
                <Share2 size={15} />
                <span>{shareStatus}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-[#5A3E2B]/10 pt-5 mt-4">
              <div className="flex flex-col items-center gap-1.5">
                <Truck size={20} className="text-[#F7A503]" />
                <span className="text-[9px] sm:text-[12px] font-poppins font-medium text-[#8D7F75] text-center leading-tight">
                  Free Shipping on
                  <br />₹{delivery.maximumAmount}+
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Award size={20} className="text-[#F7A503]" />
                <span className="text-[9px] sm:text-[12px] font-poppins font-medium text-[#8D7F75] text-center leading-tight">
                  Premium Quality
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Sprout size={20} className="text-[#F7A503]" />
                <span className="text-[9px] sm:text-[12px] font-poppins font-medium text-[#8D7F75] text-center leading-tight">
                  Rich in Fiber
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};
