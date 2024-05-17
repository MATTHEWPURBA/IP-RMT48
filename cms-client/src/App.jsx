import { useState } from "react";
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";

// import Home from "./pages/Home";

import MainLayout from "./component/MainLayout";
// import CuisineDetail from "./component/CuisineDetail";
// import CreateMenu from "./component/CreateMenu";
import Login from "./auth/Login";
import Homepage from "./pages/Homepage";

// import Upload_image from "./pages/Upload_image";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      return localStorage.getItem("token") ? redirect("/") : null;
    },
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      

      // {
      //   path: "/:id",
      //   element: <CuisineDetail />,
      // },

      // {
      //   path: "/add-menu",
      //   element: <CreateMenu />,
      //   loader: () => {
      //     return localStorage.getItem("token") ? null : redirect("/login");
      //   },
      // },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
