import { client } from "../config/axios";
import type { TDog } from "../types/dog";
export const fetchDogs = async (): Promise<TDog[]> => {
  const response = await client.get<TDog[]>("/breeds");
  return response.data;
};
