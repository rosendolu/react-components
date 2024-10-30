import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import log from 'loglevel';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';
dayjs.extend(duration);
log.setLevel('trace');
globalThis.log = log;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1e3 * 60 * 5,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App></App>
            <Toaster />
            <div className="h-12"></div>
            <Copyright></Copyright>

            <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        </QueryClientProvider>
    </React.StrictMode>
);

function Copyright() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 flex h-12 items-center justify-center bg-slate-500">
            <Typography.Text italic>
                Powered by{' '}
                <Typography.Link href="https://github.com/rosendolu" target="_blank">
                    rosendolu
                </Typography.Link>
            </Typography.Text>
        </footer>
    );
}
