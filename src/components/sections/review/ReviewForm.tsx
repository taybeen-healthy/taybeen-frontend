import React, { useState, useRef } from "react";
import { Star, Upload, X, ArrowRight } from "lucide-react";
import { Select } from "@/components/ui/Select";

const productsList = [
  "Mejdool Dates",
  "Ajwa Dates",
  "Safawi Dates",
  "Mabroom Dates",
];

interface ReviewFormProps {
  onSubmitSuccess: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmitSuccess }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [productPurchased, setProductPurchased] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [experience, setExperience] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRatingClick = (val: number) => {
    setRating(val);
    if (errors.rating) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.rating;
        return copy;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles: File[] = [];
      const validPreviews: string[] = [];

      selectedFiles.forEach((file) => {
        if (!file.type.startsWith("image/")) {
          alert("Only image files are allowed.");
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} exceeds the 5MB size limit.`);
          return;
        }
        validFiles.push(file);
        validPreviews.push(URL.createObjectURL(file));
      });

      setImages((prev) => [...prev, ...validFiles]);
      setPreviews((prev) => [...prev, ...validPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!productPurchased) newErrors.productPurchased = "Please select a product";
    if (rating === 0) newErrors.rating = "Please provide a rating";
    if (!experience.trim()) newErrors.experience = "Review experience text is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
      {/* Full Name & Email grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div>
          <label htmlFor="fullName" className="text-[#3A2418] font-poppins font-semibold text-xs md:text-sm mb-2 block text-left">
            Full Name*
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) {
                setErrors((prev) => {
                  const copy = { ...prev };
                  delete copy.fullName;
                  return copy;
                });
              }
            }}
            placeholder="Enter Your Name"
            className={`w-full bg-white border ${
              errors.fullName ? "border-red-500 focus:ring-red-200" : "border-[#D1C7BD] focus:border-brand-primary"
            } rounded-lg py-3 px-4 text-brand-brown font-poppins text-sm placeholder-[#C2B5A8] focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all`}
          />
          {errors.fullName && (
            <p className="text-red-500 font-poppins text-[10px] md:text-xs mt-1 text-left">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-[#3A2418] font-poppins font-semibold text-xs md:text-sm mb-2 block text-left">
            Email Address (Optional)
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="w-full bg-white border border-[#D1C7BD] rounded-lg py-3 px-4 text-brand-brown font-poppins text-sm placeholder-[#C2B5A8] focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all"
          />
        </div>
      </div>

      {/* Product Purchased */}
      <Select
        label="Product Purchased"
        required
        value={productPurchased}
        onChange={(val) => {
          setProductPurchased(val);
          if (errors.productPurchased) {
            setErrors((prev) => {
              const copy = { ...prev };
              delete copy.productPurchased;
              return copy;
            });
          }
        }}
        options={productsList}
        placeholder="Select a product"
        error={errors.productPurchased}
      />

      {/* Rating */}
      <div>
        <label className="text-[#3A2418] font-poppins font-semibold text-xs md:text-sm mb-2 block text-left">
          How would you rate your experience?*
        </label>
        <div className="flex items-center gap-1.5 py-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none transition-transform hover:scale-110 active:scale-95 duration-100"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                size={28}
                className="cursor-pointer transition-colors duration-200"
                fill={star <= (hoverRating || rating) ? "#F7A503" : "transparent"}
                stroke="#F7A503"
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-red-500 font-poppins text-[10px] md:text-xs mt-1 text-left">{errors.rating}</p>
        )}
      </div>

      {/* Textarea & Photos Layout Grid (Responsive) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {/* Share Experience Textarea */}
        <div>
          <label htmlFor="experience" className="text-[#3A2418] font-poppins font-semibold text-xs md:text-sm mb-2 block text-left">
            Share your experience*
          </label>
          <textarea
            id="experience"
            value={experience}
            onChange={(e) => {
              setExperience(e.target.value);
              if (errors.experience) {
                setErrors((prev) => {
                  const copy = { ...prev };
                  delete copy.experience;
                  return copy;
                });
              }
            }}
            placeholder="Write your review here..."
            className={`w-full bg-white border ${
              errors.experience ? "border-red-500 focus:ring-red-200" : "border-[#D1C7BD] focus:border-brand-primary"
            } rounded-lg py-3 px-4 h-32 placeholder-[#C2B5A8] text-brand-brown font-poppins text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all resize-none`}
          />
          {errors.experience && (
            <p className="text-red-500 font-poppins text-[10px] md:text-xs mt-1 text-left">{errors.experience}</p>
          )}
        </div>

        {/* Photo Upload Zone */}
        <div>
          <label className="text-[#3A2418] font-poppins font-semibold text-xs md:text-sm mb-2 block text-left">
            Add Photos (Optional)
          </label>
          <div
            onClick={triggerFileInput}
            className="border-2 border-dashed border-[#D1C7BD] hover:border-brand-primary rounded-lg flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors bg-white h-32 relative group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
            />
            <div className="w-8 h-8 rounded-full bg-brand-green-pale flex items-center justify-center text-brand-green mb-2 group-hover:scale-105 transition-transform">
              <Upload size={16} strokeWidth={2.5} />
            </div>
            <p className="text-brand-primary font-poppins font-bold text-xs">
              Click to upload images
            </p>
            <p className="text-[#8D7F75] font-poppins text-[10px] mt-1">
              PNG, JPG up to 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Thumbnail Previews */}
      {previews.length > 0 && (
        <div className="space-y-2 animate-in fade-in duration-300">
          <p className="text-brand-brown font-poppins text-xs font-semibold text-left">
            Uploaded Images ({previews.length})
          </p>
          <div className="flex flex-wrap gap-3 p-3 bg-white border border-[#D1C7BD]/60 rounded-lg">
            {previews.map((src, index) => (
              <div key={index} className="relative w-16 h-16 rounded-md overflow-hidden border border-[#D1C7BD] shadow-sm group/thumb">
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors shadow"
                  aria-label="Remove image"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Consent Checkbox */}
      <div className="flex items-start gap-3 pt-1 select-none">
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="w-4 h-4 mt-0.5 rounded border-[#D1C7BD] text-brand-green focus:ring-brand-green accent-brand-green cursor-pointer"
        />
        <label htmlFor="consent" className="text-brand-brown font-poppins text-xs md:text-sm cursor-pointer leading-normal text-left">
          I agree to have my reviews displayed on the website
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#2C3A1A] hover:bg-[#3d4f26] disabled:bg-[#2C3A1A]/70 text-white font-poppins font-bold uppercase text-xs md:text-sm tracking-wider py-4 rounded-lg shadow-md transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2.5"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            SUBMITTING...
          </>
        ) : (
          <>
            SUBMIT REVIEW
            <ArrowRight size={14} />
          </>
        )}
      </button>
    </form>
  );
};
