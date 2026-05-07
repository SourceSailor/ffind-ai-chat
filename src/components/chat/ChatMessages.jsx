import React from "react";
import TypingIndicator from "../loading/TypingIndicator";
import MessageBubble from "./MessageBubble";

const ChatMessages = ({ chatMessages, isLoading }) => {
  return (
    <div className="flex flex-1 flex-col w-full mt-20 gap-10 ">
      {chatMessages.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} />
      ))}

      {isLoading && <TypingIndicator />}
    </div>
  );
};

export default ChatMessages;
