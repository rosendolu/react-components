import { Checkbox, Divider, Space, Typography } from 'antd';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';

export default function CanvasSlide() {
    const canvasRef: any = useRef();
    const stageRef: any = useRef();
    const layerRef: any = useRef<Konva.Layer>();

    const imageRef: any = useRef<HTMLImageElement>(new Image());

    const ImgList = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg'].map(url => {
        let img = new Image();
        img.src = url;
        return img;
    });

    const [direction, setDirection] = useState(['x']);

    const onChange = checkedValues => {
        console.log('checked = ', checkedValues);

        setDirection(checkedValues);
    };

    useEffect(() => {
        const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d');
        const w = 300,
            h = 300;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, w, h);

        let offset = 0;

        function draw() {
            ctx.clearRect(0, 0, w, h);

            // 计算当前图片的绘制位置
            const dx = offset % w;
            const dx2 = (offset % w) - w;

            const moveX = direction.includes('x');
            const moveY = direction.includes('y');
            // 绘制两次图片，实现无缝滚动
            ctx.drawImage(ImgList[0], moveX ? dx : 0, moveY ? dx : 0, w, h);
            ctx.drawImage(ImgList[0], moveX ? dx2 : 0, moveY ? dx2 : 0, w, h);

            offset = ++offset % w;

            layerRef.current?.draw();
            requestAnimationFrame(draw);
        }
        draw();
    }, [direction]);

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
            draggable: true,
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
    }, [direction]);
    return (
        <div>
            <Typography.Title level={2}>Canvas Slide</Typography.Title>
            <Space>
                {/* <Radio.Group onChange={onChange} value={direction} >
                    <Radio value={1}>x</Radio>
                    <Radio value={4}>y</Radio>
                </Radio.Group> */}
                <Checkbox.Group style={{ width: '100%' }} onChange={onChange} defaultValue={direction}>
                    <Checkbox value="x">x</Checkbox>
                    <Checkbox value="y">y</Checkbox>
                </Checkbox.Group>
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
