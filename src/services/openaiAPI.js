const OPENAI_URL = "https://api.openai.com/v1/responses";

const APIKEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function sendMessage(message, previousResponseId = null) {
  const response = await fetch(`${OPENAI_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${APIKEY}`,
    },
    body: JSON.stringify({
      model: "gpt-5.4",
      input: message,
      store: true,
      ...(previousResponseId && { previous_response_id: previousResponseId }),
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => {});
    throw new Error(err?.error?.message ?? `API Error ${response.status}`);
  }
  const data = await response.json();

  console.log("Send Message Function -- API Response: ", data);

  return data;
}
