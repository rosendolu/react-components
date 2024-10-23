import './App.css';
export default function App() {
    function setFn() {
        // @ts-ignore
        window.__micro_app_react?.setGlobalState({ count: Math.random() });
        console.log('click from micro react app');
    }
    return (
        <>
            <div>micro child react app</div>
            <div className="react-content"> content </div>
            <button type="button" className="bg-slate-200" onClick={setFn}>
                submit
            </button>
        </>
    );
}
