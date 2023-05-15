import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorPage from './Error-page';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from './store/store';
import { Provider } from 'react-redux';
import AppModule from './components/AppModule';

const router = createBrowserRouter([
{
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage />,
    children: [
        {
            path: '/*',
            element: <AppModule />
        }
    ]
},
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
