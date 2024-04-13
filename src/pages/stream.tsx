import { Divider, Form, Radio, Typography } from 'antd';
import log from 'loglevel';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useEffectOnce } from 'usehooks-ts';

export default function Stream() {
    const [data, setData] = useState<any[]>([]);
    const [form]: any = Form.useForm();

    const onFormValueChange = form => {
        log.info('form', form);
        setData([]);
        getData(form.responseType);
    };

    const requestRef = useRef(false);
    useEffectOnce(() => {
        if (requestRef.current) return;
        requestRef.current = true;
        getData(form.getFieldValue('responseType'));
    });

    async function getData(responseType) {
        const toastID = 'fetch-toast';
        toast.loading('loading...', { id: toastID });
        fetch(`https://api.rosendo.fun/res/stream/${responseType}`)
            .then(response => response.body)
            .then(body => {
                const reader = body!.getReader();

                return pump();
                function pump() {
                    return reader.read().then(({ done, value }) => {
                        // When no more data needs to be consumed, close the stream
                        if (done) {
                            log.info('chunk done');
                            return;
                        }
                        log.debug('progress done:', done);
                        // Process the chunk (e.g., parse JSON)
                        const chunk = new TextDecoder().decode(value);
                        let res = '';
                        try {
                            res = JSON.parse(chunk);
                        } catch (error) {
                            res = chunk;
                        }
                        log.info('Received chunk:', res);
                        setData(data => data.concat(res));
                        // Continue reading next chunk recursively
                        return pump();
                    });
                }
            })
            .catch(err => {
                log.error('err', err);
            })
            .finally(() => {
                toast.dismiss(toastID);
            });
    }
    return (
        <div>
            <Typography.Title>Http Stream Response</Typography.Title>
            <Form
                layout={'horizontal'}
                form={form}
                style={{ maxWidth: 300 }}
                initialValues={{ responseType: 'json' }}
                onValuesChange={onFormValueChange}>
                <Form.Item label="Response type" name="responseType">
                    <Radio.Group>
                        <Radio.Button value="text">text</Radio.Button>
                        <Radio.Button value="json">json</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
            <Divider>Response data</Divider>
            {data.map((item, i) => (
                <p key={i}>
                    {typeof item == 'string' ? (
                        <Typography.Text>{item}</Typography.Text>
                    ) : (
                        <Typography.Text code>{JSON.stringify(item, null, 2)}</Typography.Text>
                    )}
                </p>
            ))}
        </div>
    );
}
