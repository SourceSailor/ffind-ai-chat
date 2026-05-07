import React from "react";
import { ArrowUp } from "lucide-react";

const ChatInput = ({ textAreaRef, onSubmit }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <form className="flex mb-5" onSubmit={onSubmit}>
      <div className="flex-1 flex justify-between gap-2 rounded-2xl border grey-background p-2">
        <textarea
          rows={1}
          ref={textAreaRef}
          placeholder="Message Ffind…"
          onKeyDown={handleKeyDown}
          className="flex-1 field-sizing-content bg-transparent px-3 py-2.5 text-[15px] text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
        />
        <button
          type="submit"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl yellow-button"
        >
          <ArrowUp size={"20px"} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
