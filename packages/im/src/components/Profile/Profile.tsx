import React, { PropsWithChildren } from 'react';
import ReactJson from 'react-json-view';
import { MyProfile } from './myProfile/index';

import { Divider } from 'antd';
import { useUIManager } from '../../context';
import { useMyProfile } from './hooks';
import { TUIProfileDefault } from './ProfileDefault';
import './styles/index.scss';

interface TUIProfileProps {
    className?: string;
    TUIProfile?: React.ComponentType<any>;
}

function UnMemoizedProfile<T extends TUIProfileProps>(props: PropsWithChildren<T>): React.ReactElement {
    const { className, TUIProfile: PropTUIProfile } = props;

    const { myProfile, updateMyProfile } = useMyProfile();

    const { setTUIProfileShow, TUIProfileShow } = useUIManager('TUIProfile');

    const TUIProfileUIComponent = PropTUIProfile || TUIProfileDefault;

    return (
        <>
            <div onClick={() => setTUIProfileShow(val => !val)}>
                <MyProfile
                    profile={myProfile}
                    handleAvatar={() => {
                        setTUIProfileShow(val => !val);
                    }}
                />
            </div>
            {TUIProfileShow && false && (
                <TUIProfileUIComponent className={className} userInfo={myProfile} update={updateMyProfile} />
            )}

            {TUIProfileShow && (
                <>
                    <Divider>Profile Json</Divider>
                    <ReactJson
                        name={null}
                        src={myProfile!}
                        sortKeys
                        displayDataTypes={false}
                        displayObjectSize={true}
                        theme={'monokai'}
                        style={{ textAlign: 'left' }}></ReactJson>
                    {/* <Typography.Text code copyable>
                    </Typography.Text> */}
                </>
            )}
        </>
    );
}

export const Profile = React.memo(UnMemoizedProfile) as typeof UnMemoizedProfile;
