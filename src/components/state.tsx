import { Button, Divider, Space, Typography } from 'antd';
import { createStore, useStore } from '../hooks/store';

// 使用状态管理工具
const store = createStore({ count: 0 });

function Counter() {
    const count = useStore(store, state => state.count);

    return (
        <div>
            <Typography.Title>simple zustand style state manager</Typography.Title>
            <Divider></Divider>
            <p>{count}</p>
            <Space>
                <Button onClick={() => store.setState(state => ({ count: state.count + 1 }))}>Increment</Button>
                <Button onClick={() => store.setState(state => ({ count: state.count - 1 }))}>Decrement</Button>
            </Space>
        </div>
    );
}

export default Counter;
