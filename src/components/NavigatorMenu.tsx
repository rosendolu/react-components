import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';

export function NavigatorMenu({ conf }) {
    return (
        <Space wrap size={'small'}>
            {conf.map(val => {
                return (
                    <Link to={val.to} key={val.to}>
                        <Button size="middle" type="link">
                            {val.label}
                        </Button>
                    </Link>
                );
            })}
        </Space>
    );
}
