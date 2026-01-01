import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

import ActionButtons from "../ActionButtons";

describe("ActionButtons", () => {
  it("should render all two action buttons", () => {
    const onAction = vi.fn();
    render(<ActionButtons onAction={onAction} />);

    // Check for button icons/elements
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("should call onAction with 'left' when reject button is clicked", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(<ActionButtons onAction={onAction} />);

    const rejectButton = screen.getByLabelText("Reject");
    await user.click(rejectButton);

    expect(onAction).toHaveBeenCalledWith("left", 0, true);
  });

  it("should call onAction with 'right' when like button is clicked", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(<ActionButtons onAction={onAction} />);

    const likeButton = screen.getByLabelText("Like");
    await user.click(likeButton);

    expect(onAction).toHaveBeenCalledWith("right", 0, true);
  });

  it("should have correct aria-labels for accessibility", () => {
    const onAction = vi.fn();
    render(<ActionButtons onAction={onAction} />);

    expect(screen.getByLabelText("Reject")).toBeInTheDocument();
    expect(screen.getByLabelText("Like")).toBeInTheDocument();
  });

  it("should render reject button with X icon", () => {
    const onAction = vi.fn();
    render(<ActionButtons onAction={onAction} />);

    const rejectButton = screen.getByLabelText("Reject");
    const xIcon = rejectButton.querySelector("svg");

    expect(xIcon).toBeInTheDocument();
    expect(rejectButton).toHaveClass("text-red-500");
  });

  it("should render like button with Check icon", () => {
    const onAction = vi.fn();
    render(<ActionButtons onAction={onAction} />);

    const likeButton = screen.getByLabelText("Like");
    const checkIcon = likeButton.querySelector("svg");

    expect(checkIcon).toBeInTheDocument();
    expect(likeButton).toHaveClass("text-green-500");
  });

  it("should have proper styling classes on reject button", () => {
    const onAction = vi.fn();
    render(<ActionButtons onAction={onAction} />);

    const rejectButton = screen.getByLabelText("Reject");

    expect(rejectButton).toHaveClass("bg-white");
    expect(rejectButton).toHaveClass("hover:bg-red-50");
    expect(rejectButton).toHaveClass("text-red-500");
    expect(rejectButton).toHaveClass("rounded-full");
    expect(rejectButton).toHaveClass("shadow-lg");
  });

  it("should have proper styling classes on like button", () => {
    const onAction = vi.fn();
    render(<ActionButtons onAction={onAction} />);

    const likeButton = screen.getByLabelText("Like");

    expect(likeButton).toHaveClass("bg-white");
    expect(likeButton).toHaveClass("hover:bg-green-50");
    expect(likeButton).toHaveClass("text-green-500");
    expect(likeButton).toHaveClass("rounded-full");
    expect(likeButton).toHaveClass("shadow-lg");
  });

  it("should call onAction only once per button click", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(<ActionButtons onAction={onAction} />);

    const rejectButton = screen.getByLabelText("Reject");
    await user.click(rejectButton);

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("should allow multiple clicks on different buttons", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(<ActionButtons onAction={onAction} />);

    const rejectButton = screen.getByLabelText("Reject");
    const likeButton = screen.getByLabelText("Like");

    await user.click(rejectButton);
    await user.click(likeButton);

    expect(onAction).toHaveBeenCalledTimes(2);
    expect(onAction).toHaveBeenNthCalledWith(1, "left", 0, true);
    expect(onAction).toHaveBeenNthCalledWith(2, "right", 0, true);
  });

  it("should render buttons in correct order (reject, like)", () => {
    const onAction = vi.fn();
    render(<ActionButtons onAction={onAction} />);

    const buttons = screen.getAllByRole("button");

    expect(buttons[0]).toHaveAttribute("aria-label", "Reject");
    expect(buttons[1]).toHaveAttribute("aria-label", "Like");
  });

  it("should have transition classes for animations", () => {
    const onAction = vi.fn();
    render(<ActionButtons onAction={onAction} />);

    const rejectButton = screen.getByLabelText("Reject");
    const likeButton = screen.getByLabelText("Like");

    expect(rejectButton).toHaveClass("transition-all");
    expect(rejectButton).toHaveClass("hover:scale-110");
    expect(rejectButton).toHaveClass("active:scale-95");

    expect(likeButton).toHaveClass("transition-all");
    expect(likeButton).toHaveClass("hover:scale-110");
    expect(likeButton).toHaveClass("active:scale-95");
  });

  it("should render buttons with correct size classes", () => {
    const onAction = vi.fn();
    render(<ActionButtons onAction={onAction} />);

    const buttons = screen.getAllByRole("button");

    buttons.forEach((button) => {
      expect(button).toHaveClass("w-14");
      expect(button).toHaveClass("h-14");
      expect(button).toHaveClass("sm:w-16");
      expect(button).toHaveClass("sm:h-16");
    });
  });
});
