import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes';

export default function App() {
    return (
        <div className="p-2 text-center">
            <RouterProvider router={router}></RouterProvider>
        </div>
    );
}
