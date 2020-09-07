import React from 'react';

import styled from 'styled-components';
import {
    Grid, TextField, InputAdornment, IconButton, Button,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AttachmentIcon from '@material-ui/icons/Attachment';

const ChatBarWrapper = styled.div`

    .button {
        display: none;
    }

    .textFieldSearch {

        .MuiFilledInput-root {
            border-radius: 100px;
            box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
            background-color: #fff;
        }

        .MuiInputAdornment-root:last-child {
            padding-left: 12px;
        }
                                        
        .MuiFilledInput-underline:after {
            display: none;
        }
        .MuiFilledInput-underline:before {
            display: none;
        }

        .MuiInputAdornment-root:last-child {
            padding-left: 12px;
        }

        .MuiFilledInput-input {
            padding: 16px 0px;
            padding-left: 20px;
        }
    }


`


export function ChatBarComponent({

}) {


    const handleImageChange = (event) => {
        // let fileType = event.target.files[0].type.split("/")[0];
        // if (event.target.files[0] && event.target.files[0].type.split("/")[0] === "image") {
            let imageName = event.target.files[0].name;
            let imageData = "";
            console.log("Hello");

            const fileReader = new FileReader();
            fileReader.readAsDataURL(event.target.files[0]);
            fileReader.onload = (e) => {
                imageData = e.target.result;

                // socketConnection.emit(
                //     'sendImageTo',
                //     {
                //         from: userInfo.id,
                //         to: usersList[0],
                //         data: imageData,
                //         name: imageName,
                //     }
                // )
                
            };
        // }
        // Maybe show a message for no-compatible file types ?
    }


    return (
        <React.Fragment>
            <ChatBarWrapper>
                <Grid container className="chatBarContainer">
                    <Grid item xs={12} className="userInput">
                        <TextField
                            variant="filled"
                            fullWidth
                            placeholder="Send a message"
                            autoComplete="off"
                            // label="Search for your area or locality"
                            classes={{
                                root: "textFieldSearch"
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <Button>
                                            <AttachmentIcon color="primary" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="button"
                                                onChange={handleImageChange}
                                            />
                                        </Button>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    {/* <Grid item className="button">
                        <IconButton>

                        </IconButton>
                    </Grid> */}
                </Grid>
            </ChatBarWrapper>
        </React.Fragment>

    )
}