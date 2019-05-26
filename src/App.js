import React from 'react';
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core';


import UnitSearch from './searchSuggestion'


function App() {
  return (
    <Grid container style={{paddingTop: "5%"}}>

      <Grid item xs={false} sm={1} md={2} />
      <Grid item xs={12} sm={10} md={8}>

      <Typography align="center" variant="h2" component="h2" gutterBottom>
        Exam Calculator
      </Typography>

      <UnitSearch/>
      

      </Grid>

    </Grid>

    


    
  );
}

export default App;
