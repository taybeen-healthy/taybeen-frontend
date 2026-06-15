"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discount: "",
    stock: "",
    unit: "",
    description: "",
    benefits: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Product:", formData);
    // Reset or call parent callback
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      discount: "",
      stock: "",
      unit: "",
      description: "",
      benefits: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="border border-[#C4A482]/20 bg-white rounded-2xl p-6 sm:p-8 shadow-sm font-poppins text-left">
      <h3 className="text-lg font-bold text-brand-brown mb-6 pb-2 border-b border-gray-100">
        Add new product
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
        
        {/* Left Column: Product Image Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-brand-brown block">
            Product Images
          </label>
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer hover:border-brand-primary/40 transition-colors h-[280px]">
            <Upload size={32} className="text-brand-brown/40 mb-3" />
            <span className="text-sm font-bold text-brand-brown/70">Upload</span>
            <span className="text-[11px] text-[#8D7F75] mt-1 text-center">
              Upload up to 5 images (PNG, JPG)
            </span>
          </div>
        </div>

        {/* Right Column: Input fields grid (occupies 2/3 space) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
              Product Name*
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter Product Name"
              className="w-full bg-white border border-[#C4A482]/40 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
              Category*
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-white border border-[#C4A482]/40 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
            >
              <option value="">Select Category</option>
              <option value="Dates">Dates</option>
              <option value="Hampers">Hampers</option>
              <option value="Gifts">Gifts</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
              Price*
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0.00"
              className="w-full bg-white border border-[#C4A482]/40 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
              Discount (%)
            </label>
            <input
              type="number"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              placeholder="00"
              className="w-full bg-white border border-[#C4A482]/40 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
              Stock quantity
            </label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              placeholder="00"
              className="w-full bg-white border border-[#C4A482]/40 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
            <span className="text-[10px] text-[#8D7F75] block mt-1">
              Leave empty or 0 for out of stock
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
              Stock Unit*
            </label>
            <select
              required
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full bg-white border border-[#C4A482]/40 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
            >
              <option value="">Select Category</option>
              <option value="kg">kg (Kilogram)</option>
              <option value="g">g (Gram)</option>
              <option value="pcs">pcs (Pieces)</option>
            </select>
            <span className="text-[10px] text-[#8D7F75] block mt-1">
              Select the unit for stock measurement.
            </span>
          </div>

        </div>
      </div>

      {/* Description & Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-1.5">
          <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter product description"
            rows={5}
            className="w-full bg-white border border-[#C4A482]/40 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs sm:text-sm font-semibold text-brand-brown block">
            Benefits
          </label>
          <textarea
            value={formData.benefits}
            onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
            placeholder="Enter Benefits"
            rows={5}
            className="w-full bg-white border border-[#C4A482]/40 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary resize-none"
          />
        </div>
      </div>

      {/* Form Action Triggers */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleCancel}
          className="border border-[#5A3E2B] text-brand-brown hover:bg-[#5A3E2B] hover:text-white px-8 py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-brand-green hover:bg-[#3A4E1B] text-white px-8 py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-200"
        >
          Add Product
        </button>
      </div>

    </form>
  );
};

export default ProductForm;
