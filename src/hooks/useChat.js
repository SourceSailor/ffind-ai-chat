import { useState, useEffect } from "react";
import { APIUserAbortError } from "openai";
import { sendMessage } from "../services/openaiAPI";
import { mapApiError } from "../utils/errors";
import { createTimeoutSignal } from "../utils/apiTimeout";

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

// Key for Local Storage (chat messages)
const STORAGE_KEY = "chat_messages";

// Maximum length for chat messages.trim()
const MAX_INPUT_LENGTH = 50000;

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
    const trimmed = inputMessage.trim();
    // Return silently if input message is empty or isLoading is true
    if (!trimmed.trim() || isLoading) return;

    if (trimmed.length > MAX_INPUT_LENGTH) {
      setError({
        title: "Message too long",
        desc: `Keep it under ${MAX_INPUT_LENGTH} characters.`,
      });
      return;
    }

    // Optimistic user message shape
    // Set ChatMessages state before API call so that UI shows the user message immediately
    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };
    const assistantId = crypto.randomUUID();

    setChatMessages((prev) => [...prev, userMessage]);

    const timeoutSignal = createTimeoutSignal();
    setIsLoading(true);
    setError(null);

    try {
      // Streaming Response
      for await (const event of sendMessage(trimmed, {
        previousResponseId,
        signal: timeoutSignal,
      })) {
        if (event.type === "delta") {
          setChatMessages((prev) => {
            const last = prev[prev.length - 1];
            // First delta event append the new assistant message defined above
            if (last?.id !== assistantId) {
              return [
                ...prev,
                { id: assistantId, role: "assistant", content: event.text },
              ];
            }
            // Return the rest of the delta text events
            return prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + event.text }
                : m,
            );
          });
        } else if (event.type === "done") {
          setPreviousResponseId(event.responseId);
        }
      }
    } catch (err) {
      // Open AI's SDK returns APIUserAbortError when throwing an error
      // If an abort/timeout we exit early and set the error title and desc to update the UI
      if (err instanceof APIUserAbortError) {
        if (timeoutSignal.aborted) {
          setError({
            title: "Request timed out",
            desc: "The assistant took too long to respond. Please try again.",
          });
        }
        // user-initiated cancel
        return;
      }

      // Custom error function that returns a custom object - {title, description} - dependent on error type/status
      const mappedError = mapApiError(err);

      // user cancelled — no error to show
      if (!mappedError) return;

      setChatMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, error: true } : m)),
      );

      if (timeoutSignal.aborted) {
        setError({
          title: "Request timed out",
          desc: "The assistant took too long to respond. Please try again.",
        });
      }

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
