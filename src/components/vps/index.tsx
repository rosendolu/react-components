import { Space, Typography } from 'antd';
import { Form } from 'react-router-dom';
import { baseURL } from '../../helpers/constant';

export default function VpsComponents() {
    function login() {
        const userInfo = fetch(`${baseURL}/user/login`).then(res => res.json());
    }
    return (
        <div>
            <Typography.Title level={2}>VPS Server Control</Typography.Title>
            <Space wrap direction="horizontal"></Space>
            <Form></Form>
        </div>
    );
}
