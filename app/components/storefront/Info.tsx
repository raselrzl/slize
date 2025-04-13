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
      setOpenOnComputer(window.innerWidth >= 768); // md breakpoint
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
        className="w-9 p-0 md:hidden" // Hide icon on desktop
      >
        <ChevronsUpDown className="h-4 w-4" />
        <span className="sr-only">Toggle</span>
      </Button>
    </CollapsibleTrigger>
  );

  return (
    <div className="flex flex-wrap gap-4 bg-pink-900 text-white w-full max-w-screen-xl mx-auto px-4 py-8">
      {/* Help & Contact */}
      <Collapsible {...collapsibleProps(openHelp, setOpenHelp)} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Help & contact</h4>
          {collapsibleToggleButton}
        </div>
        <CollapsibleContent className={collapsibleContentClass}>
          {[
            "Frequently asked questions",
            "Delivery time",
            "Payment & security",
            "Invoice payment",
            "Delivery and return costs",
          ].map((item, i) => (
            <div key={i} className="px-4 py-3 font-mono text-sm">
              {item}
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
          {["About us", "Career", "Investor"].map((item, i) => (
            <div key={i} className="px-4 py-3 font-mono text-sm">
              {item}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Delivery Partners */}
      <Collapsible {...collapsibleProps(openDelivery, setOpenDelivery)} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Our delivery partner</h4>
          {collapsibleToggleButton}
        </div>
        <CollapsibleContent className={collapsibleContentClass}>
          <div className="flex flex-wrap gap-2 justify-center p-2">
            {["postnord.png", "budbee.png", "instabox.png"].map((src, i) => (
              <img
                key={i}
                src={`/${src}`}
                alt={src}
                className="h-10 w-30 rounded-md shadow-md object-cover"
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Your Options */}
      <Collapsible {...collapsibleProps(openOptions, setOpenOptions)} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Your Options</h4>
          {collapsibleToggleButton}
        </div>
        <CollapsibleContent className={collapsibleContentClass}>
          {["Free delivery", "Free Returns", "30-day open purchase"].map((item, i) => (
            <div key={i} className="px-4 py-3 font-mono text-sm">
              {item}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Payment Options */}
      <Collapsible {...collapsibleProps(openPayment, setOpenPayment)} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Payment options</h4>
          {collapsibleToggleButton}
        </div>
        <CollapsibleContent className={collapsibleContentClass}>
          <div className="flex flex-wrap gap-2 justify-center p-2">
            {["ax.png", "mastercard.png", "visa.png"].map((src, i) => (
              <img
                key={i}
                src={`/payments/${src}`}
                alt={src}
                className="h-10 w-24 rounded-md shadow-md object-cover"
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
