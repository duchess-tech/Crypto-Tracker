import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'
import './App.css'
import Home from './pages/home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Blog from './components/Blog'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },

  {
    path: "/Home",
    element: <Home />,
    children: [
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog",
        element: <Blog />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


