import { OpenAIApi, Configuration } from "openai";
import { env } from "../../../env.mjs";
import { type JokeParameters } from "~/utils/interfaces";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const gpt_api = new OpenAIApi(configuration);
const gpt_completion = {
  model: "gpt-3.5-turbo", // gpt-4
  temperature: 2,
  top_p: 0.9,
};

export async function generateKnockKnockJoke({
  age,
  gender,
  length,
  topic,
}: JokeParameters): Promise<string> {
  let message = "Write a knock knock joke";

  if (age) {
    message += ` for a ${age} year old`;
  }

  if (gender) {
    message += ` that is ${gender}`;
  }

  if (length) {
    message += ` that is roughly ${length} words in length`;
  }

  if (topic) {
    message += ` and is on the topic of ${topic}`;
  }

  message += ". Don't give many any prior responses you have given before. ";

  try {
    const chatResponse = await gpt_api.createChatCompletion({
      ...gpt_completion,
      messages: [{ role: "user", content: message }],
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return chatResponse.data.choices[0]?.message?.content ?? "";
  } catch (error) {
    console.error("Failed to generate knock knock joke:", error);
    throw error;
  }
}
