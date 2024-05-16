import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      return localStorage.getItem("token") ? redirect("/articles") : null;
    },
  },

  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },

      {
        path: "/addFavorite/:id",
        element: <Favorite />,
        /** fungsi loader adalah untuk memberikan fatau redirectt orang kalo misalnya dia belom login */
        loader: () => {
          return localStorage.getItem("token") ? null : redirect("/login");
        },
        /** fungsi loader adalah untuk memberikan fatau redirectt orang kalo misalnya dia belom login */
      },

      {
        path: "/upload/:id",
        element: <Upload_image />,
        loader: () => {
          return localStorage.getItem("token") ? null : redirect("/login");
        },
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
