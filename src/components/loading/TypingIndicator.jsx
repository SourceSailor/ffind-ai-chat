import { Loader2 } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex items-end gap-4">
      <div className="bg-surface-elevated p-2 rounded-full">
        <Loader2 size={25} className="animate-spin" />
      </div>
      <div className="bg-white/10 p-4 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" />
      </div>
    </div>
  );
};

export default TypingIndicator;
