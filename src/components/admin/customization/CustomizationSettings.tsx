"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { initialCustomizationData } from "@/data/admin/customizationData";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

export const CustomizationSettings: React.FC = () => {
  const [settings, setSettings] = useState(initialCustomizationData);

  const [categories, setCategories] = useState<string[]>([
    "Premium Dates",
    "Stuffed Dates",
    "Chocolate Dates",
    "Gift Boxes",
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const handleSave = (section: "hero" | "story" | "offer" | "delivery") => {
    console.log(`Saving ${section} customization settings:`, settings[section]);
    alert(`${section.toUpperCase()} settings saved successfully!`);
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    if (categories.some((c) => c.toLowerCase() === newCategory.trim().toLowerCase())) {
      alert("Category already exists!");
      return;
    }
    setCategories([...categories, newCategory.trim()]);
    alert(`Category "${newCategory.trim()}" added successfully!`);
    setNewCategory("");
  };

  return (
    <div className="space-y-8 text-left font-poppins pb-12">
      {/* Page Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-brand-brown">
          Admin Customization
        </h1>
        <p className="text-xs text-[#8D7F75] mt-1">
          Manage and view all site information
        </p>
      </div>

      {/* SECTION 1: HERO */}
      <div className="border border-[#C4A482]/20 bg-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-brand-brown pb-2 border-b border-gray-100">
          Hero Section
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Image Uploads */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
                Hero Images
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer hover:border-brand-primary/40 transition-colors h-[120px]">
                <Upload size={20} className="text-brand-brown/40 mb-1" />
                <span className="text-xs font-bold text-brand-brown/70">Upload</span>
                <span className="text-[9px] text-[#8D7F75] mt-0.5">Upload Images (PNG, JPG)</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
                Side Images
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer hover:border-brand-primary/40 transition-colors h-[120px]">
                <Upload size={20} className="text-brand-brown/40 mb-1" />
                <span className="text-xs font-bold text-brand-brown/70">Upload</span>
                <span className="text-[9px] text-[#8D7F75] mt-0.5">Upload Images (PNG, JPG)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Heading Inputs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
                Main Heading
              </label>
              <Input
                type="text"
                value={settings.hero.mainHeading}
                onChange={(e) => setSettings({
                  ...settings,
                  hero: { ...settings.hero, mainHeading: e.target.value }
                })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
                  Heading 2
                </label>
                <Input
                  type="text"
                  value={settings.hero.heading2}
                  onChange={(e) => setSettings({
                    ...settings,
                    hero: { ...settings.hero, heading2: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
                  Heading 3
                </label>
                <Input
                  type="text"
                  value={settings.hero.heading3}
                  onChange={(e) => setSettings({
                    ...settings,
                    hero: { ...settings.hero, heading3: e.target.value }
                  })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
                Supporting Text
              </label>
              <Textarea
                value={settings.hero.supportingText}
                onChange={(e) => setSettings({
                  ...settings,
                  hero: { ...settings.hero, supportingText: e.target.value }
                })}
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Bullet Key Highlights */}
        <div className="space-y-3 pt-4">
          <label className="text-sm font-semibold text-brand-brown block">
            Key Highlights
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {settings.hero.highlights.map((hl, idx) => (
              <div key={idx} className="space-y-1.5">
                <span className="text-[10px] text-[#8D7F75] font-bold block uppercase">Highlight {idx + 1}</span>
                <Input
                  type="text"
                  value={hl}
                  onChange={(e) => {
                    const newHl = [...settings.hero.highlights];
                    newHl[idx] = e.target.value;
                    setSettings({
                      ...settings,
                      hero: { ...settings.hero, highlights: newHl }
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button
            onClick={() => handleSave("hero")}
            variant="primary"
          >
            Save
          </Button>
        </div>
      </div>

      {/* SECTION 2: OUR STORY */}
      <div className="border border-[#C4A482]/20 bg-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-brand-brown pb-2 border-b border-gray-100">
          Our Story
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Sourcing Image */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
              Section Image
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer hover:border-brand-primary/40 transition-colors h-[220px]">
              <Upload size={24} className="text-brand-brown/40 mb-1" />
              <span className="text-xs font-bold text-brand-brown/70">Upload</span>
              <span className="text-[9px] text-[#8D7F75] mt-0.5">Upload Image (PNG, JPG)</span>
            </div>
          </div>

          {/* Right Story Copy fields */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
                  Section Label
                </label>
                <Input
                  type="text"
                  value={settings.story.sectionLabel}
                  onChange={(e) => setSettings({
                    ...settings,
                    story: { ...settings.story, sectionLabel: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
                  Heading
                </label>
                <Input
                  type="text"
                  value={settings.story.heading}
                  onChange={(e) => setSettings({
                    ...settings,
                    story: { ...settings.story, heading: e.target.value }
                  })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
                Description
              </label>
              <Textarea
                value={settings.story.description}
                onChange={(e) => setSettings({
                  ...settings,
                  story: { ...settings.story, description: e.target.value }
                })}
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Brand Values cards */}
        <div className="space-y-3 pt-4">
          <label className="text-sm font-semibold text-brand-brown block">
            Brand Values
          </label>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {settings.story.brandValues.map((val, idx) => (
              <div key={idx} className="border border-gray-100 rounded-xl p-4 bg-[#FDFAF3]/50 space-y-3">
                <span className="text-[10px] text-[#8D7F75] font-bold block uppercase">Card {idx + 1}</span>
                
                <div className="space-y-1">
                  <Input
                    type="text"
                    value={val.title}
                    onChange={(e) => {
                      const newVals = [...settings.story.brandValues];
                      newVals[idx].title = e.target.value;
                      setSettings({
                        ...settings,
                        story: { ...settings.story, brandValues: newVals }
                      });
                    }}
                    placeholder="Title"
                    className="py-2 px-3 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <Textarea
                    value={val.description}
                    onChange={(e) => {
                      const newVals = [...settings.story.brandValues];
                      newVals[idx].description = e.target.value;
                      setSettings({
                        ...settings,
                        story: { ...settings.story, brandValues: newVals }
                      });
                    }}
                    placeholder="Description"
                    rows={3}
                    className="py-2 px-3 text-xs min-h-[80px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button
            onClick={() => handleSave("story")}
            variant="primary"
          >
            Save
          </Button>
        </div>
      </div>

      {/* SECTION 3: OFFER BANNER */}
      <div className="border border-[#C4A482]/20 bg-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-brand-brown pb-2 border-b border-gray-100">
          Offer Banner
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
              Offer Badge Text
            </label>
            <Input
              type="text"
              value={settings.offer.badgeText}
              onChange={(e) => setSettings({
                ...settings,
                offer: { ...settings.offer, badgeText: e.target.value }
              })}
              placeholder="Special Offer"
            />
          </div>

          <div className="space-y-1.5 text-left flex flex-col justify-end">
            <Select
              label="Offer Heading"
              value={settings.offer.heading}
              onChange={(value) => setSettings({
                ...settings,
                offer: { ...settings.offer, heading: value }
              })}
              options={[
                "Unlock Up to 50% Off on Your First Order",
                "Exclusive Festive Collection Discount",
                "Corporate Gifting Special Pricing"
              ]}
              placeholder="Select Heading"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
            Description
          </label>
          <Textarea
            value={settings.offer.description}
            onChange={(e) => setSettings({
              ...settings,
              offer: { ...settings.offer, description: e.target.value }
            })}
            rows={4}
          />
        </div>

        <div className="pt-2">
          <Button
            onClick={() => handleSave("offer")}
            variant="primary"
          >
            Save
          </Button>
        </div>
      </div>

      {/* SECTION 4: MANAGE DELIVERY */}
      <div className="border border-[#C4A482]/20 bg-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-brand-brown pb-2 border-b border-gray-100">
          Manage Delivery
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-[#5A3E2B] block">
              Maximum Amount
            </label>
            <Input
              type="text"
              value={settings.delivery.maximumAmount}
              onChange={(e) => setSettings({
                ...settings,
                delivery: { ...settings.delivery, maximumAmount: e.target.value }
              })}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-[#5A3E2B] block">
              Delivery Charges
            </label>
            <Input
              type="text"
              value={settings.delivery.deliveryCharges}
              onChange={(e) => setSettings({
                ...settings,
                delivery: { ...settings.delivery, deliveryCharges: e.target.value }
              })}
              placeholder="00"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-[#5A3E2B] block">
              GST %
            </label>
            <Input
              type="text"
              value={settings.delivery.gstPercent}
              onChange={(e) => setSettings({
                ...settings,
                delivery: { ...settings.delivery, gstPercent: e.target.value }
              })}
              placeholder="00"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-[#5A3E2B] block">
              Add new product category
            </label>
            <Input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter Category"
            />
          </div>

          <div className="flex items-center justify-start h-[46px] pb-1">
            <button
              type="button"
              onClick={() => setShowCategories(!showCategories)}
              className="text-[#768C3A] hover:text-brand-green font-semibold text-sm cursor-pointer transition-colors"
            >
              {showCategories ? "Hide All Categories" : "View All Categories"}
            </button>
          </div>
        </div>

        {showCategories && (
          <div className="border border-dashed border-[#C4A482]/30 rounded-xl p-4 bg-[#FDFAF3]/30 space-y-2.5 animate-in fade-in duration-200">
            <h4 className="text-xs font-bold text-brand-brown uppercase tracking-wider">
              Active Categories ({categories.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#C4A482]/20 px-3 py-1.5 rounded-full text-xs text-brand-brown flex items-center gap-1.5"
                >
                  <span>{cat}</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete category "${cat}"?`)) {
                        setCategories(categories.filter((c) => c !== cat));
                      }
                    }}
                    className="text-red-500 hover:text-red-700 font-bold text-[10px] ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 flex gap-3">
          <Button
            onClick={() => handleSave("delivery")}
            variant="primary"
          >
            Save Delivery Settings
          </Button>
          {newCategory.trim() && (
            <Button
              onClick={handleAddCategory}
              variant="outline"
            >
              Add Category
            </Button>
          )}
        </div>
      </div>

    </div>
  );
};

export default CustomizationSettings;
