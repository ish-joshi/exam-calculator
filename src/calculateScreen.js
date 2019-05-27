import React from 'react'


//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TextField from '@material-ui/core/TextField'

import LinearProgress from '@material-ui/core/LinearProgress';

import { Typography } from '@material-ui/core';

import ResultTable from './neededResultsTable'

import {Link} from 'react-router-dom'


const rowCellStyle = {paddingRight: "1%"};

class CalculateTask extends React.Component {
    //

    state = {}

    constructor(props) {
        super(props)

        let {structure} = props.unitdata;
        structure = structure.map(item => {
            return {
                mark: "",
                calc: 0,
                ...item
            }
        })


        this.state = {structure, ...props}
    }


    getListResults() {
        const res = this.state.structure.map(item => {
            return this.decimalRepresentation(item.mark, item.weight);
        })
        return res;
    }

    getTotal() {
        const res = this.getListResults();
        let sum = 0
        res.forEach(i => sum += i);
        return sum;
    }


    getPlaceHolder() {
        const items = ["80%", "34/40", "20"]
        return items[Math.floor(Math.random()*items.length)];
    }

    decimalRepresentation(markValue, weight) {
        if (markValue.match(/^\d{0,3}%$/)) {
            // Matched percent syntax
            const value = markValue.replace("%", "");
            return (value/100)*weight;
        } else if (markValue.match(/^\d{0,3}\s*\/\d{0,3}\s*$/)) {
            // Matched Division Syntax
            const div = markValue.split("/");
            const top = div[0]
            const bottom = div[1]

            return (top/bottom) * weight
        } else if (markValue.match(/^\d{0,3}$/)) {
            const num = Number(markValue)
            return num > weight ? weight : num;
            // Matched number syntax
        }
    }

    onlyOneLeft() {
        return this.getListResults().filter(i => i === 0).length === 1;
    }


    validPattern(markValue) {

        if (markValue.match(/^\d{0,3}%$/)) {
            // Matched percent syntax
            return true;
        } else if (markValue.match(/^\d{0,3}\s*\/\d{0,3}\s*$/)) {
            // Matched Division Syntax
            return true
        } else if (markValue.match(/^\d{0,3}\s*$/)) {
            return true
            // Matched number syntax
        }

        return false;
    }

    handleMarkChange(e, index) {
        const {value} = e.target;
        //Check constraint on value

        if (this.validPattern(value)) {
            const {structure} = this.state;
            const {weight} = structure[index];
            structure[index].mark = value;
            structure[index].calc = this.decimalRepresentation(value, weight)
            this.setState({structure})
        }
    }

    render() {
        console.log("Have unit information for grade calculation")
        

        const {structure} = this.state;
        
        console.table(structure)

        const total = this.getTotal();


        const oneLeft = this.onlyOneLeft();
        const resultTable = oneLeft ? <ResultTable total={total}/> : <Typography variant="subtitle2" style={{color: 'grey'}} align="center">Fill in all but one row</Typography>;

        const stateRepresentation = structure.map((item, index) => {
            const {name, weight, mark} = item;
            return (
                
                <TableRow key={"" + index}>
                    <TableCell align="left" style={rowCellStyle} scope="row">
                        <Typography>
                            {name}
                        </Typography>
                    </TableCell>
                    <TableCell align="center" style={rowCellStyle}>
                        <Typography>
                            {weight}
                        </Typography>
                    </TableCell>
                    <TableCell style={rowCellStyle} align="center">
                        <TextField
                            id="standard-number"
                            label="Mark"
                            type="text"
                            placeholder={this.getPlaceHolder()}
                            margin="normal"
                            value={mark}
                            onChange={(e) => {this.handleMarkChange(e, index)}}
                            fullWidth
                        />
                    </TableCell>
                    <TableCell style={rowCellStyle} align="center">
                        <LinearProgress variant="determinate" value={(item.calc/weight)*100} />
                    </TableCell>
                </TableRow>
            )
        })


        return (
            <div style={{padding: "2%", paddingTop: "4%"}}>

<Typography fontWeight="fontWeightLight" align="center" variant="h4">
                    Calculator for <b>{this.state.unitdata.unitcode}</b>
                </Typography>
                <br></br>
                <br></br>

                <ul>
                    
                    <li style={{color: 'grey', marginBottom: "2%"}}>
                        You have specific marks? enter 3/5
                    </li>
                    <li style={{color: 'grey', marginBottom: "2%"}}>
                        You know your percentage grade for an item? enter 72%
                    </li>
                    <li style={{color: 'grey', marginBottom: "2%"}}>
                        You know your computed grade? enter 20
                    </li>

                </ul>

                <br></br>
                <br></br>


            <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Assessment Name</TableCell>
                        <TableCell align="center">Weight</TableCell>
                        <TableCell align="center">Mark</TableCell>
                        <TableCell align="center">Gain</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    
                       
                       {stateRepresentation}
                

                    </TableBody>
            </Table>
            <br></br>
            <br></br>

            <Typography align="center">
                Total percent gained <b>{total.toPrecision(2)}%</b>
            </Typography>
            <br></br>
            <LinearProgress variant="determinate" value={total} />

            <br></br>
            <br></br>

            {resultTable}
            <br></br>
            <br></br>
            <br></br>

            <Link to="/">
                <Typography align="center" variant="subtitle1">
                    Calculate Another
                </Typography>
            </Link>

            </div>
        )
    }

}



export default CalculateTask;

