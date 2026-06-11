"use client";

import React, { useState } from "react";
import {
  ReviewForm,
  ReviewSuccessModal,
  ReviewHeader,
  ReviewSidebar
} from "@/components/sections/review";

export default function ReviewPage() {
  const [submitCount, setSubmitCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReset = () => {
    setSubmitCount((prev) => prev + 1);
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {isSuccess && (
        <ReviewSuccessModal onReset={handleReset} />
      )}

      <div className="flex-1 lg:w-[55%] flex flex-col justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-12 xl:px-20 bg-white">
        <div className="max-w-2xl mx-auto w-full">
          <ReviewHeader />
          <ReviewForm key={submitCount} onSubmitSuccess={() => setIsSuccess(true)} />
        </div>
      </div>

      <ReviewSidebar />
    </div>
  );
}
