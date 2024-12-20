import { Route, Routes } from "react-router-dom"
import MedicineListPage from "./pages/MedicineListPage"
import AddMedicinePage from "./pages/AddMedicinePage"
// import EditMedicinePage from "./pages/EditMedicinePage"

function App() {

  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<MedicineListPage />} />
          <Route path="/add-medicine/:id?" element={<AddMedicinePage />} />
        </Routes>
      </>
    </>
  )
}

export default App
