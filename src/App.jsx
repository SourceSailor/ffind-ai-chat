import "./index.css";
import ChatHeader from "./ChatHeader";

import ChatInterface from "./components/chat/ChatInterface";
import { useChat } from "./hooks/useChat";

function App() {
  const { chatMessages, error, sendMessageToAI, clearChat, isLoading } =
    useChat();

  return (
    <div className="flex flex-col w-full h-screen">
      <ChatHeader clearChat={clearChat} />

      <ChatInterface
        chatMessages={chatMessages}
        sendMessageToAI={sendMessageToAI}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
