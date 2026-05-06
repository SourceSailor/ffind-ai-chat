import React, { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const ChatInterface = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "What can I help you with?",
    },
    {
      id: crypto.randomUUID(),
      role: "user",
      content: "I can answer any question you may have",
    },
  ]);

  return (
    <section className="max-w-3xl w-full mx-auto flex flex-col justify-between h-full px-4">
      <ChatMessages chatMessages={chatMessages} />

      <ChatInput />
    </section>
  );
};

export default ChatInterface;
