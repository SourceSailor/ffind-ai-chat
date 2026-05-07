export const mapApiError = (err) => {
  if (err.name === "AbortError") {
    return {
      title: "Request timed out",
      desc: "The request took too long. Please try again.",
    };
  }
  if (err.status === 401) {
    return {
      title: "Authentication error",
      desc: "Invalid API key. Check your configuration.",
    };
  }
  if (err.status === 429) {
    return {
      title: "Rate limit reached",
      desc: "Too many requests. Please wait a moment.",
    };
  }
  if (err.status >= 500) {
    return {
      title: "Server error",
      desc: "OpenAI is having issues. Try again shortly.",
    };
  }
  if (!navigator.onLine) {
    return {
      title: "No internet connection",
      desc: "Check your network and try again.",
    };
  }
  return {
    title: "Something went wrong",
    desc: "An unexpected error occurred.",
  };
};
