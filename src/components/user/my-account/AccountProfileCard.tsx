import React from "react";
import { User } from "lucide-react";

interface AccountProfileCardProps {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatarUrl?: string;
  };
  onEdit: () => void;
}

export const AccountProfileCard: React.FC<AccountProfileCardProps> = ({ profile, onEdit }) => {
  const fullName = `${profile.firstName} ${profile.lastName}`.trim() || "User";
  const [imageError, setImageError] = React.useState(false);

  const initialLetter = (profile.firstName || profile.lastName || fullName || "?")
    .trim()
    .charAt(0)
    .toUpperCase();

  React.useEffect(() => {
    setImageError(false);
  }, [profile.avatarUrl]);

  return (
    <div className="w-full bg-white border border-[#C4A482]/25 rounded-2xl flex flex-row lg:flex-col items-center lg:justify-center p-4 sm:p-5 lg:p-8 shadow-sm h-full gap-4 lg:gap-4 font-poppins select-none">
      <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full border border-brand-brown/15 flex items-center justify-center text-[#7D6B5E] bg-[#FDFBF7] flex-shrink-0 overflow-hidden">
        {profile.avatarUrl && !imageError ? (
          <img
            src={profile.avatarUrl}
            alt={fullName}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#5A3E2B] to-[#3A2418] flex items-center justify-center text-[#F7A503] font-serif font-bold text-2xl lg:text-4xl">
            {initialLetter}
          </div>
        )}
      </div>

      <div className="flex-1 lg:flex-none lg:text-center text-left min-w-0">
        <h3 className="font-serif text-base sm:text-lg lg:text-2xl font-bold text-brand-brown leading-tight truncate">
          {fullName}
        </h3>
        <p className="font-poppins text-xs sm:text-sm text-[#7D6B5E] mt-0.5 font-medium">
          Customer
        </p>
      </div>

      <div className="lg:mt-1 flex-shrink-0">
        <button
          onClick={(e) => {
            e.preventDefault();
            onEdit();
          }}
          className="text-[#768C3A] hover:underline text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default AccountProfileCard;
