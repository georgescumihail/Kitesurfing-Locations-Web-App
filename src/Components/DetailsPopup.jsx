import React, { Component } from 'react';
import './DetailsPopup.css';
import FavouriteButton from './FavouriteButton';
import StarOn from '../img/star-on.png';
import StarOff from '../img/star-off.png';

class DetailsPopup extends Component {

    state = {
        isFav: false
    }

    componentWillMount() {
        this.setState({ isFav: this.props.isFav() });
    }

    handleFavourite = () => {
        if (this.state.isFav) {
            this.props.removeFavourite(this.props.id);
            this.setState({ isFav: false });
        }
        else {
            this.props.addFavourite(this.props.id);
            this.setState({ isFav: true });
        }
    }

    render() {
        return (
            <div className="popup-container">
                <div className="spot-header">
                    <div className="spot-name">{this.props.name}</div>
                    {this.state.isFav && <span><img className="fav-star" src={StarOn}></img></span>}
                    {!this.state.isFav && <span><img className="fav-star" src={StarOff}></img></span>}
                </div>
                <div className="country-name">{this.props.country}</div>
                <div className="info-type">Wind probability</div>
                <div className="info-field">{this.props.probability}</div>
                <div className="info-type">Latitude</div>
                <div className="info-field">{this.props.lat}</div>
                <div className="info-type">Longitude</div>
                <div className="info-field">{this.props.long}</div>
                <div className="info-type">When to go</div>
                <div className="info-field">{this.props.month}</div>
                <FavouriteButton isAdd={!this.state.isFav} handleFavourite={this.handleFavourite} />
            </div>
        );
    }
}

export default DetailsPopup;