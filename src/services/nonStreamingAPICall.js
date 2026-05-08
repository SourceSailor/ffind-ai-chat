const OPENAI_URL = "https://api.openai.com/v1/responses";

const APIKEY = import.meta.env.VITE_OPENAI_API_KEY;

// API boilerplate function
const API_CALL = async ({ method, previousResponseId, message }) => {
  return fetch(`${OPENAI_URL}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${APIKEY}`,
    },
    body: JSON.stringify({
      model: "gpt-5.5",
      input: message,
      store: true,
      //   Custom AI agent prompt ID
      //  This is where the tone, brand voice, and basic context live
      prompt: {
        id: "pmpt_69fd0936b64c8195b01fe81620bcf9b3032702d19f9942bc",
        version: "1",
      },
      ...(previousResponseId && { previous_response_id: previousResponseId }),
    }),
  });
};

/**
 *
 * @param {string} message - user message
 * @param {string | null} previousResponseId - ID to chain responses to a conversation
 * @returns {promise <Object>} Raw OpenAI response object
 * @throws {Error}
 *
 */
export async function sendMessage(message, previousResponseId = null) {
  const response = await API_CALL({
    method: "POST",
    message: message,
    previousResponseId: previousResponseId,
    isStreaming: false,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => {});
    throw new Error(err?.error?.message ?? `API Error ${response.status}`);
  }
  const data = await response.json();

  return data;
}
