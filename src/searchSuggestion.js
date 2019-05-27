import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import fire from './firebase'

import { throttle } from 'throttle-debounce';

import UnitSuggestions from './unitSuggestions'

import {Link} from 'react-router-dom';


const textFieldStyle = {
  marginTop: "14%",
  width: "90%",
  marginLeft: "5%"
}

const THROTTLE_INTERVAL = 500;




const funcs = fire.functions();

class UnitSearch extends Component {
    

    state = {
        suggestions: [],
        unitcode: ""
    }

    constructor(props) {
        super(props)
        this.throttleAutoComplete = throttle(THROTTLE_INTERVAL, this.fulfillAutoComplete)
    }

    async fulfillAutoComplete(query) {
        const suggestionsCall = funcs.httpsCallable('search')
        const suggestions = await suggestionsCall({query})

        const data = suggestions.data;

        if (data.success !== false) {

            console.log(suggestions);
            console.log(`Fetched ${suggestions.data.length} items`)
            this.setState({suggestions: suggestions.data})

        }
    }

    handleChange(e) {
        const {value} = e.target;
        this.setState({
            unitcode: value.toUpperCase()
        }, () => {
            this.throttleAutoComplete(value)
        })
        
    }

    render() {

        const overrideLink = this.state.unitcode;

        return (
            <div style={textFieldStyle}>
                <TextField
                    autoComplete="off"
                    id="standard-search"
                    label="Search for Unit"
                    type="search"
                    value={overrideLink}
                    autoFocus={true}
                    margin="normal"
                    fullWidth
                    onChange={(e) => this.handleChange(e)}
                />

                <br/><br/>

                <UnitSuggestions suggestions={this.state.suggestions}/>

                <br/><br/>

                {overrideLink == "" ? null :
                <Link style={{marginTop: "20%"}} to={`/unit/${overrideLink}`}>
                    Cannot find {overrideLink.toUpperCase()}?
                </Link>
                }
                
            </div>
        )
    }

}


export default UnitSearch;



