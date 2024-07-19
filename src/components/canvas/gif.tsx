import { decode } from '@jsquash/webp';
import { Button, Divider, Input, Space, Typography } from 'antd';
import parseAPNG from 'apng-js';
import 'gifler';
import Konva from 'konva';
import log from 'loglevel';

import { useEffect, useRef, useState } from 'react';

async function loadImage(src) {
    const img = document.createElement('img');
    img.src = src;
    await new Promise(resolve => (img.onload = resolve));
}

function getImageBuffer(src) {
    return fetch(src).then(res => res.arrayBuffer());
}

async function decodeWebp(src) {
    // Assuming user selected an input WebP file
    return decode(new Uint8Array(await getImageBuffer(src)));
}

export default function AnimateImg() {
    return (
        <Space direction="vertical">
            <AnimateImage></AnimateImage>
        </Space>
    );
}

function AnimateImage() {
    const [src, setSrc] = useState('/public/2.webp');
    const canvasRef: any = useRef();
    const stageRef: any = useRef();
    const layerRef: any = useRef<Konva.Layer>();
    const imageRef: any = useRef<HTMLImageElement>(new Image());
    const rawImgRef: any = useRef<HTMLImageElement>();

    useEffect(() => {
        const stage = new Konva.Stage({
            container: canvasRef.current,
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
            image: imageRef.current,
            // image: rawImgRef.current,
            draggable: true,
            width: 300,
            height: 300,
        });
        const img2 = new Konva.Image({
            x: 0,
            y: 0,
            image: document.getElementById('canvasBox') as any,
            // image: rawImgRef.current,
            draggable: true,
            width: 300,
            height: 300,
        });
        var anim = new Konva.Animation(function () {
            // do nothing, animation just need to update the layer
        }, layer);
        layer.add(img);
        layer.add(img2);
        stage.add(layer);
        anim.start();
        return () => {
            layer.destroy();
            stage.destroy();
        };
    }, [src]);
    async function load() {
        const target = imageRef.current;
        // const ImageData = await decodeWebp(src);
        const buffer = await getImageBuffer(src);
        let draw = () => {
            layerRef.current!.draw();
            log.info('draw ');
            if (!src) return;
            requestAnimationFrame(draw);
        };

        if (String(src).endsWith('.apng')) {
            let i = 0;
            const apng: any = parseAPNG(buffer);
            const canvas: any = document.getElementById('canvasBox')!;
            const player = await apng.getPlayer(canvas.getContext('2d'), true);
            player.play();
            target.current = canvas;
            // draw = async () => {
            //     if (!src) return;
            //     // debugger;
            //     // const len = apng.frames.length;
            //     // const duration = apng.playTime / len;
            //     // const blobURI = URL.createObjectURL(apng.frames[i % apng.frames.length].imageData);
            //     // target.src = blobURI;
            //     // await new Promise(resolve => (target.onload = resolve));
            //     layerRef.current!.draw();
            //     log.info('draw ');
            //     i++;
            //     await sleep(duration);
            //     requestAnimationFrame(draw);
            // };
            // draw();
        } else if (String(src).endsWith('.gif')) {
            function onDrawFrame(ctx, frame) {
                // update canvas size
                // canvas.width = frame.width;
                // canvas.height = frame.height;
                // update canvas that we are using for Konva.Image
                ctx.clearRect(0, 0, 300, 300);
                ctx.drawImage(frame.buffer, 0, 0, 300, 300);
                // redraw the layer
                // layer.draw();
            }

            // @ts-ignore
            window.gifler(src).frames(document.getElementById('canvasBox'), onDrawFrame);
        }
        // const blobURI = URL.createObjectURL(new Blob([buffer], { type: `image/png` }));
        // target.src = blobURI;
        // await new Promise(resolve => (target.onload = resolve));
    }

    return (
        <div>
            <Typography.Title level={2}>Canvas Animate Image</Typography.Title>
            <Space>
                <Input onBlur={e => setSrc(e.target.value)}></Input>
                <Button onClick={load}>load</Button>
            </Space>
            <Divider></Divider>
            <Space direction="horizontal">
                <img ref={rawImgRef} src={src} alt="" width={200} height={200} />
                <div style={{ border: '1px solid red' }} ref={canvasRef}></div>
                <canvas width={300} height={300} id="canvasBox"></canvas>
            </Space>
        </div>
    );
}
