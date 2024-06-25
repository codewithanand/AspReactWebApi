import { Link, Outlet, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom"

import Home from "./pages/Home"
import Department from "./pages/Department"
import Employee from "./pages/Employee"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"


const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid py-5" style={{minHeight: 480,}}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/department",
        element: <Department />
      },
      {
        path: "/employee",
        element: <Employee />
      },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
