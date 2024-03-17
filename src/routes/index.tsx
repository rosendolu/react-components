import { createHashRouter } from 'react-router-dom';
import VideoPosterCapture from '../components/VideoPosterCapture';
import Canvas from '../components/canvas';
import CollisionDetection from '../components/canvas/collisionDetection';
import KonvaCanvas from '../components/canvas/konva';
import NativeCanvas from '../components/canvas/native-canvas';
import KonvaReact from '../components/canvas/react-konva';
import VideoCapture from '../components/canvas/videoCapture';
import WaterfallCard from '../components/css/WaterfallCard';
import PseudoElements from '../components/css/pseudo';
import DomToImg from '../components/domToImg';
import RichTextEditor from '../components/editor';
import MyEditor from '../components/editor/setNode';
import ErrorHandle from '../components/error';
import FFmpeg from '../components/ffmpeg';
import OCRDemo from '../components/ocr';
import { default as Snabbdom } from '../components/snabbdom';
import VideoCropper from '../components/video-cropper';
import VideoPosterCropper from '../components/videoPosterCropper';
import WebAssemblyPage from '../components/wasm';
import Home from '../pages/home';

export const routerConfig = [
    {
        path: '/',
        element: <Home></Home>,
    },

    {
        path: '/waterfall',
        element: <WaterfallCard></WaterfallCard>,
    },
    {
        path: '/pseudo-elements',
        element: <PseudoElements></PseudoElements>,
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
        path: '/videopostercapture',
        element: <VideoPosterCapture />,
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
    {
        path: '/errorhandle',
        children: [
            {
                index: true,
                element: <ErrorHandle></ErrorHandle>,
            },
        ],
    },
    {
        path: '/wasm',
        children: [
            {
                index: true,
                element: <WebAssemblyPage />,
            },
        ],
    },
    {
        path: '/ocr',
        children: [
            {
                index: true,
                element: <OCRDemo />,
            },
        ],
    },
    {
        path: '/canvas',
        children: [
            {
                index: true,
                element: <Canvas></Canvas>,
            },
            {
                path: 'canvas',
                element: <NativeCanvas></NativeCanvas>,
            },
            {
                path: 'collision-detection',
                element: <CollisionDetection></CollisionDetection>,
            },
            {
                path: 'video-cropper',
                element: <VideoCropper></VideoCropper>,
            },
            {
                path: 'konva',
                element: <KonvaCanvas />,
            },
            {
                path: 'video',
                element: <VideoCapture></VideoCapture>,
            },
            {
                path: 'reactkonva',
                element: <KonvaReact></KonvaReact>,
            },
        ],
    },
];
export const router = createHashRouter(routerConfig);
