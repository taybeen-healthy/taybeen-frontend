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
    <div className="bg-brand-green-pale py-8 md:py-4">
      <div className="max-w-7xl mx-auto px-6 md:px-24 flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
        {features.map((f, i) => (
          <Fragment key={i}>
            {/* Feature item */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
              <div className="w-7 h-7 flex items-center justify-center shrink-0">{f.icon}</div>
              <span className="text-brand-brown font-poppins font-semibold text-xl md:text-2xl text-center md:text-left">{f.text}</span>
            </div>
            {/* Vertical divider between items (desktop only) */}
            {i < features.length - 1 && (
              <div className="hidden lg:block w-px h-12 bg-brand-gold"></div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
