import { Space } from 'antd';
import classNames from 'classnames';
import log from 'loglevel';
import { useRef } from 'react';

export default function VideoCapture() {
    const videoRef: any = useRef();
    const c1Ref: any = useRef();
    const c2Ref: any = useRef();

    const w = 320,
        h = 569;

    function videoLoad() {
        log.info('video metadata loaded');
        captureStream();
    }

    function playVideo(e) {
        const w = videoRef.current.videoWidth,
            h = videoRef.current.videoHeight;
        log.info('play video', w, h, window.devicePixelRatio);
        captureStream();
    }
    function captureStream() {
        const video = videoRef.current as HTMLVideoElement;
        if (video.paused || video.ended) {
            return;
        }
        computeFrame();
        requestAnimationFrame(captureStream);
    }

    function computeFrame() {
        const video = videoRef.current as HTMLVideoElement;
        const ctx1 = c1Ref.current.getContext('2d'),
            ctx2 = c2Ref.current.getContext('2d');
        const height = videoRef.current.videoWidth,
            width = videoRef.current.videoHeight;
        const ratio = window.devicePixelRatio;

        ctx1.drawImage(video, 0, 0);
        // ctx1.drawImage(video, 50, 50, w / 2, h / 2);
        // ctx1.drawImage(video, 50, 50, w / 2, h / 2, 0, 0, w / 2, h / 2);

        let frame = ctx1.getImageData(0, 0, w, h); //
        const threshold = 50;
        let l = frame.data.length / 4;
        // colorSpace: "srgb"
        for (let i = 0; i < l; i++) {
            // debugger;
            let r = frame.data[i * 4 + 0];
            let g = frame.data[i * 4 + 1];
            let b = frame.data[i * 4 + 2];
            let a = frame.data[i * 4 + 3];
            if (r >= 255 - threshold && g >= 255 - threshold && b >= 255 - threshold) {
                frame.data[i * 4 + 0] = 255;
                frame.data[i * 4 + 1] = 0;
                frame.data[i * 4 + 2] = 0;
                // frame.data[i * 4 + 3] = 1;
                // rgba(255 0 14)
                // console.log('frame', `rgba(${r},${g},${b},${a})`);
            }
        }
        ctx2.putImageData(frame, 0, 0);
        return;
    }

    return (
        <div className="m-auto text-center">
            <h2 className={classNames('text-center', 'p-2')}>canvas 截取视频流，修改 imageData并渲染到画布</h2>

            <Space direction="horizontal" wrap>
                <div className="text-center">
                    <video
                        width={w}
                        height={h}
                        muted={true}
                        preload={'auto'}
                        autoPlay={false}
                        ref={videoRef}
                        className={classNames('m-auto', 'outline-dashed outline-1 outline-red-500')}
                        src="/output_320.webm"
                        controls
                        onLoadedMetadata={videoLoad}
                        onPlay={playVideo}></video>
                    <p>原始视频</p>
                </div>
                <div className="text-center">
                    <canvas
                        width={w}
                        height={h}
                        ref={c1Ref}
                        id="v1"
                        className={classNames(' m-auto', 'outline-dashed outline-1 outline-green-500')}></canvas>
                    <p>截帧视频</p>
                </div>
                <div className="text-center">
                    <canvas
                        width={w}
                        height={h}
                        ref={c2Ref}
                        id="v2"
                        className={classNames(' m-auto', 'outline-dashed outline-1 outline-blue-500')}></canvas>
                    <p>抠图后的视频 白色 TO 红色</p>
                </div>
            </Space>
        </div>
    );
}
