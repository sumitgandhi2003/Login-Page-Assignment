// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
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
    element: <App />,
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
