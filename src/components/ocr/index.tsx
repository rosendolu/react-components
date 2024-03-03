import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Space, Typography, Upload } from 'antd';
import log from 'loglevel';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { createWorker } from 'tesseract.js';
import { useEffectOnce } from 'usehooks-ts';

export default function OCRDemo() {
    const [text, setText] = useState('');
    const [rawHtml, setRawHtml] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const fileObjRef = useRef<any>();
    const workerRef = useRef<any>();
    useEffectOnce(() => {
        if (!workerRef.current) {
            workerRef.current = createWorker('eng');
        }
        // return () => {
        //     workerRef.current && workerRef.current.then(worker => worker.terminate());
        // };
    });

    async function start() {
        if (!imageUrl) {
            toast.error('请先上传图片！');
            return;
        }
        const id = 'toast-recognize-id';
        toast.loading('recognizing...', { id });
        const worker = await workerRef.current;

        const ret = await worker.recognize(
            fileObjRef.current
            // 'https://tesseract.projectnaptha.com/img/eng_bw.png',
            // { rotateAuto: true },
            // { imageColor: true, imageGrey: true, imageBinary: true }
        );
        log.debug('res', ret);
        setText(ret.data.text);
        setRawHtml(ret.data.hocr);
        toast.success('success', { id });
    }

    function handleChange(info) {
        // if (info.file.status === 'uploading') {
        //     setLoading(true);
        //     return;
        // }
        // if (info.file.status === 'done') {
        //     // Get this url from response in real world.
        //     getBase64(info.file.originFileObj, url => {
        //         setLoading(false);
        //         setImageUrl(url);
        //     });
        // }
        // Get this url from response in real world.

        fileObjRef.current = info.file.originFileObj;

        getBase64(info.file.originFileObj).then(url => {
            setImageUrl(url as any);
        });
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {/* @ts-ignore */}
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            toast.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            toast.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    return (
        <div>
            <Typography.Title level={1}>OCR IN BROWSER</Typography.Title>
            <Divider></Divider>
            <Space wrap>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={file => Promise.resolve('')}
                    customRequest={() => 1}
                    // beforeUpload={}
                    onChange={handleChange}>
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <Button onClick={start}>recognize</Button>
            </Space>
            <Divider></Divider>
            <Space wrap>
                <Typography.Text mark>
                    <p dangerouslySetInnerHTML={{ __html: rawHtml }}></p>
                </Typography.Text>

                {text && (
                    <Typography.Text code copyable>
                        {text}
                    </Typography.Text>
                )}
            </Space>
        </div>
    );
}

function getBase64(img) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result as string));
        reader.readAsDataURL(img);
    });
}
