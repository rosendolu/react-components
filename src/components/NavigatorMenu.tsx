import { Button, Space } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RouterMenuContext } from '../helpers/context';

export function NavigatorMenu() {
    const conf: any = useContext(RouterMenuContext);
    return (
        <Space wrap size={'small'}>
            {conf.map(val => {
                return (
                    <Link to={val.path} key={val.path}>
                        <Button size="middle" type="link">
                            {val.label || val.path}
                        </Button>
                    </Link>
                );
            })}
        </Space>
    );
}
