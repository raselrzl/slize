"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function Info() {
  const [openHelp, setOpenHelp] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openDelivery, setOpenDelivery] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  const [openOnComputer, setOpenOnComputer] = useState(true);
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (!isClient) return;
    const checkScreenSize = () => {
      setOpenOnComputer(window.innerWidth >= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isClient]);

  const isDesktop = openOnComputer;

  const collapsibleProps = (openState: boolean, setOpenState: (v: boolean) => void) => ({
    open: isDesktop ? true : openState,
    onOpenChange: isDesktop ? undefined : setOpenState,
  });

  const collapsibleContentClass = isDesktop ? "block" : "";

  const collapsibleToggleButton = (
    <CollapsibleTrigger asChild>
      <Button
        variant="ghost"
        size="sm"
        className="w-9 p-0 md:hidden"
      >
        <ChevronsUpDown className="h-4 w-4" />
        <span className="sr-only">Toggle</span>
      </Button>
    </CollapsibleTrigger>
  );

  return (
    <div className="flex flex-wrap gap-4 bg-gray-800 text-white w-full max-w-screen-xl mx-auto px-4 py-8">
      
      {/* Help & Contact */}
      <Collapsible {...collapsibleProps(openHelp, setOpenHelp)} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Help & Contact</h4>
          {collapsibleToggleButton}
        </div>
        <CollapsibleContent className={collapsibleContentClass}>
          {[
            { text: "FAQ", link: "/faq" },
            { text: "Delivery Time", link: "/delivery-time" },
            { text: "Payment & Security", link: "/payment-security" },
            { text: "Invoice Payment", link: "/invoice-payment" },
            { text: "Delivery & Returns", link: "/delivery-returns" },
          ].map((item, i) => (
            <div key={i} className="px-4 py-2 text-xs">
              <a href={item.link} className="text-white hover:underline">{item.text}</a>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* About Kronstil */}
      <Collapsible {...collapsibleProps(openAbout, setOpenAbout)} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">About Kronstil</h4>
          {collapsibleToggleButton}
        </div>
        <CollapsibleContent className={collapsibleContentClass}>
          {[
            { text: "About Us", link: "/about-us" },
            { text: "Career", link: "/career" },
            { text: "Investor Relations", link: "/investor" },
          ].map((item, i) => (
            <div key={i} className="px-4 py-2 text-xs">
              <a href={item.link} className="text-white hover:underline">{item.text}</a>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

     

      {/* Your Options */}
      <Collapsible {...collapsibleProps(openOptions, setOpenOptions)} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Customer Options</h4>
          {collapsibleToggleButton}
        </div>
        <CollapsibleContent className={collapsibleContentClass}>
          {[
            { text: "Free Delivery", link: "/free-delivery" },
            { text: "Free Returns", link: "/free-returns" },
            { text: "30-Day Open Purchase", link: "/open-purchase" },
          ].map((item, i) => (
            <div key={i} className="px-4 py-2 text-sm">
              <a href={item.link} className="text-white hover:underline text-xs">{item.text}</a>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Payment Options */}
      <Collapsible {...collapsibleProps(openPayment, setOpenPayment)} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Payment Options</h4>
          {collapsibleToggleButton}
        </div>
        <CollapsibleContent className={collapsibleContentClass}>
          <div className="flex flex-wrap gap-2 justify-start p-2">
            {["ax.png", "mastercard.png", "visa.png"].map((src, i) => (
              <img
                key={i}
                src={`/payments/${src}`}
                alt={src.split(".")[0]}
                className="h-8 w-20 object-fill"
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

       {/* Delivery Partners */}
      <Collapsible {...collapsibleProps(openDelivery, setOpenDelivery)} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Delivery Partners</h4>
          {collapsibleToggleButton}
        </div>
        <CollapsibleContent className={collapsibleContentClass}>
          <div className="flex flex-wrap gap-2 justify-start p-2">
            {["postnord.png", "budbee.png", "instabox.png"].map((src, i) => (
              <img
                key={i}
                src={`/${src}`}
                alt={src.split(".")[0]}
                className="h-8 w-24 object-fill"
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

    </div>
  );
}
