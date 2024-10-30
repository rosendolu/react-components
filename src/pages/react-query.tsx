import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Alert, Button, Space, Tag, Typography } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { Facebook } from 'react-content-loader';
import ReactJson from 'react-json-view';

export default function ReactQuery() {
    return (
        <div>
            <Typography.Title level={2}>React Query In Action</Typography.Title>
            <PaginatedQuery></PaginatedQuery>
            <User></User>
        </div>
    );
}

function PaginatedQuery() {
    const [page, setPage] = React.useState(0);

    const fetchProjects = (page = 0) =>
        fetch(`https://randomuser.me/api?q=${page}`)
            .then(res => res.json())
            .then(res => ((res.hasMore = true), res));

    const { isPending, isLoading, isRefetching, isError, error, data, isFetching, isPlaceholderData } = useQuery({
        queryKey: ['projects', page],
        queryFn: () => fetchProjects(page),
        placeholderData: keepPreviousData,
    });

    return (
        <div>
            {isPending ? <div>Loading...</div> : isError ? <div>Error: {error.message}</div> : <div>data</div>}
            <span>Current Page: {page + 1}</span> <br />
            <Button onClick={() => setPage(old => Math.max(old - 1, 0))} disabled={page === 0}>
                Previous Page
            </Button>
            <Button
                onClick={() => {
                    if (!isPlaceholderData && data.hasMore) {
                        setPage(old => old + 1);
                    }
                }}
                // Disable the Next Page button until we know a next page is available
                disabled={isPlaceholderData || !data?.hasMore}>
                Next Page
            </Button>
            {isFetching ? <span> Loading...</span> : null}
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
                {user.isError && <Alert closable type="error" message={user.error?.toString()}></Alert>}
                <ReactJson name={false} displayObjectSize={false} displayDataTypes={false} src={user.data}></ReactJson>
            </div>
        </>
    );
}
