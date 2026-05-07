import React, { useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const ChatInterface = ({ chatMessages, sendMessageToAI, isLoading }) => {
  const textAreaRef = useRef(null);

  const submitMessage = (e) => {
    e.preventDefault();

    const textValue = textAreaRef.current.value;

    sendMessageToAI(textValue);

    textAreaRef.current.value = "";
  };

  return (
    <section className="max-w-5xl w-full mx-auto flex flex-col justify-between h-full px-10 overflow-auto gap-10">
      <ChatMessages chatMessages={chatMessages} isLoading={isLoading} />

      <ChatInput
        textAreaRef={textAreaRef}
        onSubmit={submitMessage}
        isLoading={isLoading}
      />
    </section>
  );
};

export default ChatInterface;
