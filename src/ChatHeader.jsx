import React from "react";

const ChatHeader = () => {
  return (
    <div className='flex items-end gap-2 border-b border-white/10 bg-white/5 p-2 backdrop-blur-sm focus-within:border-white/20 focus-within:bg-white/[0.07]">'>
      <button>New Chat</button>
    </div>
  );
};

export default ChatHeader;
