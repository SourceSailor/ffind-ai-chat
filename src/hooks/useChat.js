import { useState, useEffect } from "react";
import { sendMessage } from "../services/openaiAPI";
import { mapApiError } from "../utils/errors";

/**
 * Manages chat state, API responses and local storage chat message persistence
 *
 * @returns {{
 * chatMessages: {id: string, role: string, content: string}[]
 * error: {title: string, desc: string} | null
 * isLoading: boolean
 * clearError: () => void
 * clearChat: () => void
 * sendMessageToAI: (inputMessage: string) => Promise
 * }}
 */

const STORAGE_KEY = "chat_messages";

export const useChat = () => {
  // Use State function that returns the Local Storage item holding the chat messages shape
  const [chatMessages, setChatMessages] = useState(() => {
    // Try/Catch for better error handling
    // If data is malformed the catch block will return an empty array
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [previousResponseId, setPreviousResponseId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  // useEffect which sets the Chat Messages shape to Local Storage for the useState function
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatMessages));
    } catch {
      // storage quota exceeded — fail silently
    }
  }, [chatMessages]);

  const sendMessageToAI = async (inputMessage) => {
    // Return silently if input message is empty or isLoading is true
    if (!inputMessage.trim() || isLoading) return;

    // Optimistic user message shape
    // Set ChatMessages state before API call so that UI shows the user message immediately
    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: inputMessage,
    };

    setChatMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);
    setError(null);

    try {
      const data = await sendMessage(inputMessage, previousResponseId);

      /**
       OpenAI's response's shape varies depending on its reasoning.
       Because of this, the output text can exist on different indexes in the output response. 
    
       Search the output response to find the index that has type of message. Then, search that object for the output text and return it
       */
      const outputMessage = data?.output?.find(
        (block) => block.type === "message",
      );
      const aiText = outputMessage?.content?.find(
        (block) => block.type === "output_text",
      )?.text;

      if (!aiText) {
        throw new Error("Received an empty or unexpected response.");
      }

      // Previous Response ID (Responses API): Use this to create multi-turn conversations. - via OpenAI Documentation
      setPreviousResponseId(data.id);

      setChatMessages((prev) => [
        ...prev,
        {
          id: data.id,
          role: "assistant",
          content: aiText,
        },
      ]);
    } catch (err) {
      // Custom error function that returns a custom object - {title, description} - dependent on error type/status
      const mappedError = mapApiError(err);

      // Remove optimistic user message from UI if request fails
      setChatMessages((prev) =>
        prev.filter((msg) => msg.id !== userMessage.id),
      );

      setError(mappedError);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatMessages([]);
    setPreviousResponseId(null);
    setError(null);
  };

  return {
    chatMessages,
    error,
    isLoading,
    clearError,
    clearChat,
    sendMessageToAI,
  };
};
