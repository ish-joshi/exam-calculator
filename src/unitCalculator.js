import React from 'react';
import AddUnitData from './addUnitData';
import { Grid } from '@material-ui/core';

import fire from './firebase'
import LinearProgress from '@material-ui/core/LinearProgress'
import CalculateTask from './calculateScreen';

class UnitPage extends React.Component
{
    state = {
        loading: true,
        unitavailable: false
    }

    async getData() {
        const {unitcode} = this.props.match.params;

        const doc = await fire.firestore().collection("units").doc(unitcode).get()
        
        try {
            if (doc.exists) {
                this.setState({loading: false, unitavailable: true, ...doc.data()})
            } else {
                this.setState({loading: false})
            }
        } catch (e) {
            alert("An error occuured connecting to database");
            console.error(e);
        }
        

    }


    componentDidMount() {
        //Make database query
        this.getData()
    }

    render() {


        console.log(this.state);

        const {loading, unitavailable} = this.state;

        if (loading) {
            return <LinearProgress/>
        }

        return (
            <div>
                <Grid container>

                    <Grid item sm={false} md={2} />
                    <Grid item sm={12} md={8}>

                        {
                            !unitavailable && !loading 
                            ? <AddUnitData unitcode={this.props.match.params.unitcode}/> 
                            : <CalculateTask unitdata={{...this.state}}/>
                        }
                        
                    </Grid>

                </Grid>
                
            </div>

        )
    }
}

export default UnitPage;
