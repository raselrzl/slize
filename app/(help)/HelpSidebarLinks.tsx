// app/components/HelpSidebarLinks.tsx
"use client";

export interface LinkItem {
  id: number;
  name: string;
  href: string;
  img?: string;
}

export const HelpSidebarLinks: LinkItem[] = [
  // Help & Contact
  { id: 0, name: "Contact", href: "/help-contact" },
  { id: 1, name: "Frequently asked questions", href: "/faq" },
  { id: 2, name: "Delivery time", href: "/delivery-time" },
  { id: 3, name: "Payment & security", href: "/payment-security" },
  { id: 4, name: "Invoice payment", href: "/invoice-payment" },
  { id: 5, name: "Delivery and return costs", href: "/delivery-returns" },

  // About Kronstil
  { id: 6, name: "About Kronstil", href: "/about" },
  { id: 7, name: "About us", href: "/about-us" },
  { id: 8, name: "Career", href: "/career" },
  { id: 9, name: "Investor", href: "/investor" },
  { id: 10, name: "Our delivery partner", href: "/delivery-partner" },

  // Your Options
  { id: 11, name: "Free delivery", href: "/free-delivery" },
  { id: 12, name: "Free Returns", href: "/free-returns" },
  { id: 13, name: "30-day open purchase", href: "/open-purchase" },
  { id: 14, name: "Payment options", href: "/payment-options" },
];
