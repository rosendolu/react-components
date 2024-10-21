import { IConversationModel } from '@tencentcloud/chat-uikit-engine';
import React from 'react';
import { AvatarProps, Avatar as DefaultAvatar } from '../../Avatar';
import {
    ConversationPreview as DefaultConversationPreview,
    IConversationPreviewProps,
} from '../../ConversationPreview';
import { PlaceHolder, PlaceHolderTypes } from '../../PlaceHolder';

import './ConversationSearchResult.scss';

interface IConversationSearchResultProps {
    /** Whether to show the search result */
    visible?: boolean;
    /** The search result */
    searchResult?: IConversationModel[];
    /** The search input value */
    searchValue?: string;
    /** The custom ResultPreview component */
    ResultPreview?: React.ComponentType<IConversationPreviewProps>;
    /** The custom Avatar component */
    Avatar?: React.ComponentType<AvatarProps>;
    /** The custom no result Placeholder component */
    PlaceholderNoResult?: React.ReactNode;
    /**  Callback when the ResultPreview is clicked */
    onSelectResult?: (conversation: IConversationModel) => void;
    /** The custom class name */
    className?: string;
    /** The custom css style */
    style?: React.CSSProperties;
}

function ConversationSearchResult(props: IConversationSearchResultProps) {
    const {
        visible = false,
        searchResult,
        searchValue,
        Avatar = DefaultAvatar,
        ResultPreview = DefaultConversationPreview,
        PlaceholderNoResult = <PlaceHolder type={PlaceHolderTypes.NO_RESULTS} searchString={searchValue} />,
        onSelectResult,
        className,
        style,
    } = props;

    if (!visible) {
        return null;
    }

    return (
        <div>
            {searchResult?.length === 0
                ? PlaceholderNoResult
                : searchResult?.map(item => (
                      <ResultPreview
                          key={item.conversationID}
                          conversation={item}
                          Avatar={Avatar}
                          highlightMatchString={searchValue}
                          onSelectConversation={onSelectResult}
                      />
                  ))}
        </div>
    );
}

export { ConversationSearchResult, IConversationSearchResultProps };
