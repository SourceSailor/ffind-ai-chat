const ErrorBanner = ({ error, onClear }) => {
  if (!error) return null;

  return (
    <div
      role="alert"
      className="flex items-center justify-between px-4 sm:px-6 py-3 mb-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
    >
      <div>
        <span className="font-medium">{error.title}: </span>
        <span>{error.desc}</span>
      </div>
      <button
        className="cursor-pointer"
        onClick={onClear}
        aria-label="Dismiss error"
      >
        ✕
      </button>
    </div>
  );
};
export default ErrorBanner;
