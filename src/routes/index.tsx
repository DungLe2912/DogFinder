import { createBrowserRouter } from "react-router-dom";

import DogFinderMain from "../containers/main/MainPage";
import DogDetails from "../containers/details/DogDetailsPage";
import NotFound from "../containers/not-found/NotFound";
import App from "../App";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <DogFinderMain />,
      },
      {
        path: "/dogs/:id",
        element: <DogDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
