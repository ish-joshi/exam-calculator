import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import fire from './firebase'

import { throttle } from 'throttle-debounce';

import UnitSuggestions from './unitSuggestions'


const textFieldStyle = {
  marginTop: "14%",
  width: "90%",
  marginLeft: "5%"
}

const THROTTLE_INTERVAL = 500;




const funcs = fire.functions();

class UnitSearch extends Component {
    

    state = {
        suggestions: []
    }

    constructor(props) {
        super(props)
        this.throttleAutoComplete = throttle(THROTTLE_INTERVAL, this.fulfillAutoComplete)
    }

    async fulfillAutoComplete(query) {
        const suggestionsCall = funcs.httpsCallable('search')
        const suggestions = await suggestionsCall({query})
        console.log(`Fetched ${suggestions.data.length} items`)
        this.setState({suggestions: suggestions.data})
    }

    handleChange(e) {
        const {value} = e.target;
        this.throttleAutoComplete(value)
    }

    render() {
        return (
            <div style={textFieldStyle}>
                <TextField
                    id="standard-search"
                    label="Search for Unit"
                    type="search"
                    autoFocus={true}
                    margin="normal"
                    fullWidth
                    onChange={(e) => this.handleChange(e)}
                />

                <br/><br/>

                <UnitSuggestions suggestions={this.state.suggestions}/>
            </div>
        )
    }

}


export default UnitSearch;



