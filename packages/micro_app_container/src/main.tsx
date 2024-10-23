import { initGlobalState, MicroAppStateActions, registerMicroApps, start } from 'qiankun';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// @ts-ignore
window.__POWERED_BY_QIANKUN__ = 1;
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);

registerMicroApps([
    {
        name: 'micro_app_child_react', // app name registered
        // entry: '//localhost:5174',
        entry: '//localhost:5174/',
        container: '#react',
        activeRule: '/react',
    },
    {
        name: 'micro_app_html', // app name registered
        // entry: '//localhost:5174',
        entry: '//localhost:5175/',
        container: '#html',
        activeRule: '/html',
    },
]);

start();

// 初始化 state
const actions: MicroAppStateActions = initGlobalState({ count: 0 });

actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
});
// actions.setGlobalState(state);
