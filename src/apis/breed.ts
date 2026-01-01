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
