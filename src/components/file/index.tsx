import { Button, Divider, Input, Space, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';

export default function FileComponents() {
    const inputRef: any = useRef();
    const [uploadRes, setUploadRes] = useState<any>(null);

    useEffect(() => {
        var videoSrc = uploadRes?.playUrl;
        if (!videoSrc) return;
        var video: any = document.getElementById('video_hls')!;
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoSrc;
            // If no native HLS support, check if HLS.js is supported
            //
        } else if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
        }
    }, [uploadRes]);

    function uploadFile() {
        const file = inputRef.current.files[0];

        if (!file) {
            alert('请选择文件');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        fetch('https://api.rosendo.fun/file/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('上传文件失败');
                }
                return response.json();
            })
            .then(data => {
                // setUploadRes(data.data);
                console.log('文件上传成功:', data);
            })
            .catch(error => {
                console.error('文件上传失败:', error);
            });
    }

    async function getList() {
        await fetch('https://api.rosendo.fun/file/list');
    }

    return (
        <div>
            <Typography.Title>File Operation</Typography.Title>
            <Space direction="horizontal">
                <Input
                    onBlur={e => {
                        setUploadRes({ playUrl: e.target.value });
                    }}
                    placeholder="hls url"></Input>
                <input ref={inputRef} type="file" id="fileInput" />
                <Button onClick={uploadFile}>Upload</Button>
                <Button onClick={getList}>getList</Button>
            </Space>
            <Divider></Divider>
            <video id="video_hls" controls></video>
        </div>
    );
}
