// src/router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./component/pages/Login";
import LoginSucess from "./LoginSucess";
import Register from "./component/pages/Register";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Navigate to={"/login"} />,
  },
  {
    path: "/login-sucess",
    element: <LoginSucess />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
