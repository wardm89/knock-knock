/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChatGPTAPI } from "chatgpt";
import { env } from "../../../env.mjs";
import { type JokeParameters } from "~/utils/interfaces";

export const gpt_api = new ChatGPTAPI({
  apiKey: env.OPENAI_API_KEY,
  completionParams: {
    model: "gpt-3.5-turbo", // gpt-4
    temperature: 0.5,
    top_p: 0.8,
  },
});

// Example usage: Sending a message to ChatGPT API and receiving the reply
// const userMessage = "Hello, how are you?";

export async function generateKnockKnockJoke({
  age,
  gender,
  length,
  topic,
}: JokeParameters): Promise<string> {
  console.log("env", env.OPENAI_API_KEY);
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

  message += ".";

  try {
    const response = await gpt_api.sendMessage(message);
    console.log(response);
    const reply = response.text;
    return reply;
  } catch (error) {
    console.error("Failed to generate knock knock joke:", error);
    throw error;
  }
}
// Example usage
const jokeParams: JokeParameters = {
  age: "10",
  gender: "male",
  topic: "parents",
  length: "short",
};

generateKnockKnockJoke(jokeParams)
  .then((joke) => {
    console.log("Knock Knock Joke:", joke);
  })
  .catch((error) => {
    console.error("Failed to generate joke:", error);
  });
