import "./index.css";
import "highlight.js/styles/github-dark.css";

import { ChatHeader, ChatInterface, ErrorBanner } from "./components";

import { useChat } from "./hooks/useChat";

function App() {
  // Chat API Hook
  const {
    chatMessages,
    error,
    clearError,
    sendMessageToAI,
    clearChat,
    isLoading,
  } = useChat();

  return (
    <div className="flex flex-col w-full h-screen">
      <ChatHeader clearChat={clearChat} chatMessages={chatMessages} />

      <ErrorBanner error={error} onClear={clearError} />

      <div className="flex-1 overflow-auto">
        <ChatInterface
          chatMessages={chatMessages}
          sendMessageToAI={sendMessageToAI}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;
