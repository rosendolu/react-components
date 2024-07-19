import { Typography } from 'antd';
import classNames from 'classnames';
import { NavigatorMenu } from '../NavigatorMenu';
export default function Index() {
    return (
        <div className={classNames('text-center', 'p-2')}>
            <Typography.Title level={2}>canvas</Typography.Title>

            <NavigatorMenu></NavigatorMenu>
        </div>
    );
}
