import { client } from "../config/axios";
import type { TBreed } from "../types/breed";

interface FetchBreedsParams {
  page?: number;
  limit?: number;
}

export const fetchBreeds = async (
  params?: FetchBreedsParams
): Promise<TBreed[]> => {
  const { page = 0, limit = 10 } = params || {};
  const response = await client.get<TBreed[]>("/breeds", {
    params: { page, limit },
  });
  return response.data;
};

export const voteBreed = async (
  imageId: string,
  value: number
): Promise<{ message: string }> => {
  const response = await client.post<{ message: string }>(`/votes`, {
    image_id: imageId,
    value: value,
  });
  return response.data;
};

export const createFavorite = async (
  imageId: string
): Promise<{ id: number }> => {
  const response = await client.post<{ id: number }>(`/favourites`, {
    image_id: imageId,
  });
  return response.data;
};
