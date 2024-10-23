import { createHashRouter, Link, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import Style from './App.module.css';

const router = createHashRouter(
    [
        {
            path: '/',

            element: <BaseRoute></BaseRoute>,
            children: [
                {
                    index: true,
                    element: <div>Hello!</div>,
                },
                {
                    path: 'hi',
                    element: <div className={Style.pink}>Hi there!</div>,
                },
            ],
        },
    ],
    { basename: '/react' }
);

function BaseRoute() {
    return (
        <>
            <p className="p-2">
                <Link to={'/'}>Hello</Link> | <Link to={'/hi'}>Hi</Link>
            </p>
            <details open>
                <summary>child app router content</summary>
                <Outlet></Outlet>
            </details>
        </>
    );
}

export default function App() {
    function setFn() {
        // @ts-ignore
        window.__micro_app_react?.setGlobalState({ count: Math.random() });
        console.log('click from micro react app');
    }
    return (
        <>
            <div>micro child react app</div>
            <div className="react-content"> css from index.css </div>
            <div style={{ background: 'red' }}> css from inline css </div>
            <button type="button" className="bg-slate-200" onClick={setFn}>
                submit
            </button>
            <br />
            <RouterProvider router={router} />
        </>
    );
}
