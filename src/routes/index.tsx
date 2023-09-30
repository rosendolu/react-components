import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Canvas from '../components/canvas';
import VideoPosterCacher from '../components/videoPosterCacher';
import VideoPosterCropper from '../components/videoPosterCropper';
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
      {
        path: 'videopostercropper',
        element: <VideoPosterCropper></VideoPosterCropper>,
      },
      {
        path: 'videopostercacher',
        element: <VideoPosterCacher />,
      },
      {
        path: 'canvas',
        element: <Canvas />,
      },
    ],
  },
]);

export { router };
