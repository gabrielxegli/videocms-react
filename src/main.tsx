import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./routes/layout.tsx";

import "./index.css";
import HomeLayout from "./routes/home/layout.tsx";
import Home from "./routes/home/index.tsx";
import Login from "./routes/login/index.tsx";
import Header from "./components/header/index.tsx";

export const HomePage: React.FC = () => {
  return (
    <HomeLayout>
      <Header />

      <Home />
    </HomeLayout>
  );
};

export const LoginPage: React.FC = () => {
  return <Login />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainLayout>
      <RouterProvider router={router} />
    </MainLayout>
  </React.StrictMode>
);
