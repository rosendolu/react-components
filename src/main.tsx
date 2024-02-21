import { Typography } from 'antd';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import log from 'loglevel';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './routes';
dayjs.extend(duration);
log.setLevel('trace');
globalThis.log = log;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Toaster />
        <RouterProvider router={router}></RouterProvider>
        <div className="h-12"></div>
        <footer className="fixed bottom-0 left-0 right-0 flex h-12 items-center justify-center bg-slate-500">
            <Typography.Text italic>
                Powered by{' '}
                <Typography.Link href="https://github.com/rosendolu" target="_blank">
                    rosendolu
                </Typography.Link>
            </Typography.Text>
        </footer>
    </React.StrictMode>
);
