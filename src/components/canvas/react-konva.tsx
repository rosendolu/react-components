import { Button, Divider, Space, Typography } from 'antd';
import log from 'loglevel';
import { useRef, useState } from 'react';
import { Circle, Image, Layer, Rect, Stage } from 'react-konva';
import useImage from 'use-image';
import { useEffectOnce } from 'usehooks-ts';
import { execCommands, ffmpeg, ffmpegDownloadFile, ffmpegListDir, loadFFmpeg } from '../ffmpeg/tools';

const VIDEOURL = `https://devapi.nnkosmos.com/file/upload/preprocess/action/4398/812/play.webm`;
// const VIDEOURL = `/output.webm`;

// const webm = `/output_320.webm`;
// const webm = `https://devapi.nnkosmos.com/file/upload/preprocess/action/4398/812/play.webm`;

export default function KonvaReact() {
    const w = 320,
        h = 569;
    const videoRef: any = useRef();
    const imgRef: any = useRef();
    const layerRef: any = useRef();
    const frameImageLayerRef: any = useRef();
    const c1Ref: any = useRef();
    const c2Ref: any = useRef();

    const [imageFrame, setImage] = useState(new globalThis.Image());
    // const [imageFrame] = useImage(new globalThis.Image());
    const [url, setURL] = useState('');
    const [image] = useImage(url);
    const [videoFrame, setVideoFrame] = useState();
    useEffectOnce(() => {
        setVideoFrame(videoRef.current);
    });

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
    const prevFrameId = useRef(0);
    function captureStream() {
        const video = videoRef.current as HTMLVideoElement;
        prevFrameId.current && cancelAnimationFrame(prevFrameId.current);
        computeFrame();
        if (video.paused || video.ended) {
            return;
        }
        prevFrameId.current = requestAnimationFrame(captureStream);
    }
    function computeFrame() {
        const video = videoRef.current as HTMLVideoElement;
        const ctx1 = c1Ref.current.getContext('2d');
        const ctx2 = c2Ref.current.getContext('2d');

        // json
        // ctx1.imageSmoothingQuality = 'high';
        // ctx2.imageSmoothingQuality = 'low';

        const { duration, currentTime } = video;
        const height = video.videoWidth,
            width = video.videoHeight;
        const ratio = window.devicePixelRatio;

        // imgRef.current.image = videoRef.current;
        // native canvas
        ctx1.clearRect(0, 0, w, h);
        ctx1.imageSmoothingEnabled = true;
        ctx1.drawImage(video, 0, 0, w, h);

        // react-konva render video
        layerRef.current.draw();

        // react-konva render frame blob
        const frame = String(((currentTime / 0.04) >> 0) + 1).padStart(4, '0');

        ffmpeg.readFile(`/img_${frame}.png`).then((data: any) => {
            const blobURI = URL.createObjectURL(new Blob([data.buffer], { type: `image/png` }));
            // @ts-ignore
            // setImage(blobURI);
            setURL(blobURI);
            imageFrame.src = blobURI;
            imageFrame.onload = () => {
                // c2Ref
                ctx2.clearRect(0, 0, w, h);
                ctx2.imageSmoothingEnabled = true;
                ctx2.drawImage(imageFrame, 0, 0, w, h);

                frameImageLayerRef.current.draw();

                log.info('frame', frame, currentTime, duration, blobURI);
            };
        });
    }
    async function load() {
        await loadFFmpeg();
        log.info('Load Successfully');
    }
    async function videoToImage() {
        const command = `-i output.webm -y -vf fps=25 img_%4d.png`;
        // const command = `-c:v libvpx-vp9 -i output.webm -y img_%4d.png`;
        // const command = ['-c:v', 'libvpx-vp9', '-i', 'output.webm', 'img_%4d.png'].join(' ');
        await execCommands(command);
    }
    async function downloadFile() {
        await ffmpegDownloadFile(VIDEOURL, 'output.webm');
        log.info('downloadFile success');
    }
    async function listDir() {
        await ffmpegListDir('/');
    }

    async function prepare() {
        await load();
        await downloadFile();
        await videoToImage();
        await listDir();
    }

    async function onTimeUpdate() {
        captureStream();
    }
    return (
        <div className="text-center">
            <Typography.Title>react-konva preview video</Typography.Title>
            <Space wrap>
                <Button onClick={load}>load ffmpeg</Button>
                <Button onClick={downloadFile}>downloadFile</Button>
                <Button onClick={listDir}>listDir</Button>
                <Button onClick={videoToImage}>video to frame</Button>

                <Button type="dashed" onClick={prepare}>
                    all in one
                </Button>
            </Space>
            <Divider></Divider>
            <Space wrap>
                <div>
                    <video
                        onLoadedMetadata={videoLoad}
                        onPlay={playVideo}
                        muted={true}
                        preload={'auto'}
                        autoPlay={false}
                        ref={videoRef}
                        controls
                        onTimeUpdate={onTimeUpdate}
                        src={VIDEOURL}
                        style={{ width: w, height: h }}
                        className={'outline-dashed outline-1 outline-red-500'}></video>
                    <Typography.Text>video tag</Typography.Text>
                </div>
                <div>
                    <canvas
                        width={w}
                        height={h}
                        ref={c1Ref}
                        id="v1"
                        className={'outline-dashed outline-1 outline-green-500'}></canvas>
                    <Typography.Text>native canvas + video</Typography.Text>
                </div>
                <div>
                    <Stage
                        width={w}
                        height={h}
                        className={'outline-dashed outline-1 outline-blue-500'}
                        style={{ width: w, height: h }}>
                        <Layer ref={layerRef}>
                            <Circle draggable x={100} y={100} stroke="red" radius={100} />
                            <Image width={w} height={h} image={videoFrame}></Image>
                            <Rect draggable width={50} height={50} fill="green" />
                        </Layer>
                    </Stage>
                    <Typography.Text>react-konva + video</Typography.Text>
                </div>
                <div>
                    <canvas
                        width={w}
                        height={h}
                        ref={c2Ref}
                        id="v2"
                        className={'outline-purple-500-500 outline-dashed outline-1'}></canvas>
                    <Typography.Text>native canvas + blob image</Typography.Text>
                </div>
                <div>
                    <Stage
                        width={w}
                        height={h}
                        className={'outline-dashed outline-1 outline-yellow-500'}
                        style={{ width: w, height: h }}>
                        <Layer ref={frameImageLayerRef}>
                            <Circle draggable x={100} y={100} stroke="red" radius={100} />
                            <Image width={w} height={h} ref={imgRef} image={imageFrame}></Image>
                            <Rect draggable width={50} height={50} fill="green" />
                        </Layer>
                    </Stage>
                    <Typography.Text>react-konva + blob image</Typography.Text>
                </div>
                <div>
                    <Stage
                        width={w}
                        height={h}
                        className={'outline-dashed outline-1 outline-yellow-500'}
                        style={{ width: w, height: h }}>
                        <Layer>
                            <Circle draggable x={100} y={100} stroke="red" radius={100} />
                            <Image width={w} height={h} ref={imgRef} image={image}></Image>
                            <Rect draggable width={50} height={50} fill="green" />
                        </Layer>
                    </Stage>
                    <Typography.Text>react-konva + blob image + useImage</Typography.Text>
                </div>
            </Space>
        </div>
    );
}
