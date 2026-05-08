/**
 * Maps raw API or network error
 *
 * @param {Object} err
 * @returns {{title: string, desc: string}} - returns an object with custom keys dependent on error status/type
 */

export const mapApiError = (err) => {
  const status = err.status || err.response?.status;

  if (err.name === "APIUserAbortError" || err.name === "TimeoutError") {
    return {
      title: "Request timed out",
      desc: "The request took too long or was cancelled. Please try again.",
    };
  }
  if (status === 401) {
    return {
      title: "Authentication error",
      desc: "Invalid API key. Check your configuration.",
    };
  }
  if (status === 429) {
    return {
      title: "Rate limit reached",
      desc: "Too many requests. Please wait a moment.",
    };
  }
  if (status >= 500) {
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
