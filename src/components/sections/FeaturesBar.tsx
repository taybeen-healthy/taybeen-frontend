/**
 * FeaturesBar — Horizontal bar of key selling points with icons.
 * Displays: 100% Natural Snacks, No Artificial Additives, Easy Return, 24/7 Support.
 */

import { Leaf, FlaskConical, RotateCcw, Headset } from "lucide-react";
import { Fragment } from "react";

export const FeaturesBar: React.FC = () => {
  /* Feature items with their corresponding lucide-react icons */
  const features = [
    { icon: <Leaf className="text-brand-brown" />, text: "100% Natural Snacks" },
    { icon: <FlaskConical className="text-brand-brown" />, text: "No Artificial Additives" },
    { icon: <RotateCcw className="text-brand-brown" />, text: "Easy Return" },
    { icon: <Headset className="text-brand-brown" />, text: "24/7 Support" },
  ];

  return (
    <div className="bg-brand-green-pale py-6 sm:py-7 md:py-8 lg:py-6">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 xl:px-10 2xl:px-12">
        {/* Mobile & Tablet: Vertical stacked layout */}
        <div className="flex flex-col items-center gap-5 sm:gap-6 lg:hidden">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 sm:gap-4">
              <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shrink-0">
                {f.icon}
              </div>
              <span className="text-brand-brown font-poppins font-semibold text-base sm:text-lg md:text-xl whitespace-nowrap">
                {f.text}
              </span>
            </div>
          ))}
        </div>

        {/* Desktop: Horizontal layout with dividers */}
        <div className="hidden lg:flex justify-between items-center gap-4 xl:gap-6">
          {features.map((f, i) => (
            <Fragment key={i}>
              {/* Feature item */}
              <div className="flex items-center gap-3 xl:gap-4">
                <div className="w-6 h-6 xl:w-7 xl:h-7 flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <span className="text-brand-brown font-poppins font-semibold text-base lg:text-base xl:text-lg 2xl:text-xl whitespace-nowrap">
                  {f.text}
                </span>
              </div>
              {/* Vertical divider between items */}
              {i < features.length - 1 && (
                <div className="w-px h-10 xl:h-12 bg-brand-gold shrink-0"></div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
