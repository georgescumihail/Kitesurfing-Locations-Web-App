import React, { Component } from 'react';
import './FavouriteButton.css';

class FavouriteButton extends Component {
    state = {

    }

    render() {

        if (this.props.isAdd) {

            return (
                <div onClick={this.props.handleFavourite} className="fav-button add-fav">
                    Add to favourites
                </div>
            );
        }
        else {
            return (
                <div onClick={this.props.handleFavourite} className="fav-button remove-fav">
                    Remove from favourites
                </div>
            );
        }
    }

}

export default FavouriteButton;