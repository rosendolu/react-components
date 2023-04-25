import { toPng } from 'html-to-image';
import { useRef, useState } from 'react';

export default function DomToImg() {
  const dom: any = useRef();
  const [list, setList] = useState([]);

  function capturePhoto(event) {
    toPng(dom.current)
      .then(dataUrl => {
        console.log('dataUrl', dataUrl);
        setList(() => list.concat(dataUrl));
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  return (
    <div>
      <div ref={dom} className="relative flex h-20 w-6/12 items-center justify-evenly border border-red-500">
        <div className="bg-gray-500 p-4">1</div>
        <div className="bg-gray-500 p-4">2</div>
        <div className="bg-gray-500 p-4">3</div>
        <div className="absolute -left-2 top-2 bg-orange-200">position:absolute</div>
        <div className="translate-y-2 bg-orange-300">translateY</div>
        <div className="rotate-90 bg-orange-400">rotate(90deg)</div>
      </div>
      <hr />
      <div className="my-2 flex justify-evenly">
        <button className="bg-gray-500 p-2" onClick={capturePhoto}>
          capture
        </button>
      </div>

      <div className="">
        <h1>html-to-image</h1>
        <div className="flex flex-wrap">
          {list.map(url => (
            <img key={url} src={url} className="mb-4 mr-4 object-contain"></img>
          ))}
        </div>
      </div>
    </div>
  );
}
