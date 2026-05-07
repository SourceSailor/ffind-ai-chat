import React, { useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const ChatInterface = ({ chatMessages, sendMessageToAI }) => {
  const textAreaRef = useRef(null);

  const submitMessage = (e) => {
    e.preventDefault();

    const textValue = textAreaRef.current.value;

    sendMessageToAI(textValue);

    textAreaRef.current.value = "";
  };

  return (
    <section className="max-w-3xl w-full mx-auto flex flex-col justify-between h-full px-4 overflow-auto gap-10">
      <ChatMessages chatMessages={chatMessages} />

      <ChatInput textAreaRef={textAreaRef} onSubmit={submitMessage} />
    </section>
  );
};

export default ChatInterface;
