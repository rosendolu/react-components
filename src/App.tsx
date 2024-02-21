import { Button, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import './App.css';

const router = [
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
];
export default function App() {
    return (
        <div className="p-2 text-center">
            <Typography.Title>React Practice</Typography.Title>
            <NavigatorMenu conf={router}></NavigatorMenu>
        </div>
    );
}

function NavigatorMenu({ conf }) {
    return (
        <Space wrap>
            {router.map(val => {
                return (
                    <Link to={val.to} key={val.to}>
                        <Button type="link">{val.label}</Button>
                    </Link>
                );
            })}
        </Space>
    );
}
