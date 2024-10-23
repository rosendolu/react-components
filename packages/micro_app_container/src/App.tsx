import { loadMicroApp } from 'qiankun';

export default function App() {
    function loadChildApp(appName: string): void {
        loadMicroApp({
            name: appName,
            entry: '//localhost:5175',
            container: '#html',
        });
    }

    return (
        <div className="text-center">
            <header>
                <h1 className="">Micro Container</h1>
            </header>
            <main className="flex h-[80vh] items-stretch justify-start text-center">
                <section className="flex-1 text-center outline-dashed">
                    <h6 className="">child A</h6>
                    <p className="react-content">react-content from parent</p>
                    <div id="react"></div>
                </section>
                <section className="flex-1 outline-dashed">
                    <h6 className="h-6">child B</h6>
                    <button className="bg-slate-200 p-2" type="button" onClick={() => loadChildApp('micro_app_html')}>
                        load child B html app
                    </button>
                    <div id="html"></div>
                </section>
            </main>
            <footer>footer</footer>
        </div>
    );
}
