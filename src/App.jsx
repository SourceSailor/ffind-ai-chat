import "./App.css";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

function App() {
  return (
    <div className="flex flex-col w-full h-screen ">
      <ChatHeader />
      <ChatInput />
    </div>
  );
}

export default App;
