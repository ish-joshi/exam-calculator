import React, {Component} from 'react'

//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//

//Textbox
import TextField from '@material-ui/core/TextField'

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircle'

class AddUnitData extends Component {

    state = {
        unitdata: [{name: "Assignment 1", weight: "20"}]
    }


    render() {



        const stateRepresentation = this.state.unitdata.map((item, index) => {
            const {name, weight} = item;
            return (
                
                <TableRow key={JSON.stringify(item)+index}>
                    <TableCell component="th" scope="row">
                        {name}
                    </TableCell>
                    <TableCell align="right">
                    <TextField
                        id="standard-number"
                        label="Weight"
                        type="number"
                        
                        InputLabelProps={{
                        shrink: true,
                        }}
                        margin="normal"
                    />
                    </TableCell>
                    <TableCell align="center"> <DeleteIcon/></TableCell>
                </TableRow>
            )
        })


        return (
            <div>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>Assessment Name</TableCell>
                        <TableCell align="right">Weight</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    
                       
                       {stateRepresentation}
                    


                        <TableRow>
                        <TableCell align="center" colSpan={3} component="th" scope="row">
                            <AddIcon/>
                        </TableCell>
                        
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }

}

export default AddUnitData;


