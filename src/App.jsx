import "./App.css";
import ChatHeader from "./ChatHeader";

import ChatInterface from "./components/ChatInterface";

function App() {
  return (
    <div className="flex flex-col w-full h-screen">
      <ChatHeader />

      <ChatInterface />
    </div>
  );
}

export default App;
