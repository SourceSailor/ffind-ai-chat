import React from "react";

const ChatMessages = ({ chatMessages }) => {
  return (
    <div className="flex flex-1 flex-col w-full mt-20 gap-10 ">
      {chatMessages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[75%] px-4 py-2.5 rounded-2xl leading-relaxed text-md ${
              msg.role === "user"
                ? "bg-brand-yellow text-neutral-900 rounded-br-sm"
                : "bg-white/10 text-neutral-100 rounded-bl-sm"
            }`}
          >
            <p>{msg.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
