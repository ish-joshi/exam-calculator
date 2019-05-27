import React, {Component} from 'react'

//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//

import Button from '@material-ui/core/Button'

//firestore
import fire from './firebase'


//Textbox
import TextField from '@material-ui/core/TextField'

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { Typography } from '@material-ui/core';



const rowCellStyle = {paddingRight: "1%"};



class AddUnitData extends Component {

    state = {
        unitdata: []
    }


    addBlankItem(e) {
        //Add one to state and save
        const {unitdata} = this.state;
        unitdata.push({name: "", weight: ""})
        this.setState({unitdata})
    }

    handleNameChange(index, val) {
        const {unitdata} = this.state;
        unitdata[index].name = val.toUpperCase();
        this.setState({unitdata})
    }

    handleWeightChange(index, val) {
        const {unitdata} = this.state;
        unitdata[index].weight = Number(val);
        this.setState({unitdata})
    }

    handleDelete(index) {
        const {unitdata} = this.state;
        unitdata.splice(index, 1);
        this.setState({unitdata})
    }


    performValidation() {
        // Check if it adds up to 100%

        try {
            let {unitdata} = this.state;
            unitdata = unitdata.map(i => Number(i.weight));
            const s = unitdata.reduce((p, a) => p + a,0)
            
            if (s >= 100 && s <= 110) {
                return {
                    validated: true
                }
            } else {
                return {
                    validated: false,
                    message: "Weights do not add up to 100%"
                }
            }

        } catch(e) {
            console.error(e)
            return {
                validated: false,
                message: e.toString()
            }
        }


    }


    submitData() {
        if (this.performValidation().validated) {

            const setTo = {
                name: "",
                unitcode: this.props.unitcode,
                structure: this.state.unitdata
            };

            console.log(setTo);

            //Send to db
            fire.firestore().collection("units").doc(this.props.unitcode)
            .set(setTo).then((v) => {
                console.log(v);
                window.location.reload();
            }).catch(e => {
                console.error(e.toString())
            })



        } else {
            alert("Could not validated values! :(")
        }
    }
    


    render() {


        
        const validationRes = this.performValidation(); 
        const {unitcode} = this.props;

        const stateRepresentation = this.state.unitdata.map((item, index) => {
            const {name, weight} = item;
            return (
                
                <TableRow key={"" + index}>
                    <TableCell align="left" style={rowCellStyle} scope="row">
                    <TextField
                        id="standard-multiline-flexible"
                        label="Name"
                        multiline
                        rowsMax="4"
                        value={name}
                        padding={"none"}
                        margin="normal"
                        fullWidth
                        onChange={(e) => {this.handleNameChange(index, e.target.value)}}
                    />
                    </TableCell>
                    <TableCell style={rowCellStyle} align="left">
                    <TextField
                        id="standard-number"
                        label="Weight"
                        type="number"
                        value={weight}
                        margin="normal"
                        onChange={(e) => {this.handleWeightChange(index, e.target.value)}}
                        fullWidth
                    />
                    </TableCell>
                    <TableCell onClick={(e) => this.handleDelete(index)} align="center"> <DeleteIcon/></TableCell>
                </TableRow>
            )
        })


        return (
            <div style={{padding: "1%"}}>

            <header style={{paddingTop: "4%", paddingBottom: "4%"}}>
                <Typography fontWeight="fontWeightLight" align="center" variant="h2" component="h3">
                    First for <b>{unitcode}</b>
                </Typography>

                <br></br>
                

                <Typography align="center" variant="subtitle1">
                    Help others by adding an assessment structure
                </Typography>

            </header>

            <br></br>
            <br></br>

                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Assessment Name</TableCell>
                        <TableCell align="left">Weight</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    
                       
                       {stateRepresentation}
                    


                        <TableRow>
                        <TableCell style={{padding: "1%"}} onClick={(e) => this.addBlankItem(e)} align="center" colSpan={3} component="th" scope="row">
                            <p>Add Assessment Item</p>
                            <AddIcon/>
                        </TableCell>
                        </TableRow>

                        <TableRow>
                        <TableCell style={{padding: "1%", borderBottom: "none"}} align="center" colSpan={3} component="th" scope="row">
                            <br></br>
                            <br></br>

                            <Button onClick={(e) => this.submitData(e)} disabled={!validationRes.validated}  variant="contained" color="primary">
                                Submit
                            </Button>
                            
                            <br></br>
                            <br></br>

                            <Typography style={{color: "grey"}}>
                                {validationRes.message && stateRepresentation.length > 0 ? validationRes.message : ""}
                            </Typography>
                        </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>



            </div>
        )
    }

}

export default AddUnitData;


