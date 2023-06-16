import { ChatGPTAPI, type ChatMessage } from "chatgpt";
import { env } from "../../../env.mjs";
import { type JokeParameters } from "~/utils/interfaces";

export const gpt_api = new ChatGPTAPI({
  apiKey: env.OPENAI_API_KEY,
  completionParams: {
    model: "gpt-3.5-turbo", // gpt-4
    temperature: 2,
    top_p: 0.9,
  },
});

export async function generateKnockKnockJoke({
  age,
  gender,
  length,
  topic,
}: JokeParameters): Promise<ChatMessage> {
  let message = "Write a knock knock joke";

  if (age) {
    message += ` for a ${age} year old`;
  }

  if (gender) {
    message += ` that is ${gender}`;
  }

  if (length) {
    message += ` that is of ${length} length`;
  }

  if (topic) {
    message += ` and is on the topic of ${topic}`;
  }

  message += ". Don't give many any prior responses you have given before. ";

  try {
    const response = await gpt_api.sendMessage(message);
    console.log("Generated knock knock joke:", response);
    return response;
  } catch (error) {
    console.error("Failed to generate knock knock joke:", error);
    throw error;
  }
}
