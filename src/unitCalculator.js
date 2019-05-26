import React from 'react';
import AddUnitData from './addUnitData';
import { Grid } from '@material-ui/core';

import fire from './firebase'

class UnitPage extends React.Component
{
    state = {
        loading: true,
        unitavailable: false
    }

    async getData() {
        const {unitcode} = this.props.match.params;

        const doc = await fire.firestore().collection("units").doc(unitcode).get()
        
        if (doc.exists) {
            console.log(doc.data())
            this.setState({loading: false, unitavailable: true, ...doc.data()})
        } else {
            this.setState({loading: false})
        }
        

    }


    componentDidMount() {
        //Make database query
        this.getData()
    }

    render() {
        return (
            <div>
                <Grid container>

                    <Grid item sm={12}>
                        <AddUnitData unitcode={this.props.match.params.unitcode}/>
                    </Grid>

                </Grid>
                
            </div>

        )
    }
}

export default UnitPage;
