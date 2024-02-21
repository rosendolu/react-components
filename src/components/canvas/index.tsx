import { Button, Space, Typography } from 'antd';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
export default function Index() {
    return (
        <div className={classNames('text-center')}>
            <Typography.Title level={2}>canvas</Typography.Title>
            <Space>
                <Link to={'canvas'}>
                    <Button type="link">Native Canvas</Button>
                </Link>
                <Link to={'collision-detection'}>
                    <Button type="link">Collision Detection</Button>
                </Link>
                <Link to={'video-cropper'}>
                    <Button type="link">Video Cropper</Button>
                </Link>
                <Link to={'konva'}>
                    <Button type="link">Konva</Button>
                </Link>
                <Link to={'video'}>
                    <Button type="link">Video Player</Button>
                </Link>
                <Link to={'reactkonva'}>
                    <Button type="link">video vs frame blob | konva-react,native canvas</Button>
                </Link>
            </Space>
        </div>
    );
}
