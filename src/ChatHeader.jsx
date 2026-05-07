import React from "react";
import Ffind_Logo from "./assets/Ffind_logo.svg";

const ChatHeader = ({ clearChat }) => {
  return (
    <div className="flex justify-center gap-2 border-b grey-background py-4">
      <div className="flex flex-1 justify-between px-4">
        <img src={Ffind_Logo} width={"120px"} alt="Ffind logo" />

        <button
          onClick={clearChat}
          className="px-3 py-2 rounded-lg yellow-button"
        >
          New Chat
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
