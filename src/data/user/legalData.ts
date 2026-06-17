import { LegalData } from "@/types";

export const legalData: LegalData = {
  shippingDelivery: {
    title: "Shipping & Delivery",
    sections: {
      processingTime: {
        title: "Processing Time",
        paragraphs: [
          "Taybeen utilizes priority shipping to deliver your order within 3-5 working days.",
          "All orders are processed within 24 hours of order acceptance (Monday to Saturday, excluding holidays).",
          "You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s).",
        ],
      },
      shippingRates: {
        title: "Shipping rates",
        paragraphs: [
          "Taybeen has a variable shipping fee depending on the delivery destination and size of the order.",
          "To find out exact shipping costs, please add your desired items into the cart and indicate delivery address to your basket. The final shipping fee will be calculated at the checkout.",
        ],
      },
      returnsPolicy: {
        title: "Returns Policy",
        paragraphs: [
          "At Taybeen, we take great care to ensure that all products arrive in excellent condition at the shipping address provided during checkout. If you are not fully satisfied with the quality of your order upon delivery, please contact us at contactus@taybeen.com within 48 hours of receiving your order, along with a detailed description and clear photographs of the issue.",
          "Due to the perishable nature of our products, claims submitted without adequate supporting documentation may not be eligible for replacement or exchange. Taybeen reserves the right to review and limit replacement requests at its discretion.",
        ],
        bullets: {
          title: "Taybeen is not responsible for failed deliveries when:",
          items: [
            "An incorrect or outdated address is provided",
            "The recipient is not available",
            "An amended/new delivery address is not provided within 24 hours of the first delivery attempt",
          ],
        },
        footerText:
          "Orders that are returned or diverted due to incorrect addresses, will be subject to additional charges based on the courier in the destination country.",
      },
      replacementsRefunds: {
        title: "Replacements Refunds",
        paragraphs: [
          "All replacement requests must be submitted within 48 hours of receiving your order by contacting our customer support team at contactus@taybeen.com. Once the request has been reviewed and approved, the replacement item(s) will be dispatched within 2-5 business days.",
          "If a replacement is not possible, a refund may be issued to the original payment method. Refunds may take between 10-30 business days to reflect in your account, depending on your payment provider and financial institution.",
        ],
        bullets: {
          title:
            "To qualify for a replacement or refund, at least one of the following conditions must apply:",
          items: [
            "The product has been damaged during delivery",
            "The product is defective or out of date",
            "The incorrect product was shipped",
          ],
        },
      },
    },
  },
  privacyPolicy: {
    title: "Privacy Policy",
    paragraphs: [
      "At Taybeen, we value your privacy and are committed to protecting your personal information.",
      "We may collect information such as your name, email address, phone number, shipping address, and payment details when you place an order, create an account, or contact us.",
      "Your information is used to process orders, provide customer support, improve our services, and communicate updates or promotional offers.",
      "We do not sell or rent your personal information. Information may be shared only with trusted service providers involved in payment processing, shipping, and website operations.",
      "By using our website, you consent to the collection and use of your information as outlined in this policy.",
      "For any privacy-related questions, please contact us at contactus@taybeen.com.",
    ],
  },
  termsConditions: {
    title: "Terms & Conditions",
    paragraphs: [
      "By accessing and using the Taybeen website, you agree to these Terms & Conditions.",
      "All products are subject to availability. Prices and product information may be updated without prior notice.",
      "Orders will be processed only after successful payment confirmation. Taybeen reserves the right to cancel or refuse any order at its discretion.",
      "Due to the perishable nature of our products, replacement or refund requests must be submitted within 48 hours of delivery along with supporting photographs where applicable.",
      "Approved affiliates may earn commissions through valid purchases made using their referral code. Taybeen reserves the right to modify or terminate the affiliate program at any time.",
      "All website content, including images, logos, and text, is the property of Taybeen and may not be reproduced without permission.",
      "For any questions, please contact us at contactus@taybeen.com.",
    ],
  },
};
