import React from "react";
import { ArrowUp } from "lucide-react";

const ChatInput = () => {
  return (
    <form className="flex-1 justify-center items-center max-w-3xl mb-5">
      <div className="flex-1 flex items-end justify-between gap-2 rounded-2xl border grey-background p-2">
        <textarea
          rows={1}
          placeholder="Message Ffind…"
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
