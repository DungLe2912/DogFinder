import axios from "axios";

import { ENV } from "./enviroment";

export const client = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    "x-api-key": ENV.API_KEY,
  },
});
