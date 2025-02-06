import { createBrowserRouter } from "react-router-dom";
import ParentLayout from "../ParentLayout";
import AllProducts from "../pages/AllProducts";
import AllUser from "../pages/AllUser";
import Dashboard from "../pages/Dashboard";
import ProductDetails from "../pages/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ParentLayout></ParentLayout>,
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: "/",
            element: <AllProducts></AllProducts>,
          },
          {
            path: "/dashboard/all-user",
            element: <AllUser></AllUser>,
          },
          {
            path: "/dashboard/product-details/:id",
            element: <ProductDetails></ProductDetails>,
          },
        ],
      },
    ],
  },
]);
