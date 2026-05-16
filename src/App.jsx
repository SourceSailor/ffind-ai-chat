import "./index.css";
import "highlight.js/styles/github-dark.css";

import { ChatHeader, ChatInterface, ErrorBanner } from "./components";

import { useChat } from "./hooks/useChat";
import GradientOrb from "./components/GradientOrb";
import { radialGradientOrbs } from "../config";

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
    <div className="flex flex-col w-full h-screen relative overflow-hidden">
      {radialGradientOrbs.map((orb) => (
        <GradientOrb
          size={orb.size}
          top={orb.top}
          left={orb.left}
          color={orb.color}
          opacity={orb.opacity}
        />
      ))}
      <ChatHeader clearChat={clearChat} chatMessages={chatMessages} />

      <ErrorBanner error={error} onClear={clearError} />

      <main className="flex-1 overflow-auto">
        <ChatInterface
          chatMessages={chatMessages}
          sendMessageToAI={sendMessageToAI}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default App;
