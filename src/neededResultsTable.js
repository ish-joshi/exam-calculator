import React from 'react'
//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Check from '@material-ui/icons/Check'

import { Typography } from '@material-ui/core';

function getGO(g,t){
    return {
        grade: g,
        thold: t
    }
}

const rowCellStyle = {paddingRight: "1%"};

const grades = [getGO("P", 50), getGO("C", 60), getGO("D", 70), getGO("HD", 80)]



function ResultTable(props) {

    console.log("ResultTable Props")
    console.log(props)

    const {total} = props;

    const representation = grades.map((item, index) => {
        const remaining = item.thold - total;

        return (
            <TableRow key={"" + index}>
                <TableCell align="center" style={rowCellStyle} scope="row">
                        <Typography>
                            {item.grade}
                        </Typography>
                    </TableCell>
                    <TableCell align="center" style={rowCellStyle} scope="row">
                        <Typography>
                            {remaining < 1 ? <Check/> : remaining}
                        </Typography>
                    </TableCell>
                    </TableRow>
        )
    })

    return (
        <div>
            <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Grade</TableCell>
                        <TableCell align="center">% Required</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    
                       {representation}
                       
                

                    </TableBody>
            </Table>
        </div>
    )


}

export default ResultTable;

