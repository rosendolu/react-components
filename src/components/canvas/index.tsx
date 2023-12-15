import { useEffectOnce } from 'usehooks-ts';
import Triangle, { Arc } from './shape';

export default function Canvas() {
  useEffectOnce(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    // 绘制矩形
    ctx.fillStyle = 'blue'; // 填充颜色
    ctx.fillRect(10, 10, 100, 100); // 绘制矩形

    // 绘制文本
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Hello, Canvas!', 60, 130);

    ctx.beginPath();
    ctx.arc(50, 50, 10, 0, Math.PI);
    ctx.stroke();
    console.log(ctx.getImageData(10, 10, 10, 100));
  });
  function clickOnCanvas(e) {
    console.log('click on canvas', e);
  }
  return (
    <div className="p-4">
      <canvas id="canvas" className=" bg-red-500 outline-1" onClick={clickOnCanvas}></canvas>
      <br />
      <div className="flex">
        <Triangle></Triangle>
        <Arc></Arc>
      </div>
    </div>
  );
}
