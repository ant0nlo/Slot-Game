import { z } from "zod";

export const ConfigSchema = z.object({
  reelsCount: z.number().positive(),
  rowsCount: z.number().positive(),
  reels: z.array(z.array(z.number())).nonempty("Reels array cannot be empty"),
  lines: z.array(z.array(z.number())).nonempty("Lines array cannot be empty"),
  symbols: z
    .record(z.string(), z.array(z.number().min(0)))
    .refine(obj => Object.keys(obj).length > 0, {
      message: "Symbols must contain at least one entry",
    }),
});

export type ConfigType = z.infer<typeof ConfigSchema>;
