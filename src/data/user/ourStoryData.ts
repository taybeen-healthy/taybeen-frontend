export interface SectionContent {
  pillText?: string;
  title: string;
  description?: string;
  tagline?: string;
  paragraphs?: string[];
  imagePath?: string;
}

export interface FounderData {
  title: string;
  quote: string;
  paragraphs: string[];
  name: string;
  role: string;
  imagePath: string;
}

export interface OurStoryData {
  hero: SectionContent;
  whyDates: SectionContent;
  mission: SectionContent;
  founder: FounderData;
}

export const ourStoryData: OurStoryData = {
  hero: {
    pillText: "Started in 2026",
    title: "A Gift from the Desert.",
    description: "Inspired by the desert's most treasured fruit — TAYBEEN brings premium dates and date-based creations to everyday life.",
    tagline: "A Gift from the Desert, shared with the world.",
    imagePath: "/ComingSoon Dates.png"
  },
  whyDates: {
    pillText: "The Fruit Behind the Brand",
    title: "Why Dates?",
    paragraphs: [
      "Because no other natural food does what a date does. One or two a day and you've covered your quick energy, your fibre, your iron, and your potassium — with zero processing involved.",
      "Dates aren't a trend. They're one of the oldest cultivated fruits on earth. We just think it's time more people in India discovered how extraordinary a really good date can taste."
    ],
    imagePath: "/7844d57c9be79ee5e7b88ccbc592df37 1.png"
  },
  mission: {
    pillText: "OUR MISSION",
    title: "To help people rediscover dates — not only as a symbol of tradition and generosity, but as a wholesome part of modern living.",
    imagePath: "/Image (Premium dates on a plate).png"
  },
  founder: {
    title: "Founder's Note",
    quote: "I started Taybeen because I was tired of compromising. Tired of snacks that claimed to be natural but came with a list of ingredients that read like a chemistry paper.",
    paragraphs: [
      "Dates were always the answer for me — but finding good dates in India felt impossible. The ones at supermarkets were old, or coated, or just... sad. So I decided to go find the good ones myself.",
      "They have always been close to my heart, not just for their rich taste but for their natural goodness. My vision is to make dates a convenient, healthy snack that people can enjoy anywhere—while traveling, working, or on the go. In a world full of processed snacks, dates offer a wholesome, nourishing, and satisfying alternative.",
      "We're still a small team. That's intentional. It means I can still personally approve every supplier. Every variety we add to the range has been tasted, tested, and obsessed over."
    ],
    name: "Mohd Arif",
    role: "Founder & CEO, Taybeen Pure Energy",
    imagePath: "/Image (Pile of premium dates).png"
  }
};
