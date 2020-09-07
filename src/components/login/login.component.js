import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
    Card, Grid, Typography, CardContent, Button, TextField,
} from '@material-ui/core';

import './login.styles.scss';


export function LoginComponent() {

    const history = useHistory();

    const [inputValue, setInputValue] = useState("");



    const handleInputChange = (event) => {
        setInputValue(event.target.value.trim());
    }

    const handleSubmit = (event) => {
        history.push(
            `/chat?username=${inputValue}`
        )
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
    }


    return (
        <React.Fragment>
            <Grid container className="loginWrapper">
                <Grid container className="loginCard">
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <form onSubmit={handleFormSubmit} autoComplete="off">
                                    <Grid container className="loginCardContent">
                                        <Grid item xs={12}>
                                            <Typography variant="h5" align="center">
                                                LOGIN
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Username"
                                                value={inputValue}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                onClick={handleSubmit}
                                            >
                                                Login
                                        </Button>
                                        </Grid>

                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

        </React.Fragment>

    )
}