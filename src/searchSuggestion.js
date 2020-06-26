import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import fire from './firebase'
import LinearProgress from '@material-ui/core/LinearProgress';

import { throttle, debounce } from 'throttle-debounce';

import UnitSuggestions from './unitSuggestions'

import {Link} from 'react-router-dom';
import Disclaimer from './disclaimer';


const textFieldStyle = {
  marginTop: "7%",
  width: "90%",
  marginLeft: "5%"
}

const THROTTLE_INTERVAL = 800;
const DISPLAY_LIMIT = 11;




const funcs = fire.functions();

class UnitSearch extends Component {
    

    state = {
        suggestions: [],
        unitcode: "",
        loading: false
    }

    constructor(props) {
        super(props)
        this.fulfillAutoComplete = this.fulfillAutoComplete.bind(this)
        this.throttleAutoComplete = debounce(THROTTLE_INTERVAL, this.fulfillAutoComplete)
    }

    async fulfillAutoComplete(query) {

        console.log(`Called with query ${query}`)

        this.setState({loading: true})

        try {
            const suggestionsCall = funcs.httpsCallable('search')
            const suggestions = await suggestionsCall({query})

            const data = suggestions.data;

            if (data.success !== false) {
                console.log(`Fetched ${suggestions.data.length} items`)
                const howMany = suggestions.data.length < DISPLAY_LIMIT ? suggestions.data.length : DISPLAY_LIMIT;
                this.setState({suggestions: suggestions.data.splice(0, howMany)})
            }
        } catch (e) {
            console.error("An error occured", e.toString())
        } finally {
            this.setState({loading: false})
        }
    }

    handleChange(e) {
        const {value} = e.target;
        this.setState({
            unitcode: value.toUpperCase()
        }, () => {
            // this.throttleAutoComplete.cancel()
            this.throttleAutoComplete(value)
        })
        
    }

    render() {

        const overrideLink = this.state.unitcode;

        return (
            <div>
                

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
                { this.state.loading ? 
                <LinearProgress /> : null
                }
                <br/><br/>

                <UnitSuggestions suggestions={this.state.suggestions}/>

                <br/><br/>

                {overrideLink == "" ? null :
                <Link style={{marginTop: "20%"}} to={`/unit/${overrideLink}`}>
                    Cannot find {overrideLink.toUpperCase()}?
                </Link>
                }

<br/><br/>
<br/><br/>


                <Disclaimer/>
                
            </div>
            </div>
        )
    }

}


export default UnitSearch;



