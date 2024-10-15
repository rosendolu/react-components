import { LoadingOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { Suspense } from 'react';
import './App.css';
import Debug from './components/debug';
import RouterElements from './routes';

export default function App() {
    return (
        <div className="p-2 text-center">
            <Debug></Debug>
            <Divider></Divider>
            {/* @ts-ignore */}
            <Suspense fallback={<LoadingOutlined />}>
                <RouterElements></RouterElements>
            </Suspense>
        </div>
    );
}
