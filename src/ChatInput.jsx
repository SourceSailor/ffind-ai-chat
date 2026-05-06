import React from "react";

const ChatInput = () => {
  return (
    <form className="max-w-5xl">
      <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm focus-within:border-white/20 focus-within:bg-white/[0.07]">
        <textarea
          rows={1}
          placeholder="Message Ffind…"
          className="flex-1 field-sizing-content bg-transparent px-3 py-2.5 text-[15px] text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
        />
        <button
          type="submit"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-neutral-900 transition-colors hover:bg-neutral-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
