import { useRef, useState } from 'react';

export default function VideoPosterCacher() {
  const [list, setList] = useState<string[]>([]);
  const uploadRef = useRef() as any;
  const [src, setSrc] = useState('');

  const capturePoster = () => {
    if (!uploadRef.current.files.length) {
      alert('Please Upload Video First!');
    }
    // const canvas = document.createElement('canvas');
    const video = document.getElementById('video') as any;

    const canvas = document.getElementById('canvas') as any;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    console.log('video,width,height', video);

    const ctx = canvas.getContext('2d') as any;

    const posters: string[] = [];
    // Capture the first poster at 0 seconds
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    posters.push(canvas.toDataURL('image/png'));

    // Capture the second poster at 50% of the video's duration
    const halfwayTime = video.duration / 2;
    video.currentTime = halfwayTime;
    video.pause();
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    posters.push(canvas.toDataURL('image/png'));

    // Capture the third poster at 90% of the video's duration
    const ninetyPercentTime = video.duration * 0.9;
    video.currentTime = ninetyPercentTime;
    video.pause();
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    posters.push(canvas.toDataURL('image/png'));
    setList(posters);
  };

  const afterUpload = () => {
    setSrc(URL.createObjectURL(uploadRef.current.files[0]));
    // capturePoster();
  };

  return (
    <div>
      <div>
        <h2>Upload Video</h2>
        <input
          type="file"
          accept="video/*"
          style={{
            width: '500px',
            height: '20px',
            border: '1px solid blue',
          }}
          onChange={afterUpload}
          placeholder="Click to upload your video!"
          ref={uploadRef}
        />
      </div>
      {src && (
        <>
          <h2>上传的视频文件</h2>
          <video
            id="video"
            key={src}
            // onCanPlay={capturePoster}
            controls
            src={src}
            style={{ width: '250px', height: '250px' }}
          />
        </>
      )}
      <br />
      {/* <button onClick={capturePoster}>截取封面</button> */}
      <h2>截取的视频封面图片</h2>
      <canvas id="canvas" style={{ outline: '1px solid red' }}></canvas>
      {list.map((src, i) => (
        <img
          src={src}
          key={i}
          style={{
            margin: '10px',
            outline: '1px solid blue',
            width: '100px',
            height: '100px',
            background: 'gray',
          }}
        />
      ))}
    </div>
  );
}
