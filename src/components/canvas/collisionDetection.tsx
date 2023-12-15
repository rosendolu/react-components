import { useRef } from 'react';
import { useEffectOnce } from 'usehooks-ts';

export default function CollisionDetection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffectOnce(() => {
    var canvas = canvasRef.current!;
    var context = canvas.getContext('2d')!;

    // 绘制第一个矩形
    context.fillStyle = 'red';
    context.fillRect(0, 0, 100, 100);

    // 绘制第二个矩形
    context.fillStyle = 'blue';
    context.fillRect(200, 200, 100, 100);
  });
  function clickCanvas(event) {
    // console.log('e', event);

    const canvas = canvasRef.current!;
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // 碰撞检测第一个矩形
    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
      console.log('点击了红色矩形');
    }

    // 碰撞检测第二个矩形
    if (x >= 200 && x <= 300 && y >= 200 && y <= 300) {
      console.log('点击了蓝色矩形');
    }
  }

  return (
    <div>
      <h3>canvas 碰撞检测</h3>
      <p>通过点击事件坐标，检测出此位置绘制的图形</p>
      <canvas ref={canvasRef} id="canvas" className="bg-gray-500" width={600} height={600} onClick={clickCanvas}></canvas>
    </div>
  );
}
