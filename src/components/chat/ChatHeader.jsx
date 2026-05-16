const ChatHeader = ({ clearChat, chatMessages }) => {
  return (
    <header className="flex justify-center gap-2 py-4">
      <div className="flex flex-1 justify-between px-4 sm:px-6 md:px-10">
        <p>
          Kyle <span>/ portfolio in conversation</span>
        </p>

        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-3xl bg-amber-100">Resume</button>
          <button>Reach out</button>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
