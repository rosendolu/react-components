import { Typography } from 'antd';
import { NavigatorMenu } from '../components/NavigatorMenu';

export const router = [
    {
        to: '/domtoimg',
        label: 'Screenshot',
    },
    {
        to: '/videopostercropper',
        label: 'Video Poster Cropper',
    },
    {
        to: '/videopostercapture',
        label: 'Video Poster Capture',
    },
    {
        to: '/ffmpeg',
        label: 'FFmpeg',
    },
    {
        to: '/snabbdom',
        label: 'Snabbdom',
    },
    {
        to: '/editor',
        label: 'RichTextEditor',
    },
    {
        to: '/errorhandle',
        label: 'Error Handler',
    },
    {
        to: '/canvas',
        label: 'Canvas',
    },
    {
        to: '/wasm',
        label: 'WebAssembly',
    },
];

export default function Home() {
    return (
        <>
            <Typography.Title>React Practice</Typography.Title>
            <NavigatorMenu conf={router}></NavigatorMenu>
        </>
    );
}
