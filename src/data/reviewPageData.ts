export interface ReviewPageConfig {
  logoUrl: string;
  comingSoonImage: string;
  desktopHeader: {
    title: string;
    description: string;
  };
  mobileComingSoon: {
    title: string;
    description: string;
  };
}

export const reviewPageData: ReviewPageConfig = {
  logoUrl:
    "https://s3-alpha-sig.figma.com/img/aef5/42bb/91997904de2c2fba272a345f8e640566?Expires=1781481600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FkHOx1DQ9tCpg2LfaGWPEahyYclX5a07TKu8PWLxLk3iSdpazH8XGXMYe8TpS23YZfpwXmAz-AZkM9jf3WSWFX3VM7Aol9uKZzY~iTeh~XLi7tXNle78G63lxxLQsPO5qF8O6dnYVoDlAuoYEhEHcTABf7RhrrYHPEjF-NOwpyfzVfQpmobUjFvJamM7vfxxCNehvQ3s5ioKA0OXGibBcUyQ7xhKg4IL70pP9yeI4c5N~6yvjoAM2Qw-6rj2rMslOTohfYJjBMV~ghZpoHtXxEAcXfXSM5Vz00H93O0yHKZ915D0kFsATfjYNighrCUBoONcchwDqXihkU0x1-M4ug__",
  comingSoonImage: "/ComingSoon Dates.png",
  desktopHeader: {
    title: "Leave a Review",
    description: "We'd love to hear about your experience. Your feedback helps us serve you better!"
  },
  mobileComingSoon: {
    title: "Something Sweet is Arriving Soon!",
    description: "We're crafting an exquisite experience for premium dates, elegant gifting and gourmet indulgence. Stay tuned!"
  }
};
