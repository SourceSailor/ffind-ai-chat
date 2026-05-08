import { useRef } from "react";
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
      className={`max-w-5xl w-full mx-auto flex flex-col  h-full px-4 sm:px-6 md:px-10 gap-6 sm:gap-10 ${hasMessage ? "justify-between" : "justify-center"}`}
    >
      {/* Display chat input and title if chat messages state's length is 0. If length is more than 0 remove title and display the input flex end
       */}
      {hasMessage ? (
        <ChatMessages chatMessages={chatMessages} isLoading={isLoading} />
      ) : (
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-brand-yellow font-black">
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
