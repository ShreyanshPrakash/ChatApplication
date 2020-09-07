import React from 'react';
import {
    Avatar, Grid, CardContent, Card,
} from '@material-ui/core';

import styled from 'styled-components';

const UserChatWrapper = styled.div`

    max-width: ${ props => props.fullWidth ? "100%" : "100%"};

    .userChatWrapper {
        flex-wrap: nowrap;
    }

    .avatar{
        width: 32px;
        height: 32px;    
    }

    .userName {
        font-size: 18px;
        line-height: 32px;
        padding-left: 13px;
        color: #2A2A2A;

        text-overflow: ellipsis;
        overflow: hidden;
        // line-height: 24px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

`



export function UserChatComponent({
    fullWidth,
    avatarSrc = "",
    avatarAlt = "",
    title = "USername sdad  dsa dsa"
}) {


    return (
        <React.Fragment>
            <UserChatWrapper fullWidth={fullWidth}>
                <Card>
                    <CardContent>
                        <Grid container className="userChatWrapper">
                            <Grid item className="userAvatar">
                                <Avatar
                                    className="avatar"
                                    alt={avatarSrc}
                                    src={avatarSrc}
                                ></Avatar>
                            </Grid>
                            <Grid item className="userName">
                                {title}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </UserChatWrapper>
        </React.Fragment>
    )
}