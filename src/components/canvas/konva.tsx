import { Typography } from 'antd';

import Konva from 'konva';
import { useRef } from 'react';
import { useEffectOnce } from 'usehooks-ts';

export default function KonvaCanvas() {
    const stageRef = useRef<any>(null);
    const layerRef = useRef<any>(null);
    useEffectOnce(() => {
        const stage = new Konva.Stage({
            container: 'canvasBox',
            width: 600,
            draggable: false,
            height: 600,
        });
        stageRef.current = stage;
        const layer = new Konva.Layer();
        layerRef.current = layer;

        var rect0 = new Konva.Rect({
            draggable: false,
            x: 0,
            y: 0,
            width: 300,
            height: 300,
            fill: 'yellow',
            //   shadowBlur: 10,
        });
        rect0.on('dblclick', e => {
            console.log(`rect0`, rect0.toObject(), rect0.size());
        });
        var rect1 = new Konva.Rect({
            //   draggable: true,
            x: 0,
            y: 0,
            width: 300,
            height: 300,
            fill: 'green',
            shadowBlur: 10,
        });
        // add the shape to the layer
        // layer.add(rect1);

        const circle1 = new Konva.Circle({
            draggable: true,
            radius: 50,
            x: 150,
            y: 150,
            fill: 'transparent',
            shadowBlur: 10,
        });

        // layer.add(circle1);
        circle1.on('dblclick', e => {
            console.log('circle1', circle1.toObject(), circle1.getAbsolutePosition());
        });
        var circleTransform = new Konva.Transformer({
            nodes: [circle1],
            keepRatio: true,
            centeredScaling: false,
        });

        const group = new Konva.Group({
            draggable: false,
            visible: true,
            x: 0,
            y: 0,
            rotation: 0,
            dragBoundFunc: pos => {
                // console.log('group dragBoundFunc', pos);
                // const {width,height} = stage.size();
                // const {width,height} = rect1.
                // return {
                //   x: Math.max(0, pos.x),
                //   y: Math.max(0, pos.y),
                // };
                return pos;
            },
            clipFunc: ctx => {
                const obj = circle1.toObject().attrs;
                // console.log('clipFunc', obj);

                ctx.arc(obj.x, obj.y, obj.radius * (obj.scaleX || 1), 0, Math.PI * 2, false);
            },
        });
        group.on('mouseover', function () {
            document.body.style.cursor = 'move';
        });
        group.on('mouseout', function () {
            document.body.style.cursor = 'default';
        });
        group.on('dragstart', e => {
            //   console.log('dragstart', e);
        });
        group.on('dragmove', e => {
            //   console.log('dragmove', e.evt.offsetX, e.evt.offsetY);
        });
        group.on('dragend', e => {
            //   console.log('dragend', e);
        });
        group.on('dblclick', e => {
            e.cancelBubble = true;
            console.log('group obj', group.toObject(), group.getAbsolutePosition(), group.size());
        });

        const clipBoxGroup = new Konva.Group({
            draggable: true,
            x: 0,
            y: 0,
        });
        var transform = new Konva.Transformer({
            //   draggable: true,
            nodes: [clipBoxGroup],
            keepRatio: true,
            centeredScaling: false,
        });
        group.add(rect1, circle1);

        const rect2 = new Konva.Rect({
            draggable: true,
            x: 400,
            y: 100,
            width: 100,
            height: 100,
            fill: 'blue',
            shadowBlur: 10,
        });

        clipBoxGroup.add(rect0, group);
        clipBoxGroup.on('dblclick', e => {
            e.cancelBubble = true;
            console.log(
                'clipBoxGroup',
                clipBoxGroup.toObject(),
                clipBoxGroup.getAbsolutePosition(),
                clipBoxGroup.size()
            );
        });
        layer.add(clipBoxGroup, rect2);
        layer.add(transform);
        layer.add(circleTransform);
        Konva.Image.fromURL('/people.webp', imgNode => {
            imgNode.setAttrs({
                draggable: true,
                x: 350,
                y: 350,
            });
            imgNode.on('dblclick', e => {
                e.cancelBubble = true;
                console.log('img', imgNode.toObject(), imgNode.getAbsolutePosition(), imgNode.size());
            });
            layer.add(imgNode);

            var transform = new Konva.Transformer({
                nodes: [imgNode],
                keepRatio: true,
                centeredScaling: false,
                enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
                rotateEnabled: true,
            });
            transform.on('dblclick', e => {
                e.cancelBubble = true;
                console.log('transform', transform.toObject(), transform.size());
            });
            transform.on('transform', e => {
                e.cancelBubble = true;
                // console.log(`T transform`, transform.toObject());
                // transform.skewX(0);
                // transform.rotate(0);
            });
            layer.add(transform);
        });

        // add the layer to the stage
        stage.add(layer);
        stage.on('dblclick', e => {
            console.log('stage', stage.getAbsolutePosition(), stage.size());
        });
    });
    return (
        <div className="text-center">
            <Typography.Title level={2}>konva 实现分组抠图clip 裁剪，组合transform</Typography.Title>
            <div id="canvasBox" className="canvasBox m-auto h-[600px] w-[600px] bg-zinc-100 outline-1"></div>
            <p className="p-2">native konva</p>
        </div>
    );
}
