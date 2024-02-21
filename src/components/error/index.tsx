import { Button } from 'antd';
import log from 'loglevel';

export default function ErrorHandle() {
    async function submit_promise() {
        try {
            await Promise.reject('xxx');
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve(2);
                    log.debug('resolve step1');
                }, 1e3);
            });
            log.debug('step1');
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('0');
                    log.error('reject', 'step2');
                }, 1e3);
            });
            log.debug('step2');
        } catch (error) {
            debugger;
            log.error('err', error);
        } finally {
            log.debug('end');
        }
    }
    async function submit_throw() {
        try {
            let stepRes = await new Promise(resolve => {
                setTimeout(() => {
                    resolve(2);
                    log.debug('resolve step1');
                }, 1e3);
            });
            log.debug('step1');
            stepRes = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(0);
                    log.error('reject', 'step2');
                }, 1e3);
            });
            if (!stepRes) {
                throw 'step2 failed';
                // throw new Error('step2 failed');
            }
            log.debug('step2');
        } catch (error) {
            debugger;
            log.error('err', error, JSON.stringify(error));
        } finally {
            log.debug('end');
        }
    }

    return (
        <div>
            <header className="fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-center ">
                <Button onClick={submit_promise}>promise based submit</Button>
                <Button onClick={submit_throw}>throw based submit</Button>
            </header>
            <div className="pb-16 pt-16"></div>
        </div>
    );
}
