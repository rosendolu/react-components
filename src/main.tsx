import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './routes';
dayjs.extend(duration);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
