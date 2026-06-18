"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { AdminCard, AdminUploadBox } from "../shared";

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
    <form onSubmit={handleSubmit}>
      <AdminCard title="Add new product">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-brand-brown block">
              Product Images
            </label>
            <AdminUploadBox
              height="h-[280px]"
              iconSize={32}
              rounded="2xl"
              description="Upload up to 5 images (PNG, JPG)"
            />
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-1.5">
              <label className="text-[#3A2418] font-poppins font-semibold text-xs md:text-sm block">
                Product Name*
              </label>
              <Input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter Product Name"
              />
            </div>

            <div className="space-y-1.5 text-left flex flex-col justify-end">
              <Select
                required
                label="Category"
                value={formData.category}
                onChange={(value) => setFormData({ ...formData, category: value })}
                options={["Dates", "Hampers", "Gifts"]}
                placeholder="Select Category"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#3A2418] font-poppins font-semibold text-xs md:text-sm block">
                Price*
              </label>
              <Input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#3A2418] font-poppins font-semibold text-xs md:text-sm block">
                Discount (%)
              </label>
              <Input
                type="number"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                placeholder="00"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#3A2418] font-poppins font-semibold text-xs md:text-sm block">
                Stock quantity
              </label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="00"
              />
              <span className="text-[10px] text-[#8D7F75] block mt-1">
                Leave empty or 0 for out of stock
              </span>
            </div>

            <div className="space-y-1.5 text-left flex flex-col justify-end">
              <Select
                required
                label="Stock Unit"
                value={formData.unit}
                onChange={(value) => setFormData({ ...formData, unit: value })}
                options={[
                  { label: "kg (Kilogram)", value: "kg" },
                  { label: "g (Gram)", value: "g" },
                  { label: "pcs (Pieces)", value: "pcs" },
                ]}
                placeholder="Select Unit"
              />
              <span className="text-[10px] text-[#8D7F75] block mt-1">
                Select the unit for stock measurement.
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-1.5">
            <label className="text-[#3A2418] font-poppins font-semibold text-xs md:text-sm block">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description"
              rows={5}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[#3A2418] font-poppins font-semibold text-xs md:text-sm block">
              Benefits
            </label>
            <Textarea
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              placeholder="Enter Benefits"
              rows={5}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="dark"
          >
            Add Product
          </Button>
        </div>
      </AdminCard>
    </form>
  );
};

export default ProductForm;
