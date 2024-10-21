import { useTranslation } from 'react-i18next';
import { Icon, IconTypes } from '../../Icon';
// import { Input, InputProps } from '../../Input';
import classNames from 'classnames';
import { InputProps } from '../../Input';

import { Input } from 'antd';
import './ConversationSearchInput.scss';

type IConversationSearchInputProps = InputProps;

function ConversationSearchInput(props) {
    const {
        className,
        placeholder,
        clearable,
        value,
        onChange,
        prefix = <Icon type={IconTypes.SEARCH} height={16} width={16} />,
        onFocus,
        onBlur,
    } = props;
    const { t } = useTranslation();
    return (
        <Input
            className={classNames(className)}
            placeholder={placeholder || 'Typing Conversation Name To Search'}
            allowClear={clearable}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            prefix={prefix}
        />
    );
}

export { ConversationSearchInput, IConversationSearchInputProps };
