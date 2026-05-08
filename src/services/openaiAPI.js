import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

//   Custom OpenAI agent prompt ID
//  This is where the tone, brand voice, and basic context live
const PROMPT_ID = "pmpt_69fd0936b64c8195b01fe81620bcf9b3032702d19f9942bc";

// Maximum allowed time for an API call

/**
 *  Streaming response from OpenAI's SDK API
 *
 * @param {string} message - user message
 * @param {string | null} previousResponseId - ID to chain responses to a conversation
 * * @param {AbortSignal} [options.signal] - Signal to cancel or timeout the request
 * @yields {{type: "delta", text: string} | {type: "done", responseId: string}}
 *
 */
export async function* sendMessage(
  message,
  { previousResponseId = null, signal } = {},
) {
  const stream = await openai.responses.create(
    {
      model: "gpt-5.5",
      input: message,
      store: true,
      stream: true,
      prompt: {
        id: PROMPT_ID,
        version: "1",
      },
      ...(previousResponseId && { previous_response_id: previousResponseId }),
    },
    { signal },
  );

  for await (const event of stream) {
    // Search for the output delta event that contains the streaming text
    if (event.type === "response.output_text.delta") {
      // Return the text from the delta event
      yield { type: "delta", text: event.delta };
    } else if (event.type === "response.completed") {
      // Return done after delta event and carries the response Id
      yield { type: "done", responseId: event.response.id };
    }
  }
}
