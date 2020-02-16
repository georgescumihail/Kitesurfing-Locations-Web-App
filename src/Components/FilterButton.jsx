import React, { Component } from 'react';
import FilterIcon from '../img/filter.png';
import './FilterButton.css';

class FilterButton extends Component {

    state = {
        isOpen: false
    }

    handleClick = () => {
        this.props.togglePopup();
    }

    render() {
        return (
            <React.Fragment>
                <div onClick={this.handleClick} id="filter-button">
                    <img id="filter-icon" src={FilterIcon} />
                    <span id="filter-text">FILTERS</span>
                </div>

            </React.Fragment>
        );
    }
}

export default FilterButton;