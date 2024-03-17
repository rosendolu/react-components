import { Button, Space } from 'antd';
import log from 'loglevel';
import toast from 'react-hot-toast';

export default function ErrorHandle() {
    function assert(expression, msg) {
        if (!expression) {
            throw new Error(msg);
        }
    }

    async function submit_promise() {
        const toastId = 'xxxx';
        try {
            toast.loading('1....', { id: toastId });
            let res = 0;
            // step 1
            // always resolve operation code (unix)
            res = await step1(res);
            assert(res, '无效地址');

            // reject error
            res = await step2(100);
            // async task

            step3(2).catch(err => assert(false, 'async error '));
            step3(2).catch(err => assert(false, 'async error '));

            toast.success('successfully', { id: toastId });
        } catch (error) {
            debugger;
            toast.error('error xxx', { id: toastId });
            log.error('err', error);
        } finally {
            // cleanup
            log.debug('end');
        }
    }

    async function step1(res: number) {
        res = await new Promise(resolve => {
            setTimeout(() => {
                resolve(2);
                log.debug('resolve step1');
            }, 1e3);
        });
        return res;
    }
    async function step2(res: number) {
        res = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(2);
                log.debug('resolve step2');
            }, 1e3);
        });
        return res;
    }
    async function step3(res: number) {
        res = await new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(2);
                log.debug('reject step3');
            }, 1e3);
        });
        return res;
    }

    async function submit_throw() {
        try {
            let res = 0;
            // step 1
            // always resolve
            res = await step1(res);

            // Bad

            // if (!res) return;

            // if (!res) {
            //     throw new Error('xxx')
            // }

            // Good
            assert(res, 'xxx');

            // reject error
            res = await step2(100);

            // async task
            step3(2).catch(err => {
                // xxxx
            });

            // finished
        } catch (error) {
            log.error('err', error);
        } finally {
            // cleanup
            log.debug('end');
        }
    }

    return (
        <Space wrap>
            <Button onClick={submit_promise}>promise based submit</Button>
            <Button onClick={submit_throw}>throw based submit</Button>
        </Space>
    );
}
