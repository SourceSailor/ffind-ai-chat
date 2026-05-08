import TypingIndicator from "../loading/TypingIndicator";
import MessageBubble from "./MessageBubble";

const ChatMessages = ({ chatMessages, isLoading }) => {
  const lastMessage = chatMessages[chatMessages.length - 1];
  const isWaitingForReply = isLoading && lastMessage?.role === "user";
  return (
    <div className="flex flex-1 flex-col w-full mt-20 gap-10 ">
      {chatMessages.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} />
      ))}

      {isWaitingForReply && <TypingIndicator />}
    </div>
  );
};

export default ChatMessages;
