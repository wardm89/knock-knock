import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateKnockKnockJoke } from "../clients/gpt_client";
import { z } from "zod";

export const jokesRouter = createTRPCRouter({
  getJoke: publicProcedure
    .input(
      z.object({
        age: z.string().optional(),
        gender: z.string().optional(),
        topic: z.string().optional(),
        length: z.string().optional(),
      })
    )
    .query(async ({ input }): Promise<string> => {
      return await generateKnockKnockJoke({ ...input });
    }),
});
