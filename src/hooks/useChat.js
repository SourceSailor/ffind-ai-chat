import { useState, useEffect } from "react";
import { sendMessage } from "../services/openaiAPI";
import { mapApiError } from "../utils/errors";

const STORAGE_KEY = "chat_messages";

export const useChat = () => {
  const [chatMessages, setChatMessages] = useState(() => {
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatMessages));
    } catch {
      // storage quota exceeded — fail silently
    }
  }, [chatMessages]);

  const sendMessageToAI = async (inputMessage) => {
    if (!inputMessage.trim() || isLoading) return;

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

      const aiText = data?.output[0]?.content[0]?.text;

      if (!aiText) {
        throw new Error("Received an empty or unexpected response.");
      }

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
      const mappedError = mapApiError(err);

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

  useEffect(() => {
    console.log("Chat Messages: ", chatMessages);
  }, [chatMessages]);

  return {
    chatMessages,
    error,
    isLoading,
    clearError,
    clearChat,
    sendMessageToAI,
  };
};
