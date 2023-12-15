import { useRef } from 'react';

export default function VideoCapture() {
  const videoRef = useRef(null);
  const c1Ref = useRef(null);
  const c2Ref = useRef(null);
  function videoLoad() {
    computeFrame();
    console.log('video load');
  }

  function playVideo(e) {
    const w = videoRef.current.videoWidth,
      h = videoRef.current.videoHeight;
    console.log('play video', w, h, window.devicePixelRatio);
    captureStream();
  }
  function captureStream() {
    const video = videoRef.current as HTMLVideoElement;
    if (video.paused || video.ended) {
      return;
    }
    computeFrame();
    // setTimeout(() => {
    //   captureStream();
    // }, 0);
    requestAnimationFrame(captureStream);
  }

  const w = 90 * 3,
    h = 160 * 3;
  function computeFrame() {
    const video = videoRef.current as HTMLVideoElement;
    const ctx1 = c1Ref.current.getContext('2d'),
      ctx2 = c2Ref.current.getContext('2d');
    const height = videoRef.current.videoWidth,
      width = videoRef.current.videoHeight;
    const ratio = window.devicePixelRatio;

    ctx1.drawImage(video, 0, 0, width, height, 0, 0, w, h);
    let frame = ctx1.getImageData(0, 0, w, h);

    let l = frame.data.length / 4;
    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      let a = frame.data[i * 4 + 3];
      if (g >= 100 && r <= 50 && b <= 50) {
        frame.data[i * 4 + 3] = 0;
        a = 0;
        // console.log('frame', `rgba(${r},${g},${b},${a})`);
      }
    }
    ctx2.putImageData(frame, 0, 0);
    return;
  }

  return (
    <div>
      <p>canvas 截取视频流，修改 imageData并渲染到画布</p>

      <div className="grid grid-cols-3  items-stretch justify-center gap-2 text-center">
        <div className="h-full text-center">
          <video width={w} height={h} muted={true} autoPlay={false} ref={videoRef} className="m-auto" src="/1.mp4" controls onLoad={videoLoad} onPlay={playVideo}></video>
          <p>原始视频</p>
        </div>
        <div className="h-full text-center">
          <canvas width={w} height={h} ref={c1Ref} id="v1" className=" m-auto  border-red-500 text-center"></canvas>
          <p>截帧视频</p>
        </div>
        <div className="h-full text-center">
          <canvas width={w} height={h} ref={c2Ref} id="v2" className="m-auto  border-green-500"></canvas>
          <p>修改后的视频</p>
        </div>
      </div>
    </div>
  );
}
