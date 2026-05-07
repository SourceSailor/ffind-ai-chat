import React, { useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const ChatInterface = ({ chatMessages, sendMessageToAI, isLoading }) => {
  const textAreaRef = useRef(null);

  const hasMessage = chatMessages.length > 0;

  const submitMessage = (e) => {
    e.preventDefault();

    const textValue = textAreaRef.current.value;

    sendMessageToAI(textValue);

    textAreaRef.current.value = "";
  };

  return (
    <section
      className={`max-w-5xl w-full mx-auto flex flex-col  h-full px-10 overflow-auto gap-10 ${hasMessage ? "justify-between" : "justify-center"}`}
    >
      {hasMessage ? (
        <ChatMessages chatMessages={chatMessages} isLoading={isLoading} />
      ) : (
        <h1 className="text-5xl text-brand-yellow font-black">
          Ffind Your Answer.
        </h1>
      )}

      <ChatInput
        textAreaRef={textAreaRef}
        onSubmit={submitMessage}
        isLoading={isLoading}
      />
    </section>
  );
};

export default ChatInterface;
