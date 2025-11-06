import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  available: z.number().min(0).optional(),
  status: z.enum(["draft", "published", "archived"]),
  price: z.number().min(1),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.enum(["men", "women", "kids","baby", "toddlerboys", "toddlergirls", "kidgirlsfourtofive","kidboysfourtofive" ]),
  isFeatured: z.boolean().optional(),
});

export const bannerSchema = z.object({
  title: z.string(),
  imageString: z.string(),
});
