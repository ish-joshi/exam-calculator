import React from 'react';
import AddUnitData from './addUnitData';
import { Grid } from '@material-ui/core';

class UnitPage extends React.Component
{
    render() {
        return (
            <div style={{width: "100%"}}>
                <Grid container>

                    <Grid item>
                        <AddUnitData/>
                    </Grid>

                </Grid>
                
            </div>

        )
    }
}

export default UnitPage;
