import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useProgressStore, useBreedsCache } from "../breedStore";
import { mockBreeds } from "../../test/mockData/breeds";

describe("useProgressStore", () => {
  it("should save and get progress", () => {
    const { result } = renderHook(() => useProgressStore());

    act(() => {
      result.current.saveProgress(1, 0);
    });

    const progress = result.current.getProgress();
    expect(progress).toMatchObject({
      currentId: 1,
      currentPage: 0,
    });
    expect(progress?.timestamp).toBeDefined();
  });

  it("should clear progress", () => {
    const { result } = renderHook(() => useProgressStore());

    act(() => {
      result.current.saveProgress(1, 0);
      result.current.clearProgress();
    });

    const progress = result.current.getProgress();
    expect(progress).toBeNull();
  });

  it("should return null for expired progress", () => {
    const { result } = renderHook(() => useProgressStore());

    // Mock old timestamp (more than 1 hour ago)
    act(() => {
      result.current.saveProgress(1, 0);
    });

    // Manually set old timestamp
    const oldTimestamp = Date.now() - 2 * 60 * 60 * 1000; // 2 hours ago
    act(() => {
      useProgressStore.setState({
        progress: {
          currentId: 1,
          currentPage: 0,
          timestamp: oldTimestamp,
        },
      });
    });

    const progress = result.current.getProgress();
    expect(progress).toBeNull();
  });
});

describe("useBreedsCache", () => {
  it("should save and get breeds", () => {
    const { result } = renderHook(() => useBreedsCache());

    act(() => {
      result.current.saveBreeds(mockBreeds, 0, true);
    });

    const cache = result.current.getBreeds();
    expect(cache).toMatchObject({
      breeds: mockBreeds,
      page: 0,
      hasMore: true,
    });
  });

  it("should clear breeds cache", () => {
    const { result } = renderHook(() => useBreedsCache());

    act(() => {
      result.current.saveBreeds(mockBreeds, 0, true);
      result.current.clearBreeds();
    });

    const cache = result.current.getBreeds();
    expect(cache).toBeNull();
  });

  it("should return null for expired cache", () => {
    const { result } = renderHook(() => useBreedsCache());

    act(() => {
      result.current.saveBreeds(mockBreeds, 0, true);
    });

    // Manually set old timestamp
    const oldTimestamp = Date.now() - 2 * 60 * 60 * 1000; // 2 hours ago
    act(() => {
      useBreedsCache.setState({
        cache: {
          breeds: mockBreeds,
          page: 0,
          hasMore: true,
          timestamp: oldTimestamp,
        },
      });
    });

    const cache = result.current.getBreeds();
    expect(cache).toBeNull();
  });
});
