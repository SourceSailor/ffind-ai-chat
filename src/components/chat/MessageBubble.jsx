import React from "react";
import { User, Bot } from "lucide-react";

const MessageBubble = ({ msg }) => {
  const CHAT_ICON_STYLES = "bg-surface-elevated p-2 rounded-full";
  const isUser = msg.role === "user";

  return (
    <div
      key={msg.id}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex items-end gap-4 bg ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        {isUser ? (
          <div className={CHAT_ICON_STYLES}>
            <User size={"25px"} />
          </div>
        ) : (
          <div className={CHAT_ICON_STYLES}>
            <Bot size={"25px"} />
          </div>
        )}

        <div
          className={`w-full max-w-[70%] px-4 py-2.5 rounded-2xl leading-relaxed text-md ${
            isUser
              ? "bg-brand-yellow text-neutral-900 rounded-br-sm"
              : "bg-white/10 text-neutral-100 rounded-bl-sm min-w-48"
          }`}
        >
          <p>{msg.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
