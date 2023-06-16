import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { generateKnockKnockJoke } from "../clients/gpt_client";
import { type ChatMessage } from "chatgpt";

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
    .mutation(async ({ input }): Promise<ChatMessage> => {
      return await generateKnockKnockJoke({ ...input });
    }),
});
