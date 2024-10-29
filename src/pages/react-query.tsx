import { useQuery } from '@tanstack/react-query';
import { Alert, Button, Space, Tag, Typography } from 'antd';
import classNames from 'classnames';
import { Facebook } from 'react-content-loader';
import ReactJson from 'react-json-view';

export default function ReactQuery() {
    return (
        <div>
            <Typography.Title level={2}>React Query In Action</Typography.Title>
            <User></User>
        </div>
    );
}

function User() {
    const user = useQuery({
        queryKey: ['user'],
        queryFn: (...args) => {
            console.log('query fn args', args);
            return fetch('https://randomuser.me/api')
                .then(res => res.json())
                .then(data => data.results[0]);
        },
    });
    console.log('user', user);
    if (user.isLoading) {
        return <Facebook></Facebook>;
    }
    return (
        <>
            <Typography.Title level={5}>User</Typography.Title>
            <Space direction="horizontal" size={'small'} wrap>
                {Object.keys(user).map(key =>
                    typeof user[key] === 'function' ? (
                        <Button key={key} onClick={user[key]}>
                            {key}
                        </Button>
                    ) : (
                        <Tag key={key} color="orange" onClick={() => console.log(user[key])}>
                            {key}
                        </Tag>
                    )
                )}
            </Space>
            <div className={classNames('text-left', user.isFetching ? 'opacity-50' : '')}>
                {user.isError && <Alert type="error" message={user.error?.toString()}></Alert>}
                <ReactJson name={false} displayObjectSize={false} displayDataTypes={false} src={user.data}></ReactJson>
            </div>
        </>
    );
}
