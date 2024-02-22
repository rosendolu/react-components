import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { Button, Divider, Form, InputNumber, List, Select, Space } from 'antd';
import log from 'loglevel';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useEffectOnce } from 'usehooks-ts';
import { execCommands } from './tools';

export default function FFmpegComponent() {
    const [loaded, setLoaded] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef: any = useRef(null);
    // @ts-ignore
    const runCommands = str => execCommands(ffmpegRef.current, str);
    useEffectOnce(() => {
        document.title = 'ffmpeg';
        const ffmpeg = ffmpegRef.current;
        globalThis.ffmpeg = ffmpeg;
        const log = (...args) => {
            console.log(`## log`, ...args);
        };
        ffmpeg.on('log', log);
        const progressLog = (...args) => {
            console.log(`## progress`, ...args);
        };
        ffmpeg.on('progress', progressLog);
        return () => {
            ffmpeg.off('log', log);
            ffmpeg.off('progress', progressLog);
        };
    });

    const load = async () => {
        const ffmpegVersion = form.getFieldValue('ffmpegVersion');
        let baseURL = '';
        switch (ffmpegVersion) {
            case '0.12.4':
                baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm';
                break;
            case '0.12.4 mt':
                baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.4/dist/esm';

                break;
        }
        const ffmpeg = ffmpegRef.current;
        // toBlobURL is used to bypass CORS issue, urls with the same
        // domain can be used directly.
        if (ffmpegVersion.endsWith('mt')) {
            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
                workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
            });
        } else {
            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });
        }
        setLoaded(true);
        toast.success('Load Successfully!');
    };

    async function convertVideoFormat(cur) {
        const prev = localPath(`output.${form.getFieldValue('videoType')}`);
        const commands = `-i ${prev} ${cur}`;
        await runCommands(commands);
    }

    async function downloadFile() {
        // const mp4 = `https://cdn.nnkosmos.com/test/video/11198/outputa.mp4`;
        const mp4 = `/1.mp4`;
        // const webm = `https://cdn.nnkosmos.com/test/avatar/4212/30s.webm`;
        const webm = `/output_320.webm`;
        // const webm = `http://localhost:5173/output.webm`;
        const ffmpeg = ffmpegRef.current;

        for (const url of [mp4, webm]) {
            const { base, dir, ext, name } = parsePath(url);
            await ffmpeg.writeFile(localPath(url), await fetchFile(url));
        }
        toast.success('downloadFile success');
    }

    async function readFile() {
        const fileName = form.getFieldValue('selectedFile');
        const ffmpeg = ffmpegRef.current;
        const data = await ffmpeg.readFile(fileName);
        log.debug('# readFile ', data);
        // @ts-ignore
        videoRef.current.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
        return;
    }

    const [dirList, setDirList] = useState<any[]>([]);
    async function listDir() {
        const ffmpeg = ffmpegRef.current;
        const data = await ffmpeg.listDir('/');
        setDirList(data);
        console.log('## dir', data);
    }

    async function deleteDir(dir = '/asserts') {
        const ffmpeg = ffmpegRef.current;
        const data = await ffmpeg.deleteDir(dir);
        await listDir();
    }

    async function createDir() {
        const ffmpeg = ffmpegRef.current;
        const data = await ffmpeg.createDir('/asserts');
        console.log('## createDir', data);
        toast.success('createDir success!');
    }

    async function videoToImage() {
        const fileName = form.getFieldValue('selectedFile');
        const command = `-i ${fileName} -v error -y -vf fps=${form.getFieldValue('fps')} output__%02d.png`;
        await runCommands(command);
    }
    async function fpsScaleImage() {
        const fileName = form.getFieldValue('selectedFile');
        const command = `-i ${fileName} -v error -y -vf fps=${form.getFieldValue('fps')},scale=100:-1 output__%02d.png`;
        await runCommands(command);
    }
    async function selectImage() {
        const fileName = form.getFieldValue('selectedFile');
        const command = `-i ${fileName} -v error -y -vf select=eq(n\\,0),crop=100:100 output__%02d.png`;
        await runCommands(command);
    }
    async function getMetadata() {
        const file = localPath(`output.${form.getFieldValue('videoType')}`);
        const command = `-v error -i ${file} -show_streams -show_format -print_format json`;
        await runCommands(command);
    }

    async function scale(width) {
        const file = localPath(`output.${form.getFieldValue('videoType')}`);
        const command = `-v error -i ${file} -y -vf scale=${width}:-1 output_w_${width}.${form.getFieldValue(
            'videoType'
        )}`;
        await runCommands(command);
    }

    const [form] = Form.useForm();
    const [selectImg, setSelectImg] = useState('');

    async function selectFile(file) {
        const ffmpeg = ffmpegRef.current;
        if (String(file).endsWith('jpg') || String(file).endsWith('png')) {
            const data = await ffmpeg.readFile(file);
            // @ts-ignore
            const { ext } = parsePath(file);
            // @ts-ignore
            const localUri = URL.createObjectURL(new Blob([data.buffer], { type: `image/${ext}` }));
            setSelectImg(localUri);
        }
    }

    async function crop(w, h) {
        const file = localPath(form.getFieldValue('selectedFile'));
        const { ext } = parsePath(file);
        const command = `-i ${file} -v error -y -vf crop=${w}:${h} output_crop_${ext}`;
        // const command = `-i ${file} -v error -y -vf crop=in_w/2:in_h/2:in_w/4:in_h/4 output_crop_${ext}}`;
        await runCommands(command);
    }

    async function selectFrames() {
        const file = localPath(form.getFieldValue('selectedFile'));
        const command = `-i ${file} -v error -y -vframes 1000 -vf scale=300:100 output_frame%02d.png`;
        await runCommands(command);
    }

    async function extract(ext): Promise<void> {
        const file = localPath(form.getFieldValue('selectedFile'));
        let command: any = [];
        if (ext == '.aac') {
            command = `-i ${file} -v error -y -vn -acodec copy output.aac`;
        } else if (ext == '.h264') {
            command = `-i ${file} -v error -vcodec copy -an output_1.h264`;
        }
        await runCommands(command);
    }

    return (
        <div className="p-4 text-center">
            <div>
                <Space direction="horizontal" style={{ height: '100%' }} wrap>
                    <video ref={videoRef} controls style={{ width: '300px', height: '300px' }}></video>
                    <List
                        size="small"
                        style={{ height: '300px', overflow: 'scroll' }}
                        bordered
                        dataSource={dirList}
                        renderItem={item => (
                            <List.Item
                                onClick={() => {
                                    selectFile(item.name);
                                    form.setFieldValue('selectedFile', item.name);
                                }}>
                                {item.name}
                                {/* <Typography.Text mark>{item.isDir ? '/' : ''}</Typography.Text> */}
                            </List.Item>
                        )}></List>

                    {selectImg && (
                        <img
                            src={selectImg}
                            alt=""
                            style={{ width: '300px', height: '300px' }}
                            className="object-contain"
                        />
                    )}
                </Space>
            </div>
            <Form form={form} layout="inline" initialValues={{ fps: 25, videoType: 'mp4' }} autoComplete="off">
                <Divider>Config</Divider>
                <Form.Item label="videoType" name="videoType">
                    <Select placeholder="Select Video Type">
                        <Select.Option value="mp4">mp4</Select.Option>
                        <Select.Option value="webm">webm</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="ffmpegVersion" name="ffmpegVersion">
                    <Select placeholder="Select ffmpegVersion">
                        <Select.Option value="0.12.4">0.12.4</Select.Option>
                        <Select.Option value="0.12.4 mt">0.12.4 mt</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="selectedFile" name="selectedFile">
                    <Select placeholder="Select File">
                        {dirList.map(item => {
                            return <Select.Option value={item.name}>{item.name}</Select.Option>;
                        })}
                    </Select>
                </Form.Item>
                <Divider>Load</Divider>
                <Space wrap>
                    <Button onClick={load}>Load ffmpeg-core (~31 MB)</Button>
                </Space>
                <Divider>File</Divider>
                <Space wrap>
                    <Button onClick={downloadFile}>download</Button>
                    <Button onClick={readFile}>readFile</Button>
                </Space>
                <Divider>Dir</Divider>
                <Space wrap>
                    <Button onClick={listDir}>listDir</Button>
                    <Button onClick={createDir}>createDir</Button>
                    {/* @ts-ignore */}
                    <Button onClick={deleteDir}>deleteDir</Button>
                </Space>
                <Divider>ffprobe ❌</Divider>
                <Space wrap>
                    <Button onClick={getMetadata}>stream & format</Button>
                </Space>
                <Divider>Video Format</Divider>
                <Space wrap size={'small'}>
                    <Button onClick={() => convertVideoFormat('output.webm')}>to webm ❌</Button>
                    <Button onClick={() => convertVideoFormat('output.mp4')}>to mp4</Button>
                    <Button onClick={() => scale(100)}>scale w100</Button>
                    <Button onClick={() => scale(1080)}>scale w 1080</Button>
                    <Button onClick={() => crop(200, 100)}>crop</Button>
                </Space>
                <Divider>Video To Image</Divider>
                <Space>
                    <Form.Item label="fps" name="fps">
                        <InputNumber />
                    </Form.Item>
                </Space>
                <Divider></Divider>
                <Space wrap>
                    <Button onClick={() => videoToImage()}>fps</Button>
                    <Button onClick={() => fpsScaleImage()}>fps+scale</Button>
                    <Button onClick={() => selectImage()}>select</Button>
                    <Button onClick={() => selectFrames()}>vframes</Button>
                </Space>

                <Divider>Extract</Divider>
                <Space wrap>
                    <Button onClick={() => extract('.aac')}>audio</Button>
                    <Button onClick={() => extract('.h264')}>h264</Button>
                </Space>
            </Form>
        </div>
    );
}

function localPath(url) {
    const { base, dir, ext, name } = parsePath(url);
    return `output${ext}`;
}
function parsePath(filePath = '', separator = '/') {
    const parts = filePath.split(separator);
    const fileName = parts.pop() as string;
    const dir = parts.join(separator);
    const lastDotIndex = fileName.lastIndexOf('.');
    const ext = lastDotIndex !== -1 ? fileName.slice(lastDotIndex) : '';
    const name = lastDotIndex !== -1 ? fileName.slice(0, lastDotIndex) : fileName;

    return {
        root: '',
        dir,
        base: fileName,
        ext,
        name,
    };
}
