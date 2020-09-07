import React from 'react';

import{
    Card, CardContent, Grid, 
} from '@material-ui/core';
import styled from 'styled-components';

const ScrollPanelWrapper = styled.div`

    max-height: ${props => props.maxHeight ? props.maxHeight : "auto"};
    overflow-y: scroll;

    .MuiPaper-root {
        background-color: ${ props => props.background ? "#fff" : "transparent"};
        box-shadow : ${ props => props.background ? "#0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);" : "none"};
    }

    .card {
        height: ${props => props.height ? props.height : "auto"};
    }

`


export function ScrollPanelComponent({
    children,
    background = true,
    maxHeight = "auto",
    height
}){


    return(
        <React.Fragment>
            <ScrollPanelWrapper background={background} maxHeight={maxHeight} height={height}>
                <Card className="card">
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
            </ScrollPanelWrapper>
        </React.Fragment>

    )
}