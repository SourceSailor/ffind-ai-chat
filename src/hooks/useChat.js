import { useState, useEffect } from "react";
import { sendMessage } from "../services/openaiAPI";

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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatMessages));
    } catch {
      // storage quota exceeded — fail silently
    }
  }, [chatMessages]);

  const sendMessageToAI = async (inputMessage) => {
    if (!inputMessage.trim() || isLoading) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: inputMessage,
      },
    ]);

    setIsLoading(true);
    setError(null);

    try {
      const data = await sendMessage(inputMessage, previousResponseId);

      setPreviousResponseId(data.id);

      setChatMessages((prev) => [
        ...prev,
        {
          id: data.id,
          role: "assistant",
          content: data.output[0].content[0].text,
        },
      ]);
    } catch (err) {
      setError({
        title: "Something went wrong",
        desc: err.message ?? "An unexpected error occurred.",
      });
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
    clearChat,
    sendMessageToAI,
  };
};
