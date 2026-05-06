import "./index.css";
import ChatHeader from "./ChatHeader";

import ChatInterface from "./components/chat/ChatInterface";

function App() {
  return (
    <div className="flex flex-col w-full h-screen">
      <ChatHeader />

      <ChatInterface />
    </div>
  );
}

export default App;
