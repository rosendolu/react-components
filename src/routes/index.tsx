import { lazy } from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import CanvasCarousel from '../components/canvas/carousel';
import CanvasSlide from '../components/canvas/slide';
import IM from '../components/im';
import { RouterMenuContext } from '../helpers/context';

const Counter = lazy(() => import('../components/state'));
const AnimateImg = lazy(() => import('../components/canvas/gif'));
const VpsComponents = lazy(() => import('../components/vps'));
const FileComponents = lazy(() => import('../components/file'));
const Stream = lazy(() => import('../pages/stream'));
const VideoPosterCapture = lazy(() => import('../components/VideoPosterCapture'));
const Canvas = lazy(() => import('../components/canvas'));
const CollisionDetection = lazy(() => import('../components/canvas/collisionDetection'));
const KonvaCanvas = lazy(() => import('../components/canvas/konva'));
const NativeCanvas = lazy(() => import('../components/canvas/native-canvas'));
const KonvaReact = lazy(() => import('../components/canvas/react-konva'));
const VideoCapture = lazy(() => import('../components/canvas/videoCapture'));
const WaterfallCard = lazy(() => import('../components/css/WaterfallCard'));
const PseudoElements = lazy(() => import('../components/css/pseudo'));
const DomToImg = lazy(() => import('../components/domToImg'));
const RichTextEditor = lazy(() => import('../components/editor'));
const MyEditor = lazy(() => import('../components/editor/setNode'));
const ErrorHandle = lazy(() => import('../components/error'));
const FFmpeg = lazy(() => import('../components/ffmpeg'));
const OCRDemo = lazy(() => import('../components/ocr'));

const Snabbdom = lazy(() => import('../components/snabbdom'));
const VideoCropper = lazy(() => import('../components/video-cropper'));
const VideoPosterCropper = lazy(() => import('../components/videoPosterCropper'));
const WebAssemblyPage = lazy(() => import('../components/wasm'));
const Home = lazy(() => import('../pages'));

const routerConfig = [
    {
        label: 'Home',
        path: '/',
        element: <Home></Home>,
    },
    {
        label: 'File',
        path: '/file',
        element: <FileComponents />,
    },
    {
        label: 'Http',
        path: '/http',
        children: [
            {
                index: true,
                element: <Stream></Stream>,
            },
        ],
    },
    {
        label: 'Waterfall Card',
        path: '/waterfall',
        element: <WaterfallCard></WaterfallCard>,
    },
    {
        label: 'CSS3',
        path: '/pseudo-elements',
        element: <PseudoElements></PseudoElements>,
    },
    {
        label: 'Screenshot',
        path: '/domtoimg',
        element: <DomToImg></DomToImg>,
    },
    {
        label: 'Video Poster Cropper',
        path: '/videopostercropper',
        element: <VideoPosterCropper></VideoPosterCropper>,
    },
    {
        label: 'Video Poster Capture',
        path: '/videopostercapture',
        element: <VideoPosterCapture />,
    },

    {
        label: 'FFmpeg',
        path: '/ffmpeg',
        element: <FFmpeg></FFmpeg>,
    },
    {
        label: 'Snabbdom',
        path: '/snabbdom',
        element: <Snabbdom></Snabbdom>,
    },
    {
        label: 'RichTextEditor',
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
        label: 'Error Handler',
        path: '/errorhandle',
        children: [
            {
                index: true,
                element: <ErrorHandle></ErrorHandle>,
            },
        ],
    },
    {
        label: 'WebAssembly',
        path: '/wasm',
        children: [
            {
                index: true,
                element: <WebAssemblyPage />,
            },
        ],
    },
    {
        label: 'OCR',
        path: '/ocr',
        children: [
            {
                index: true,
                element: <OCRDemo />,
            },
        ],
    },
    {
        label: 'vps',
        path: '/vps',
        children: [
            {
                index: true,
                element: <VpsComponents></VpsComponents>,
            },
        ],
    },
    {
        label: 'react state manager',
        path: '/reactstate',
        children: [
            {
                index: true,
                element: <Counter></Counter>,
            },
        ],
    },
    {
        label: 'Canvas',
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
            {
                path: 'animate',
                element: <AnimateImg />,
            },
            {
                path: 'slide',
                element: <CanvasSlide></CanvasSlide>,
            },
            {
                path: 'carousel',
                element: <CanvasCarousel></CanvasCarousel>,
            },
        ],
    },
    {
        label: 'IM',
        path: '/im',
        children: [
            {
                index: true,
                element: <IM></IM>,
            },
        ],
    },
];

const router = createHashRouter(routerConfig);
export default function RouterElements() {
    return (
        <RouterMenuContext.Provider value={routerConfig}>
            <RouterProvider router={router}></RouterProvider>
        </RouterMenuContext.Provider>
    );
}
