import { Button, Space } from 'antd';
import { useEffectOnce } from 'usehooks-ts';
import wasmModule from '../../../public/wasm/hello';
const wasmURI = '/wasm/hello.wasm';

export default function WebAssemblyPage() {
    useEffectOnce(() => {
        // Module.onRuntimeInitialized = function () {
        //     debugger;
        //     Module._echo(); // Call the exported function
        // };
    });

    async function echo(event) {
        await wasmModule.ready;
        wasmModule._echo();
    }

    return (
        <div>
            <Space wrap>
                <Button onClick={echo}>echo</Button>
            </Space>
        </div>
    );
}
