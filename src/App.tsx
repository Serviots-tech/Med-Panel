
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { ToastContainer } from "react-toastify"
// import EditMedicinePage from "./pages/EditMedicinePage"

function App() {

  return (
    <>
      <>
        <RouterProvider router={router} />
        <ToastContainer />
      </>
    </>
  )
}

export default App
