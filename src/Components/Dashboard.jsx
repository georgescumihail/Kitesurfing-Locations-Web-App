import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import NavbarArea from './NavbarArea';
import SpotsTable from './SpotsTable';
import DetailsPopup from './DetailsPopup';
import { Icon } from 'leaflet';
import RedPin from '../img/red-pin.png';
import YellowPin from '../img/yellow-pin.png';
import PinShadow from '../img/pin-shadow.png';
import './Dashboard.css';
import AddPopup from './AddPopup';
import FilterButton from './FilterButton';
import FilterArea from './FilterArea';

class Dashboard extends Component {

    state = {
        loadedSpots: [],
        filteredSpots: [],
        favouriteSpots: [],
        spotsLoaded: false,
        favsLoaded: false,
        isAddPopupOpen: false,
        isFilterPopupOpen: false
    }

    componentDidMount() {
        this.getAllSpots();
        this.getAllFavourites();
    }

    getAllSpots = () => {
        fetch("https://5e40515569618d001411faa5.mockapi.io/spot")
            .then(res => res.json())
            .then(res => this.setState({ loadedSpots: res, filteredSpots: res, spotsLoaded: true }));
    }

    getAllFavourites = () => {
        fetch("https://5e40515569618d001411faa5.mockapi.io/favourites")
            .then(res => res.json())
            .then(res => this.setState({ favouriteSpots: res, favsLoaded: true }));
    }

    searchFilterSpots = (e) => {
        var searchCriteria = e.target.value;
        var filtered = this.state.loadedSpots.filter(spot => spot.name.toLowerCase().includes(searchCriteria));
        this.setState({ filteredSpots: filtered });
    }

    checkFavourite = id => this.state.favouriteSpots.map(fav => fav.spot).includes(id);

    addFavourite = id => {
        var newFavourites = this.state.favouriteSpots;
        newFavourites.push({ spot: id });
        this.setState({ favouriteSpots: newFavourites });

        fetch("https://5e40515569618d001411faa5.mockapi.io/favourites", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                createdAt: new Date().toLocaleDateString(),
                spot: id
            })
        })
            .then(() => this.getAllFavourites());
    }

    removeFavourite = id => {
        var favId = this.state.favouriteSpots.find(fav => fav.spot == id).id;
        var newFavourites = this.state.favouriteSpots.filter(fav => fav.id != favId);
        this.setState({ favouriteSpots: newFavourites });

        fetch("https://5e40515569618d001411faa5.mockapi.io/favourites/" + favId, {
            method: 'DELETE'
        })
            .then(() => this.getAllFavourites());
    }

    render() {

        let content;

        let yellowPin = new Icon({
            iconUrl: YellowPin,
            shadowUrl: PinShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        let redPin = new Icon({
            iconUrl: RedPin,
            shadowUrl: PinShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        if (!this.state.spotsLoaded || !this.state.favsLoaded) {
            content = <div className="spinner-container"><Spinner animation="border" variant="danger" /></div>
        }
        else {
            content = <div id="spot-info-container">
                <Map center={[40, 20]} zoom={3} style={{ height: "450px", width: "100%" }}
                    maxBoundsViscosity={1.0}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        noWrap="true"
                        minZoom="1"
                    />
                    {this.state.filteredSpots.map(spot =>
                        <Marker key={spot.id}
                            position={[spot.lat, spot.long]}
                            icon={this.checkFavourite(spot.id) ? yellowPin : redPin}>
                            <Popup>
                                <DetailsPopup
                                    key={spot.id}
                                    id={spot.id}
                                    name={spot.name}
                                    country={spot.country}
                                    lat={spot.lat}
                                    long={spot.long}
                                    probability={spot.probability}
                                    month={spot.month}
                                    isFav={() => this.checkFavourite(spot.id)}
                                    addFavourite={this.addFavourite}
                                    removeFavourite={this.removeFavourite}
                                />
                            </Popup>
                        </Marker>
                    )}
                </Map>
                <div id="filter-button-container">
                    <FilterButton togglePopup={this.toggleFilterPopup} />
                </div>
                <div id="filter-area-container">
                    {this.state.isFilterPopupOpen && <FilterArea applyFilters={this.applyFilters} />}
                </div>
                <div id="table-area">
                    <div id="locations-header">Locations</div>
                    <input onChange={this.searchFilterSpots} id="table-search" type="text" placeholder="Search..." />
                    <SpotsTable spots={this.state.filteredSpots} sortSpots={this.sortSpots} />
                </div>
                {this.state.isAddPopupOpen && <AddPopup closePopup={this.toggleAddPopup} refreshAfterAdd={this.refreshAfterAdd} />}
            </div>
        }

        return (
            <div id="dashboard-container">
                <NavbarArea logoutUser={this.props.logoutUser} toggleAddPopup={this.toggleAddPopup} />
                {content}
            </div>
        );
    }

    applyFilters = (countryFilter, windFilter) => {

        var filtered = this.state.loadedSpots
            .filter(spot => spot.country.toLowerCase().includes(countryFilter))
            .filter(spot => spot.probability >= windFilter);

        this.setState({ filteredSpots: filtered });
    }

    toggleAddPopup = () => {
        this.setState(prev => ({ isAddPopupOpen: !prev.isAddPopupOpen }));
    }

    toggleFilterPopup = () => {
        this.setState(prev => ({ isFilterPopupOpen: !prev.isFilterPopupOpen }));
    }

    refreshAfterAdd = () => {
        this.getAllSpots();
        this.toggleAddPopup();
    }

    sortSpots = sortType => {
        var sorted;
        switch (sortType) {
            case "name":
                sorted = this.state.filteredSpots.sort((st, nd) => st.name.localeCompare(nd.name));
                break;
            case "country":
                sorted = this.state.filteredSpots.sort((st, nd) => st.country.localeCompare(nd.country));
                break;
            case "lat":
                sorted = this.state.filteredSpots.sort((st, nd) => parseInt(st.lat) > parseInt(nd.lat) ? 1 : -1);
                break;
            case "long":
                sorted = this.state.filteredSpots.sort((st, nd) => parseInt(st.long) > parseInt(nd.long) ? 1 : -1);
                break;
            case "probability":
                sorted = this.state.filteredSpots.sort((st, nd) => parseInt(st.probability) > parseInt(nd.probability) ? 1 : -1);
                break;
            case "month":
                sorted = this.state.filteredSpots.sort((st, nd) => st.month.localeCompare(nd.month));
                break;
        }
        this.setState({ filteredSpots: sorted });
    }
}

export default Dashboard;