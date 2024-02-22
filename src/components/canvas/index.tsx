import { Typography } from 'antd';
import classNames from 'classnames';
import { NavigatorMenu } from '../NavigatorMenu';
export default function Index() {
    const conf = [
        {
            to: 'canvas',
            label: '>Native Canvas',
        },
        {
            to: 'collision-detection',
            label: 'Collision Detection',
        },
        {
            to: 'video-cropper',
            label: 'Video Cropper',
        },
        {
            to: 'konva',
            label: 'Konva',
        },
        {
            to: 'video',
            label: 'Video Player',
        },
        {
            to: 'reactkonva',
            label: 'video vs frame blob | konva-react,native canvas',
        },
    ];
    return (
        <div className={classNames('text-center', 'p-2')}>
            <Typography.Title level={2}>canvas</Typography.Title>

            <NavigatorMenu conf={conf}></NavigatorMenu>
        </div>
    );
}
