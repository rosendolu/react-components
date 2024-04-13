import { LoadingOutlined } from '@ant-design/icons';
import { Suspense } from 'react';
import './App.css';
import RouterElements from './routes';

export default function App() {
    return (
        <div className="p-2 text-center">
            {/* @ts-ignore */}
            <Suspense fallback={<LoadingOutlined />}>
                <RouterElements></RouterElements>
            </Suspense>
        </div>
    );
}
