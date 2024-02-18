import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Canvas from '../components/canvas';
import CollisionDetection from '../components/canvas/collisionDetection';
import KonvaCanvas from '../components/canvas/konva';
import VideoCapture from '../components/canvas/videoCapture';
import DomToImg from '../components/domToImg';
import RichTextEditor from '../components/editor';
import MyEditor from '../components/editor/setNode';
import FFmpeg from '../components/ffmpeg';
import Snabbdom from '../components/snabbdom';
import VideoCropper from '../components/video-cropper';
import VideoPosterCacher from '../components/videoPosterCacher';
import VideoPosterCropper from '../components/videoPosterCropper';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
    },

    {
        path: '/domtoimg',
        element: <DomToImg></DomToImg>,
    },
    {
        path: '/videopostercropper',
        element: <VideoPosterCropper></VideoPosterCropper>,
    },
    {
        path: '/videopostercacher',
        element: <VideoPosterCacher />,
    },
    {
        path: '/canvas',
        element: <Canvas />,
    },
    {
        path: '/canvas-collision-detection',
        element: <CollisionDetection></CollisionDetection>,
    },
    {
        path: '/video-cropper',
        element: <VideoCropper></VideoCropper>,
    },
    {
        path: '/konva',
        element: <KonvaCanvas />,
    },
    {
        path: '/canvas-video',
        element: <VideoCapture></VideoCapture>,
    },
    {
        path: '/canvas-video',
        element: <VideoCapture></VideoCapture>,
    },
    {
        path: '/ffmpeg',
        element: <FFmpeg></FFmpeg>,
    },
    {
        path: '/snabbdom',
        element: <Snabbdom></Snabbdom>,
    },
    {
        path: '/editor',
        children: [
            {
                index: true,
                element: <RichTextEditor></RichTextEditor>,
            },
            {
                path: 'setNode',
                element: <MyEditor></MyEditor>,
            },
        ],
    },
]);

export { router };
