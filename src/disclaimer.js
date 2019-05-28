import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'


function Disclaimer(props) {
    return (
        <Paper style={{padding: "2%"}}>
        <Typography variant="h6">Disclaimer</Typography>
        <Typography variant="subtitle2" style={{color: 'grey'}} align="justify">This does not account for hurdles. We do not take any responsibility for incorrect calculations. Do not rely solely on this. Consult your unit guide.
        This website was built by students for students to assist them with stressful uni times.
        <br/><br/>
        Made by: Ishan Joshi, Marin Tang Yan and Brock Leydon.
        </Typography>
    </Paper>
    )
}

export default Disclaimer;

