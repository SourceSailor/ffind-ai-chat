import { User, Bot } from "lucide-react";
import MarkdownRenderer from "../MarkdownRenderer";

const MessageBubble = ({ msg }) => {
  const CHAT_ICON_STYLES = "bg-surface-elevated p-2 rounded-full";

  const isUser = msg.role === "user";

  return (
    // Display Bot and user messages justify end or start dependent depending on role
    <div
      key={msg.id}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      {/*  Display Bot and user icon dependent depending on role  */}
      <div
        className={`flex items-end gap-2 sm:gap-4 max-w-[88%] sm:max-w-[75%] md:max-w-[70%]  ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        {isUser ? (
          <div className={`${CHAT_ICON_STYLES} hidden sm:flex`}>
            <User size={"25px"} />
          </div>
        ) : (
          <div className={`${CHAT_ICON_STYLES} hidden sm:flex`}>
            <Bot size={"25px"} />
          </div>
        )}

        {/* User and Bot bubble styles dependent depending on role */}
        <div
          className={`px-4 py-2.5 rounded-2xl leading-relaxed text-md ${
            isUser
              ? "bg-brand-yellow text-surface font-medium rounded-br-sm"
              : "bg-white/10 text-neutral-100 rounded-bl-sm"
          }`}
        >
          {isUser ? (
            <p>{msg.content}</p>
          ) : (
            <MarkdownRenderer content={msg.content} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
