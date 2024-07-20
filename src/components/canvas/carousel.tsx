import { Divider, Radio, Space, Typography } from 'antd';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';

class TimeFn {
    // 缓入 缓出
    static easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    // 缓入
    static easeInQuad(t) {
        return t * t;
    }

    // 缓出
    static easeOutQuad(t) {
        return t * (2 - t);
    }
    // 线性
    static linear(t) {
        return t;
    }
}

export default function CanvasCarousel() {
    const canvasRef: any = useRef();
    const stageRef: any = useRef();
    const layerRef: any = useRef<Konva.Layer>();

    const ImgList = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg'].map(url => {
        let img = new Image();
        img.src = url;
        return img;
    });

    const [timeFnType, setTimeFnType] = useState('easeInOutQuad');

    const onChange = e => {
        setTimeFnType(e.target.value);
    };

    useEffect(() => {
        const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d');
        const w = 300,
            h = 300;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, w, h);

        let offset = 0;

        const totalImages = ImgList.length;
        const displayDuration = 3000; // 每张图片显示的时间（毫秒）
        const transitionDuration = 1000; // 图片切换的时间（毫秒）

        let currentImageIndex = 0;
        let lastSwitchTime = performance.now();
        let isTransitioning = false;
        let transitionStartTime = 0;
        let startXPos = 0;
        let endXPos = -w;

        draw(lastSwitchTime);
        function draw(timestamp) {
            ctx.clearRect(0, 0, w, h);
            const moveX = timeFnType.includes('x');
            const moveY = timeFnType.includes('y');

            const elapsed = timestamp - lastSwitchTime;

            if (elapsed >= displayDuration && !isTransitioning) {
                isTransitioning = true;
                transitionStartTime = timestamp;
                lastSwitchTime = timestamp;
                currentImageIndex = (currentImageIndex + 1) % totalImages;
            }

            if (isTransitioning) {
                const transitionElapsed = timestamp - transitionStartTime;
                const progress = Math.min(transitionElapsed / transitionDuration, 1);
                const xOffset = w * TimeFn[timeFnType](progress);

                ctx.drawImage(
                    ImgList[(currentImageIndex - 1 + totalImages) % totalImages],
                    startXPos + xOffset,
                    0,
                    w,
                    h
                );
                ctx.drawImage(ImgList[currentImageIndex], endXPos + xOffset, 0, w, h);

                if (progress === 1) {
                    isTransitioning = false;
                    startXPos = 0;
                    endXPos = -w;
                }
            } else {
                ctx.drawImage(ImgList[currentImageIndex], 0, 0, w, h);
            }

            layerRef.current?.draw();
            requestAnimationFrame(draw);
        }
    }, [timeFnType]);

    useEffect(() => {
        const stage = new Konva.Stage({
            container: document.getElementById('app') as any,
            width: 300,
            draggable: false,
            height: 300,
        });
        stageRef.current = stage;

        const layer = new Konva.Layer();
        layerRef.current = layer;

        const img = new Konva.Image({
            x: 0,
            y: 0,
            image: canvasRef.current as any,
            // draggable: true,
            width: 300,
            height: 300,
        });
        // var anim = new Konva.Animation(function () {
        //     // do nothing, animation just need to update the layer
        // }, layer);
        layer.add(img);
        stage.add(layer);
        // anim.start();

        return () => {
            // anim.stop();
            layer.destroy();
            stage.destroy();
        };
    }, [timeFnType]);
    return (
        <div>
            <Typography.Title level={2}>Canvas Carousel</Typography.Title>
            <Space>
                <Radio.Group style={{ width: '100%' }} onChange={onChange} defaultValue={timeFnType}>
                    <Radio value="linear">linear</Radio>
                    <Radio value="easeInQuad">easeInQuad</Radio>
                    <Radio value="easeOutQuad">easeOutQuad</Radio>
                    <Radio value="easeInOutQuad">easeInOutQuad</Radio>
                </Radio.Group>
            </Space>
            <Divider></Divider>
            <Space>
                <div style={{ border: '1px solid red' }} id="app"></div>
                <canvas
                    ref={canvasRef}
                    style={{ border: '1px solid green' }}
                    id="canvasBox"
                    width={300}
                    height={300}></canvas>
            </Space>
        </div>
    );
}
