import React, {Component} from "react";
import './search.css';
import TextField from '@material-ui/core/TextField';


class Search extends Component {

    state = {
        term: ""
    }

    onSearchChange = (e) => {
        const term = e.target.value
        this.setState({term})
        this.props.searchChange(term)

    }

    render() {
        return (
            <form className='search' noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Поиск сотрудника" variant="outlined"
                           onChange={this.onSearchChange}
                           value={this.state.term}
                />
            </form>

        );
    }
}

export default Search;
