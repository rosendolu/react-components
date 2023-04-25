import { useRef, useState } from 'react';
import { sleep } from '../helpers/util';

export default function VideoPosterCacher() {
  const [list, setList] = useState<string[]>([]);
  const videoRef = useRef() as any;

  async function capturePoster() {
    // const canvas = document.createElement('canvas');
    const video = document.getElementById('video') as any;

    const canvas = document.getElementById('canvas') as any;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    console.log('video,width,height', video);

    const ctx = canvas.getContext('2d') as any;

    const posters: string[] = [];
    const duration = video.duration;

    for (let i = 1; i <= duration; i++) {
      video.currentTime = i;
      video.pause();
      await sleep(3e3);
      // Capture the first poster at 0 seconds
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      posters.push(canvas.toDataURL('image/png'));
    }
    setList(posters);
  }

  const afterUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const videoUrl = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = videoUrl;
        videoRef.current.play();
      }
    }
  };
  // console.log('rerender');

  return (
    <div>
      <div>
        <h2>Upload Video</h2>
        <input type="file" accept="video/*" onChange={afterUpload} placeholder="Click to upload your video!" />
      </div>
      <h2>上传的视频文件</h2>
      <video ref={videoRef} id="video" onLoadedData={capturePoster} controls className="outline-1 outline-gray-600" />
      <br />
      {/* <button onClick={capturePoster}>截取封面</button> */}
      <h2>canvas 画布</h2>
      <canvas id="canvas" className="border border-cyan-200"></canvas>
      <h2>视频封面图片</h2>
      {list.map((src, i) => (
        <img src={src} key={i} />
      ))}
    </div>
  );
}
