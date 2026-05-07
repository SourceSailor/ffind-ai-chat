import "./index.css";
import "highlight.js/styles/github-dark.css";

import ChatHeader from "./ChatHeader";

import ChatInterface from "./components/chat/ChatInterface";
import { useChat } from "./hooks/useChat";
import ErrorBanner from "./components/ErrorBanner";

function App() {
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
      <ErrorBanner error={error} onClear={clearError} />

      <ChatHeader clearChat={clearChat} chatMessages={chatMessages} />

      <ChatInterface
        chatMessages={chatMessages}
        sendMessageToAI={sendMessageToAI}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
