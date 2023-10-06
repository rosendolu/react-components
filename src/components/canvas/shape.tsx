import { useEffectOnce } from 'usehooks-ts';

export default function Triangle() {
  useEffectOnce(() => {
    const canvas = document.getElementById('triangle') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    // ctx.fillStyle = 'rgba(0,0,100,0.5)';
    // ctx.fillRect(0, 0, 150, 150);

    // fill
    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(105, 25);
    ctx.lineTo(25, 105);
    ctx.closePath();
    ctx.fill();

    // stroke

    ctx.beginPath();
    ctx.moveTo(125, 125);
    ctx.lineTo(125, 45);
    ctx.lineTo(45, 125);
    ctx.closePath();
    ctx.stroke();
  });
  return (
    <div>
      <canvas id="triangle" width={150} height={150} className="border"></canvas>
    </div>
  );
}

export function Arc() {
  useEffectOnce(() => {
    const canvas = document.getElementById('arc') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    // ctx.fillStyle = 'rgba(0,0,100,0.5)';
    // ctx.fillRect(0, 0, 150, 150);

    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.closePath();
    ctx.fill();
  });
  return (
    <div>
      <canvas id="arc" width={150} height={150} className="border"></canvas>
    </div>
  );
}
