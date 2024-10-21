import {
    Chat,
    ChatHeader,
    ChatSetting,
    Contact,
    ContactInfo,
    ConversationList,
    MessageInput,
    MessageList,
    Profile,
    UIKitProvider,
} from 'im';
import { useEffect, useState } from 'react';

import { StoreName, TUIConversationService, TUIStore } from '@tencentcloud/chat-uikit-engine';
import { TUILogin } from '@tencentcloud/tui-core';
//   import { TUICallKit, TUICallKitServer } from '@tencentcloud/call-uikit-react';
import { Tabs, Typography } from 'antd';
import log from 'loglevel';
import { genTestUserSig } from './.local/GenerateTestUserSig';

const tabbarList = [
    {
        id: '1',
        label: 'chats',
        key: 'chats',
    },
    {
        id: '2',
        label: 'contacts',
        key: 'contacts',
    },
];

let initState = 0;
export default function IM({ loginUserID }) {
    const [moduleValue, setModuleValue] = useState('chats');
    const [currentConversationID, setCurrentConversationID] = useState<string>('');

    useEffect(() => {
        TUIStore.watch(StoreName.APP, {
            tasks: onTasksUpdated,
        });
        TUIStore.watch(StoreName.CONV, {
            currentConversationID: onCurrentConversationID,
        });
        return () => {
            TUIStore.unwatch(StoreName.CONV, {
                currentConversationID: onCurrentConversationID,
            });
        };
    }, []);

    function onTasksUpdated(tasks: Record<string, boolean>) {
        // if (tasks.sendMessage) {
        //   reportEvent({ actionKey: REPORT_KEY.SEND_FIRST_MESSAGE });
        // }
    }
    const init = async () => {
        const randomUser = await fetch('https://randomuser.me/api/')
            .then(res => res.json())
            .then(data => data.results[0]);

        globalThis.user = randomUser;
        const userID = randomUser.login?.username || loginUserID || `user-${Math.ceil(Math.random() * 10000)}`;
        // const userID = 'rosendo';
        const loginInfo: any = {
            SDKAppID: genTestUserSig(userID).SDKAppID,
            userID,
            userSig: genTestUserSig(userID).userSig,
            useUploadPlugin: true,
        };
        TUILogin.login(loginInfo)
            .then((res: any) => {
                createChat();
            })
            .catch(() => {});
    };

    useEffect(() => {
        if (initState) return;
        initState = 1;
        init();
    }, []);

    async function createChat() {
        // 1v1 chat: conversationID = `C2C${userID}`
        // group chat: conversationID = `GROUP${groupID}`
        // const userID = `rosendo`; // userID: Recipient of the Message userID, Get it from Step 5
        // const userID = `user-$${(Math.random() * Date.now()).toString(16).slice(0, 8)}`; // userID: Recipient of the Message userID, Get it from Step 5
        const userID = 'administrator';
        const conversationID = `C2C${userID}`;
        // const conversationID = `GROUP${userID}`;
        await TUIConversationService.getConversationProfile(conversationID);
    }

    const onCurrentConversationID = (conversationID: string) => {
        log.debug('# conversation id:', conversationID);
        setCurrentConversationID(conversationID);
    };

    const switchTabbar = (value: string) => {
        setModuleValue(value);
        TUIConversationService.switchConversation('');
    };

    const callButtonClicked = (callMediaType?: number) => {
        if (callMediaType === 2) {
        } else {
        }
    };

    return (
        <div className="sample-demo">
            <Typography.Title>My Chat App</Typography.Title>
            <div className="sample-chat">
                <UIKitProvider language={'en'} theme={'light'}>
                    {/* <TUICallKit style={callStyle} /> */}
                    <Profile className="sample-chat-profile" />
                    <Tabs
                        // type="card"
                        defaultActiveKey="chats"
                        centered
                        onChange={key => setModuleValue(key)}
                        items={tabbarList}></Tabs>

                    {moduleValue === 'chats' && <ConversationList />}
                    {moduleValue === 'contacts' && <Contact />}
                    {moduleValue === 'chats' && (
                        <>
                            <Chat callButtonClicked={callButtonClicked}>
                                <ChatHeader enableCall={true} />
                                <MessageList />
                                <MessageInput />
                            </Chat>
                            <ChatSetting />
                        </>
                    )}
                    {moduleValue === 'contacts' && (
                        <Contact>
                            <ContactInfo
                                showChats={() => {
                                    setModuleValue('chats');
                                }}></ContactInfo>
                        </Contact>
                    )}
                </UIKitProvider>
            </div>
        </div>
    );
}
