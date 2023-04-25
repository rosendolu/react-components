import React, { SyntheticEvent, useRef, useState } from 'react';
import { sleep } from '../helpers/util';

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

  async function capturePoster(useSleep = false) {
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
          video.pause();
          if (useSleep) {
            await sleep(time * 1e2);
          }
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const posterUrl = canvas.toDataURL();
          srcSet.push({ url: posterUrl, time: time });
        }
      }
      setPosters(srcSet);
      console.log('srcSet', srcSet);
    }
  }

  console.log('render');
  function calculateProgress() {
    const video = videoRef.current as HTMLVideoElement;
    const buffered = video.buffered;
    const total = video.duration;
    let loaded = 0;
    for (let i = 0; i < buffered.length; i++) {
      loaded += buffered.end(i) - buffered.start(i);
    }
    const percent = (loaded / total) * 100;
    console.log('Current loading progress: ' + percent + '%');
  }
  function progressChange(event: SyntheticEvent<HTMLVideoElement, Event>): void {
    console.log('progressChange');
    calculateProgress();
    capturePoster();
  }
  function timeUpdated(event: SyntheticEvent<HTMLVideoElement, Event>): void {
    console.log('timeUpdated');
    calculateProgress();
    // capturePoster();
  }

  return (
    <div className="p-4">
      <input type="file" accept="video/*" className="p-2" onChange={handleVideoChange} />
      <br />
      {/* <video preload="true" ref={videoRef} controls  onLoadedData={() => capturePoster(true)} /> */}
      {/* <video preload="true" ref={videoRef} controls onProgress={progressChange} /> */}
      <video preload="true" ref={videoRef} controls onTimeUpdate={timeUpdated} />
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
// 3. 定时器延迟方案 预算的时间不准确，能否通过 video api 获取到准确的加载进度
