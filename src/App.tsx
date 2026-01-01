import { Outlet } from "react-router-dom"
import Header from "./components/Header"

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default App
