import { useEffect, useRef, useState } from 'react';

function CanvasElement(props) {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [element, setElement] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    rotation: 0,
    scale: 1,
  });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制矩形
    ctx.save();
    ctx.translate(element.x, element.y);
    ctx.rotate((element.rotation * Math.PI) / 180);
    ctx.scale(element.scale, element.scale);
    ctx.fillStyle = '#00F';
    ctx.fillRect(0, 0, element.width, element.height);
    ctx.restore();
  }, [element]);

  const handleMouseDown = e => {
    console.log('onMouseDown', e);

    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    const centerX = element.x + element.width / 2;
    const centerY = element.y + element.height / 2;

    const offsetX = mouseX - centerX;
    const offsetY = mouseY - centerY;

    if (Math.abs(offsetX) < element.width / 2 && Math.abs(offsetY) < element.height / 2) {
      setIsDragging(true);
      setDragStart({ x: mouseX, y: mouseY });
    }
  };

  const handleMouseMove = e => {
    if (isDragging) {
      const mouseX = e.nativeEvent.offsetX;
      const mouseY = e.nativeEvent.offsetY;
      const offsetX = mouseX - dragStart.x;
      const offsetY = mouseY - dragStart.y;

      setElement(prevElement => ({
        ...prevElement,
        x: prevElement.x + offsetX,
        y: prevElement.y + offsetY,
      }));

      setDragStart({ x: mouseX, y: mouseY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return <canvas ref={canvasRef} width={props.width} height={props.height} style={{ border: '1px solid #000' }} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}></canvas>;
}

export default function Example() {
  return (
    <div className="bg-blue-400">
      <CanvasElement width={100} height={100}></CanvasElement>
    </div>
  );
}
