import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Canvas from '../components/canvas';
import VideoCropper from '../components/video-cropper';
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
      {
        path: 'video-cropper',
        element: <VideoCropper></VideoCropper>,
      },
    ],
  },
]);

export { router };
