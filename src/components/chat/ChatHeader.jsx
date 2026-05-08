import Ffind_Logo from "../../assets/Ffind_logo.svg";

const ChatHeader = ({ clearChat, chatMessages }) => {
  return (
    <div className="flex justify-center gap-2 border-b grey-background py-4">
      <div className="flex flex-1 justify-between px-4 sm:px-6 md:px-10">
        <img src={Ffind_Logo} className="w-28 md:w-36" alt="Ffind logo" />

        {chatMessages.length > 0 && (
          <button
            onClick={clearChat}
            className="px-3 py-2 rounded-lg yellow-button"
          >
            New Chat
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
