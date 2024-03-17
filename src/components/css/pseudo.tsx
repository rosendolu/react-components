import { Space } from 'antd';
import classNames from 'classnames';
import Style from './style.module.css';

export default function PseudoElements() {
    return (
        <Space wrap>
            <div className={classNames(Style.parent)}>pseudo ::after</div>
        </Space>
    );
}
