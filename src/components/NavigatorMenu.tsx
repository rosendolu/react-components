import { Button, Space } from 'antd';
import log from 'loglevel';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RouterMenuContext } from '../helpers/context';

export function NavigatorMenu() {
    const conf: any = useContext(RouterMenuContext);
    // const match = useMatches();
    let location = useLocation();
    const [list, setList] = useState(conf);

    useEffect(() => {
        log.info('location', location, conf);
        const subRoute = conf.find(item => item.path === location.pathname);
        if (location.pathname !== '/' && subRoute) {
            setList(subRoute.children);
        }
    }, [location]);
    return (
        <Space wrap size={'small'}>
            {list.map((val, i) => {
                return (
                    <Link to={val.path} key={i}>
                        <Button size="middle" type="link">
                            {val.label || val.path}
                        </Button>
                    </Link>
                );
            })}
        </Space>
    );
}
