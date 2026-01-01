import { createBrowserRouter } from "react-router-dom"

import DogFinderMain from "../containers/main/MainPage"
import DogDetails from "../containers/details/DogDetailsPage"
import HistoryPage from "../containers/history/HistoryPage"
import NotFound from "../containers/not-found/NotFound"
import App from "../App"

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <DogFinderMain />
      },
      {
        path: "/dogs/:id",
        element: <DogDetails />
      },
      {
        path: "/history",
        element: <HistoryPage />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
])
