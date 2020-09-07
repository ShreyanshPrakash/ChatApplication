import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import {
    UserChatComponent,
    ScrollPanelComponent,
    ChatBarComponent,
} from 'src/re-useComponents';
import { 
    Grid 
} from '@material-ui/core';
import styled from 'styled-components';

const ChatPageWrapper = styled.div`


    overflow-x: hidden;

    .chatContainer {
        margin: 24px auto;
        padding: 0px 24px;
    }

    .chatContainer {
        height: 100vh;
    }

    .chatPanelWrapper {
        height: 100%;
        position: relative;

        .chatPanelContainer {
            // position: relative;

            .chatBar {
                position: absolute;
                bottom: 16px;
            }
        }
    }

`

export function ChatComponent() {

    const [socketConnection, setSocketConnection] = useState({});
    const [usersList, setUsersList] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [image, setImage] = useState("");

    useEffect(() => {

        const socket = io.connect(`http://localhost:4200`);
        socket.on('connect', _ => {

            setSocketConnection(socket);

            socket.emit(
                'message',
                {
                    name: "Shreyansh",
                    data: "something",
                }
            )

            socket.emit('checkStatus');

            socket.on('message', msg => {
                console.log(msg);
                if (msg.type === "checkStatus") {
                    setUserInfo(msg);
                }
                if (msg.type === "usersList") {
                    setUsersList(msg.data);
                    console.log(userInfo);
                    socket.emit("sendMessageTo", {
                        from: userInfo.id,
                        to: msg.data[0]
                    })
                }
                if (msg.type === "image") {
                    setImage(msg.image);
                }
            });

            socket.emit("listUsers");

        });


    }, [])



    const handleImageChange = (event) => {
        // let fileType = event.target.files[0].type.split("/")[0];
        // if (event.target.files[0] && event.target.files[0].type.split("/")[0] === "image") {
            let imageName = event.target.files[0].name;
            let imageData = "";

            const fileReader = new FileReader();
            fileReader.readAsDataURL(event.target.files[0]);
            fileReader.onload = (e) => {
                imageData = e.target.result;

                socketConnection.emit(
                    'sendImageTo',
                    {
                        from: userInfo.id,
                        to: usersList[0],
                        data: imageData,
                        name: imageName,
                    }
                )
                
            };
        // }
        // Maybe show a message for no-compatible file types ?
    }


    return (
        <React.Fragment>
            <ChatPageWrapper>

                <Grid container spacing={2} className="chatContainer">
                    <Grid item xs={3} className="usersList">
                        <ScrollPanelComponent
                            maxHeight="240px"
                        >

                            {
                                ["John","Michael","Some random name"].map((user,index) => {
                                    return(
                                        <React.Fragment>
                                            <UserChatComponent
                                                fullWidth
                                                title={user}
                                            />
                                        </React.Fragment>
                                    )
                                })
                            }


                        </ScrollPanelComponent>
                    </Grid>
                    <Grid item xs={9} className="chatPanelWrapper">
                        <Grid container className="chatPanelContainer">
                            <Grid item xs={12} className="chatPanel">
                                <ScrollPanelComponent height="500px"/>
                            </Grid>
                            <Grid item xs={12} className="chatBar">
                                <ChatBarComponent />
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>


            </ChatPageWrapper>

            {/* <input
                type="file"
                accept="image/*"
                className="button"
                onChange={handleImageChange}
            />
            {
                image &&
                <img src={image} alt="image" />
            } */}
            {/* <UserChatComponent/> */}
        </React.Fragment>

    )
}