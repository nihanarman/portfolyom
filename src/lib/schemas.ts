import { z } from "zod";

export const projectFrontmatter = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string().max(160),
  outcome: z.string().max(200),
  role: z.string(),
  period: z.string(),
  year: z.number(),
  status: z.enum(["live", "wip", "archived"]),
  team: z.string(),
  stack: z.array(z.string()).min(1).max(8),
  cover: z.string(),
  coverAlt: z.string().min(20),
  links: z.object({
    live: z.string().url().optional(),
    repo: z.string().url().optional(),
  }),
  featured: z.boolean().default(false),
  order: z.number().default(99),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatter>;
