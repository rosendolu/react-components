import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        index: true,
        caseSensitive: false,
        element: <Home></Home>,
      },
    ],
  },
]);

export { router };
