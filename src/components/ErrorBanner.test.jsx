import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorBanner from "./ErrorBanner";

const mockError = {
  title: "Rate limit reached",
  desc: "Too many requests. Please wait a moment.",
};

describe("ErrorBanner", () => {
  it("renders nothing when error is null", () => {
    const { container } = render(
      <ErrorBanner error={null} onClear={() => {}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
  it("renders error title and description when error is provided", () => {
    render(<ErrorBanner error={mockError} onClear={() => {}} />);
    expect(screen.getByText(/Rate limit reached/i)).toBeInTheDocument();
    expect(screen.getByText(/Too many requests/i)).toBeInTheDocument();
  });
  it('has role="alert" for screen reader accessibility', () => {
    render(<ErrorBanner error={mockError} onClear={() => {}} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("calls onClear when the dismiss button is clicked", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<ErrorBanner error={mockError} onClear={onClear} />);
    await user.click(screen.getByRole("button", { name: /dismiss error/i }));
    expect(onClear).toHaveBeenCalledOnce();
  });
});
