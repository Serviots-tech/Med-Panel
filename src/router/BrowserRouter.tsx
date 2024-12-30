import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import PageNotFoundPage from '../components/PageNotFound';
import { Login } from '../pages/Login';
import MedicineListPage from '../pages/MedicineListPage';  // Import the MedicineListPage component
import AddMedicinePage from '../pages/AddMedicinePage';  // Import the AddMedicinePage component
import { AdminLayout } from '../components/AdminLayout';
import { DoseForm } from '../pages/DoseForm';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element:<AdminLayout/>,
        children:[
          {
            element:<DoseForm/>,
            path:'/dose-form'
          }
        ]
      },
      {
        element: <Login />,
        path: '/login',
      },
      {
        element: <MedicineListPage />,
        path: '/',  // Home page route for the list of medicines
      },
      {
        element: <AddMedicinePage />,
        path: '/add-medicine/:id?',  // Optional `id` for adding or editing a medicine
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFoundPage />,
  },
]);

export default router;
