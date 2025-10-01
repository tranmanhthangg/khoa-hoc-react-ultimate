import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/global.css';

import App from './App.jsx'
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import ProductPage from './pages/product.jsx';
import TodoApp from './components/todo/TodoApp.jsx';

import { createBrowserRouter, RouterProvider, } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <TodoApp />
      },
      {
        path: "/users",
        element: <UserPage />,
      },
      {
        path: "/products",
        element: <ProductPage />,
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
