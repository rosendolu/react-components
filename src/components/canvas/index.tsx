import { useEffectOnce } from 'usehooks-ts';
import Triangle, { Arc } from './shape';

export default function Canvas() {
  useEffectOnce(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    // 绘制矩形
    ctx.fillStyle = 'blue'; // 填充颜色
    ctx.fillRect(0, 0, 100, 60); // 绘制矩形

    // 绘制文本
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Hello, Canvas!', 60, 130);
  });
  return (
    <div className="p-4">
      <canvas id="canvas" className="h-[300px] w-[300px] bg-red-500 outline-1"></canvas>
      <br />
      <div className="flex">
        <Triangle></Triangle>
        <Arc></Arc>
      </div>
    </div>
  );
}
