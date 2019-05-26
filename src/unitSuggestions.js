import React from 'react'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'

import {Link} from "react-router-dom";

const chipStyle = {
    margin: "1%"
}

const DISPLAY_LIMIT = 5;


function getAvatar(unitCode) {
    return (
        <Avatar>{unitCode.substring(0, 1)}</Avatar>
    )
}

function Suggestions(props) {


    let {suggestions} = props;

    if(!suggestions) {
        return (
            <p>An error occured</p>
        )
    }

    if (suggestions.length > DISPLAY_LIMIT) {
        suggestions = suggestions.splice(0, DISPLAY_LIMIT);
    }

    if (suggestions.length === 0) {
        return (
            <p>No matches found</p>
        )
    }

    const out = suggestions.map(item => {
        const {name, unit} = item;
        return (
            <Link key={unit} style={{textDecoration: 'none'}} to={`unit/${unit}`}>
                <Chip
                    style={chipStyle}
                    color="secondary" 
                    avatar={getAvatar(unit)} 
                    variant="outlined"
                    label={name} />
            </Link>
        )
    })

    return (

        <div>
            {out}
        </div>
    )
}

export default Suggestions;




