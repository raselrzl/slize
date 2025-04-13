"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import React from "react";

export default function InfoAlert() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <InfoIcon className="mb-2 hover:cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader className="flex flex-col space-y-4">
          <AlertDialogTitle className="text-xl font-bold flex text-center justify-between border-b-2">
            <span>Info 😊{" "}</span>
            <AlertDialogCancel className="text-red-600 hover:bg-red-50 w-10 flex justify-center border-none">
              X
            </AlertDialogCancel>
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm space-y-6 text-gray-700">
            <span className="font-semibold text-lg mb-1">
              🌍 Ethical Sourcing <br />
            </span>
            <span>
              All our clothes and branding are imported from Bangladesh — known
              for top-quality textiles and craftsmanship.
            </span>
            <br />
            <span className="font-semibold text-lg mb-1">👶 Just for Kids</span>
            <br />
            <span>
              Our products are specially designed for children, focusing on both
              style and function.
            </span>
            <br />
            <span className="font-semibold text-lg mb-1">
              🧵 Quality & Comfort
            </span>
            <br />
            <span>
              From stitching to fabric, we ensure everything is soft, durable,
              and safe for everyday play.
            </span>
            <br />
            <span className="font-semibold text-lg mb-1">💚 Health First</span>
            <span>
              Our priority is your child’s comfort and safety. That’s why we use
              skin-friendly, chemical-free materials.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
