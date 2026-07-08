export interface ContactHeroContent {
  title: string;
  description: string;
  backgroundImage: string;
}

export interface QuickConnectInfo {
  title: string;
  email: string;
  phones: string[];
}

export interface CustomerServiceInfo {
  title: string;
  hours: string[];
}

export interface ContactData {
  hero: ContactHeroContent;
  connect: QuickConnectInfo;
  service: CustomerServiceInfo;
}

export const contactData: ContactData = {
  hero: {
    title: "We're just a message away!",
    description:
      "Whether you have a question about our dates, gifting options, orders, or simply want to say hello, we'd love to hear from you",
    backgroundImage: "/authBG.webp",
  },
  connect: {
    title: "Quick Connect",
    email: "contactus@taybeen.com",
    phones: ["+91 9560722952", "+91 9958544930"],
  },
  service: {
    title: "Customer Service",
    hours: ["Monday to Saturday 9:00 AM – 5:30 PM", "Sunday 9:00 AM – 3:30 PM"],
  },
};
