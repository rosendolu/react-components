import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

function log(...args) {
    console.log('child A:', ...args);
}

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}

let root: any = null;
function initRoot(container?: string) {
    if (!root) {
        // @ts-ignore
        root = createRoot(container?.querySelector('#root'));
    }
    return root;
}

export function bootstrap() {
    log('bootstrap');
}

export function mount(props: any) {
    render(props.container);
    log('mount', props);
    // @ts-ignore
    window.__micro_app_react = props;
    props.onGlobalStateChange((state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        console.log(state, prev);
    });
}

function render(container?: string) {
    const root = initRoot(container);
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}

export function unmount(props) {
    const root = initRoot();
    root.unmount();
    log('unmount', props);
}

export function update(props) {
    log('update props', props);
}

// @ts-ignore
window.micro_app_child_react = {
    bootstrap: () => {
        console.log('react child app bootstrap');
        return Promise.resolve();
    },
    mount: mount,
    unmount: unmount,
    update: update,
};
