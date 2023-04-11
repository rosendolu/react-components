import React, { useRef, useState } from 'react';

type Poster = {
  url: string;
  time: number;
};

export default function VideoPosterCropper() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posters, setPosters] = useState<Poster[]>([]);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const videoUrl = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = videoUrl;
        videoRef.current.play();
      }
    }
  };

  async function capturePoster() {
    const video = videoRef.current;
    console.log('capture poster ', video?.videoWidth, video?.videoHeight, video?.duration);
    if (video) {
      const interval = video.duration / 4;
      const times = [interval, interval * 2, interval * 3];
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const srcSet: any[] = [];
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        for (let time of times) {
          video.currentTime = time;
          // video.pause();
          await sleep(time * 10);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const posterUrl = canvas.toDataURL();
          srcSet.push({ url: posterUrl, time: time });
        }
      }
      setPosters(srcSet);
    }
  }

  console.log('render');

  return (
    <div className="p-4">
      <input type="file" accept="video/*" className="p-2" onChange={handleVideoChange} />
      <br />
      <video ref={videoRef} controls onLoadedData={capturePoster} />
      <br />
      {posters.map(poster => (
        <div key={poster.time} className="relative">
          <div className="text-center text-lg font-bold">{poster.time}</div>
          <img className="block" src={poster.url} alt={`Poster at ${poster.time}`} />
        </div>
      ))}
    </div>
  );
}

// FIXME
// 1. 重复渲染的问题
// 2. 视频没加载完成，导致截取的图片是刚开始的第一帧

async function sleep(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}
