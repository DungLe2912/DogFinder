import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Toast from "../Toast";

describe("Toast", () => {
  it("should render success toast with correct styling", () => {
    const onClose = vi.fn();
    render(
      <Toast
        id="1"
        message="Success message"
        type="success"
        onClose={onClose}
      />
    );

    expect(screen.getByText("Success message")).toBeInTheDocument();
    const toast = screen.getByText("Success message").closest("div");
    expect(toast).toHaveClass("bg-green-500");
  });

  it("should render error toast with correct styling", () => {
    const onClose = vi.fn();
    render(
      <Toast id="1" message="Error message" type="error" onClose={onClose} />
    );

    expect(screen.getByText("Error message")).toBeInTheDocument();
    const toast = screen.getByText("Error message").closest("div");
    expect(toast).toHaveClass("bg-red-500");
  });

  it("should render info toast with correct styling", () => {
    const onClose = vi.fn();
    render(
      <Toast id="1" message="Info message" type="info" onClose={onClose} />
    );

    expect(screen.getByText("Info message")).toBeInTheDocument();
    const toast = screen.getByText("Info message").closest("div");
    expect(toast).toHaveClass("bg-blue-500");
  });

  it("should call onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(
      <Toast id="1" message="Test message" type="success" onClose={onClose} />
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledWith("1");
  });

  it("should auto dismiss after duration", async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();

    render(
      <Toast
        id="1"
        message="Test message"
        type="success"
        duration={1000}
        onClose={onClose}
      />
    );

    expect(onClose).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);

    expect(onClose).toHaveBeenCalledWith("1");

    vi.useRealTimers();
  });
});
