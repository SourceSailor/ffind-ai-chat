import { describe, it, expect, vi, afterEach } from "vitest";
import { mapApiError } from "./errors";

// Ensures that any spies or mocks created during a test are reset to their original state before the next test begins.
afterEach(() => {
  vi.restoreAllMocks();
});

describe("mapApiError", () => {
  it("handles TimeoutError", () => {
    const err = new Error("Timed out");
    err.name = "TimeoutError";
    const result = mapApiError(err);
    expect(result.title).toBe("Request timed out");
  });
  it("Handles 401 authentication error", () => {
    const result = mapApiError({ status: 401 });
    expect(result).toEqual({
      title: "Authentication error",
      desc: "Invalid API key. Check your configuration.",
    });
  });
  it("Handles 429 rate limit error", () => {
    const result = mapApiError({ status: 429 });
    expect(result).toEqual({
      title: "Rate limit reached",
      desc: "Too many requests. Please wait a moment.",
    });
  });
  it("Handles 500 server error", () => {
    const result = mapApiError({ status: 500 });
    expect(result).toEqual({
      title: "Server error",
      desc: "OpenAI is having issues. Try again shortly.",
    });
  });
  it("handles any 5xx server error", () => {
    const result = mapApiError({ status: 503 });
    expect(result.title).toBe("Server error");
  });
  it("handles offline state", () => {
    vi.spyOn(navigator, "onLine", "get").mockReturnValue(false);
    const result = mapApiError(new Error("Network failure"));
    expect(result).toEqual({
      title: "No internet connection",
      desc: "Check your network and try again.",
    });
  });

  it("falls back to generic error for unknown cases", () => {
    const result = mapApiError(new Error("Something random"));
    expect(result).toEqual({
      title: "Something went wrong",
      desc: "An unexpected error occurred.",
    });
  });
});
