import { describe, it, expect, vi } from "vitest";
import type { Interpolation } from "@react-spring/web";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import DogCard from "../DogCard";
import { mockBreed } from "../../test/mockData/breeds";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("DogCard", () => {
  it("should render dog information correctly", () => {
    renderWithRouter(
      <DogCard
        dog={mockBreed}
        imageLoaded={true}
        onImageLoad={() => {}}
        onImageError={() => {}}
        onDetails={() => {}}
      />
    );

    expect(screen.getByText(mockBreed.name)).toBeInTheDocument();
    expect(screen.getByText(/Small rodent hunting/)).toBeInTheDocument();
    expect(screen.getByText(/Stubborn, Curious/)).toBeInTheDocument();
  });

  it("should display skeleton loader when image is not loaded", () => {
    const { container } = renderWithRouter(
      <DogCard
        dog={mockBreed}
        imageLoaded={false}
        onImageLoad={() => {}}
        onImageError={() => {}}
        onDetails={() => {}}
      />
    );

    const skeleton = container.querySelector(".animate-pulse");
    expect(skeleton).toBeInTheDocument();
  });

  it("should show NoImage component when image URL is missing", () => {
    const breedWithoutImage = { ...mockBreed, image: undefined };

    renderWithRouter(
      <DogCard
        dog={breedWithoutImage}
        imageLoaded={true}
        onImageLoad={() => {}}
        onImageError={() => {}}
        onDetails={() => {}}
      />
    );

    expect(screen.getByText("No image available")).toBeInTheDocument();
  });

  it("should render swipe indicators when showIndicators is true", () => {
    const { container } = renderWithRouter(
      <DogCard
        dog={mockBreed}
        imageLoaded={true}
        onImageLoad={() => {}}
        onImageError={() => {}}
        onDetails={() => {}}
        showIndicators={true}
        likeOpacity={{} as Interpolation<number, number>}
        nopeOpacity={{} as Interpolation<number, number>}
        superLikeOpacity={{} as Interpolation<number, number>}
      />
    );

    // SwipeIndicators should be rendered
    expect(container.querySelector("#swipe-indicators")).toBeInTheDocument();
  });

  it("should not render swipe indicators when showIndicators is false", () => {
    const { container } = renderWithRouter(
      <DogCard
        dog={mockBreed}
        imageLoaded={true}
        onImageLoad={() => {}}
        onImageError={() => {}}
        onDetails={() => {}}
        showIndicators={false}
      />
    );

    expect(
      container.querySelector("#swipe-indicators")
    ).not.toBeInTheDocument();
  });

  it("should call onImageLoad when image loads successfully", () => {
    const onImageLoad = vi.fn();

    const { container } = renderWithRouter(
      <DogCard
        dog={mockBreed}
        imageLoaded={false}
        onImageLoad={onImageLoad}
        onImageError={() => {}}
        onDetails={() => {}}
      />
    );

    const image = container.querySelector("img");
    if (image) {
      fireEvent.load(image);
    }

    expect(onImageLoad).toHaveBeenCalledTimes(1);
  });

  it("should call onDetails when clicking on the image container", () => {
    const onDetails = vi.fn();

    const { container } = renderWithRouter(
      <DogCard
        dog={mockBreed}
        imageLoaded={true}
        onImageLoad={() => {}}
        onImageError={() => {}}
        onDetails={onDetails}
      />
    );

    const imageContainer = container.querySelector(".relative.h-\\[65\\%\\]");
    if (imageContainer) {
      fireEvent.click(imageContainer);
    }

    expect(onDetails).toHaveBeenCalledTimes(1);
  });

  it("should call onDetails when clicking on the info container", () => {
    const onDetails = vi.fn();

    const { container } = renderWithRouter(
      <DogCard
        dog={mockBreed}
        imageLoaded={true}
        onImageLoad={() => {}}
        onImageError={() => {}}
        onDetails={onDetails}
      />
    );

    const infoContainer = container.querySelector(".flex-1.p-3");
    if (infoContainer) {
      fireEvent.click(infoContainer);
    }

    expect(onDetails).toHaveBeenCalledTimes(1);
  });

  it("should display 'Unknown' when bred_for is missing", () => {
    const breedWithoutBredFor = { ...mockBreed, bred_for: undefined };

    renderWithRouter(
      <DogCard
        dog={breedWithoutBredFor}
        imageLoaded={true}
        onImageLoad={() => {}}
        onImageError={() => {}}
        onDetails={() => {}}
      />
    );

    expect(screen.getByText(/Unknown/)).toBeInTheDocument();
  });

  it("should display 'N/A' when temperament is missing", () => {
    const breedWithoutTemperament = { ...mockBreed, temperament: undefined };

    renderWithRouter(
      <DogCard
        dog={breedWithoutTemperament}
        imageLoaded={true}
        onImageLoad={() => {}}
        onImageError={() => {}}
        onDetails={() => {}}
      />
    );

    expect(screen.getByText(/N\/A/)).toBeInTheDocument();
  });

  it("should render image with correct src and alt attributes", () => {
    const { container } = renderWithRouter(
      <DogCard
        dog={mockBreed}
        imageLoaded={true}
        onImageLoad={() => {}}
        onImageError={() => {}}
        onDetails={() => {}}
      />
    );

    const image = container.querySelector("img");
    expect(image).toHaveAttribute("src", mockBreed.image?.url);
    expect(image).toHaveAttribute("alt", mockBreed.name);
  });

  it("should apply opacity-100 class when image is loaded", () => {
    const { container } = renderWithRouter(
      <DogCard
        dog={mockBreed}
        imageLoaded={true}
        onImageLoad={() => {}}
        onImageError={() => {}}
        onDetails={() => {}}
      />
    );

    const image = container.querySelector("img");
    expect(image).toHaveClass("opacity-100");
  });

  it("should apply opacity-0 class when image is not loaded", () => {
    const { container } = renderWithRouter(
      <DogCard
        dog={mockBreed}
        imageLoaded={false}
        onImageLoad={() => {}}
        onImageError={() => {}}
        onDetails={() => {}}
      />
    );

    const image = container.querySelector("img");
    expect(image).toHaveClass("opacity-0");
  });

  it("should not show skeleton loader when image is loaded", () => {
    const { container } = renderWithRouter(
      <DogCard
        dog={mockBreed}
        imageLoaded={true}
        onImageLoad={() => {}}
        onImageError={() => {}}
        onDetails={() => {}}
      />
    );

    const skeleton = container.querySelector(".animate-pulse");
    expect(skeleton).not.toBeInTheDocument();
  });

  it("should not show skeleton loader when there is an image error", () => {
    const onImageError = vi.fn();

    const { container } = renderWithRouter(
      <DogCard
        dog={mockBreed}
        imageLoaded={false}
        onImageLoad={() => {}}
        onImageError={onImageError}
        onDetails={() => {}}
      />
    );

    const image = container.querySelector("img");
    if (image) {
      fireEvent.error(image);
    }

    const skeleton = container.querySelector(".animate-pulse");
    expect(skeleton).not.toBeInTheDocument();
  });
});
