import { Button, Divider, Space, Typography } from 'antd';
import { useRef } from 'react';

export default function FileComponents() {
    const inputRef: any = useRef();
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
                <input ref={inputRef} type="file" id="fileInput" />
                <Button onClick={uploadFile}>Upload</Button>
                <Button onClick={getList}>getList</Button>
            </Space>
            <Divider></Divider>
        </div>
    );
}
