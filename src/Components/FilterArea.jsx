import React, { Component } from 'react';
import './FilterArea.css';

class FilterArea extends Component {

    state = {
        countryFilter: "",
        windFilter: ""
    }

    handleCountry = e => {
        this.setState({ countryFilter: e.target.value });
    }

    handleWindProb = e => {
        this.setState({ windFilter: e.target.value });
    }

    handleApply = () => {
        this.props.applyFilters(this.state.countryFilter, this.state.windFilter);
    }

    render() {
        return (
            <div id="filter-popup">
                <div className="filter-label">Country</div>
                <input onChange={this.handleCountry} className="filter-field" type="text" />
                <div className="filter-label">Wind Probability</div>
                <input onChange={this.handleWindProb} className="filter-field" type="number" min="0" />
                <button onClick={this.handleApply} id="apply-filter-button">Apply Filter</button>
            </div>
        );
    }
}

export default FilterArea;