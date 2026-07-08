import React from "react";

interface BrandLoaderProps {
  fullPage?: boolean;
  text?: string;
  className?: string;
}

export const BrandLoader: React.FC<BrandLoaderProps> = ({
  fullPage = true,
  text,
  className = "",
}) => {
  const patternStyle = {
    backgroundColor: "#FDFAF3",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath d='M42 22 C48 12, 60 12, 68 18 C58 24, 48 26, 42 22 Z' fill='%23F7A503' fill-opacity='0.05'/%3E%3Cpath d='M58 20 C64 12, 74 15, 78 22 C70 26, 62 25, 58 20 Z' fill='%234A5E28' fill-opacity='0.05'/%3E%3Ctext x='48' y='78' font-family='serif' font-size='80' font-weight='800' fill='%235A3E2B' fill-opacity='0.04' text-anchor='middle'%3ET%3C/text%3E%3C/svg%3E")`,
    backgroundRepeat: "repeat",
  };

  if (fullPage) {
    return (
      <div
        style={patternStyle}
        className={`min-h-screen w-full flex flex-col items-center justify-center font-poppins relative select-none ${className}`}
      >
        <div className="flex flex-col items-center gap-6 animate-pulse">
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-white rounded-full border border-[#C4A482]/20 shadow-premium">
            <img
              src="/LogoInitial.svg"
              className="w-16 h-16 md:w-22 md:h-22 object-contain select-none"
              alt="Taybeen Logo"
            />
          </div>

          <div className="text-center space-y-1.5">
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-widest text-[#5A3E2B] uppercase">
              Taybeen
            </h1>
            <p className="font-poppins text-[10px] md:text-xs font-semibold text-[#4A5E28] tracking-[0.3em] uppercase">
              {text || "Pure Energy"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      <div className="animate-pulse flex flex-col items-center gap-3">
        <div className="relative w-14 h-14 flex items-center justify-center bg-[#FDFAF3] rounded-full border border-[#C4A482]/15 shadow-sm">
          <img
            src="/LogoInitial.svg"
            className="w-9 h-9 object-contain select-none"
            alt="Taybeen Logo"
          />
        </div>
        {text && (
          <p className="font-poppins text-xs font-semibold text-[#5A3E2B]/80 tracking-wider text-center max-w-[200px]">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default BrandLoader;
