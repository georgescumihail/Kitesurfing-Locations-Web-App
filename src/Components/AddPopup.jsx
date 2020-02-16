import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Spinner } from 'react-bootstrap';
import { MuiPickersUtilsProvider as PickerUtils, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import RedPin from '../img/red-pin.png';
import PinShadow from '../img/pin-shadow.png';
import { Icon } from 'leaflet';
import './AddPopup.css';


class AddPopup extends Component {

    state = {
        spotName: "",
        country: "",
        seasonMonth: null,
        selectedDate: null,
        lat: null,
        lng: null,
        hasError: false,
        sendingData: false
    }

    handleNameChange = e => {
        this.setState({ spotName: e.target.value });
    }

    handleCountryChange = e => {
        this.setState({ country: e.target.value });
    }

    handleDateChange = selectedDate => {
        const seasonMonth = selectedDate.toLocaleString("default", { month: "long" });
        this.setState({ seasonMonth, selectedDate });
    }

    handleMapClick = e => {
        const { lat, lng } = e.latlng;
        this.setState({ lat, lng });
    }

    handleCancel = () => {
        this.props.closePopup();
    }

    handleAdd = () => {
        if (this.checkDataValid()) {
            this.setState({ hasError: false, sendingData: true });
            fetch("https://5e40515569618d001411faa5.mockapi.io/spot", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    createdAt: new Date().toLocaleDateString(),
                    name: this.state.spotName,
                    country: this.state.country,
                    lat: Math.round(this.state.lat * 100) / 100,
                    long: Math.round(this.state.lng * 100) / 100,
                    probability: Math.floor(Math.random() * 100),
                    month: this.state.seasonMonth
                })
            }).then(() => this.props.refreshAfterAdd());
        }

        else {
            this.setState({ hasError: true });
        }
    }

    checkDataValid = () => {
        const s = this.state;
        return (s.spotName.length > 0
            && s.country.length > 0
            && s.seasonMonth != null
            && s.lat != null
            && s.lng != null);
    }

    render() {

        let redPin = new Icon({
            iconUrl: RedPin,
            shadowUrl: PinShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        return (
            <div id="add-container">

                <div id="add-title">Add Spot</div>
                <div className="add-label">Name</div>
                <input onChange={this.handleNameChange} className="add-field" type="text" />
                <div className="add-label">Country</div>
                <input onChange={this.handleCountryChange} className="add-field" type="text" />
                <div className="add-label">High season</div>

                <div id="popup-date-container">
                    <PickerUtils utils={DateFnsUtils}>
                        <DatePicker
                            disableToolbar
                            variant="dialog"
                            margin="normal"
                            id="date-picker-inline"
                            value={this.state.selectedDate}
                            onChange={this.handleDateChange}
                        />
                    </PickerUtils>
                </div>

                <div id="popup-map-container">
                    <Map center={[40, 20]}
                        zoom={5}
                        style={{ height: "150px", width: "80%" }}
                        maxBoundsViscosity={1.0}
                        onClick={this.handleMapClick}
                    >
                        <TileLayer
                            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            noWrap="true"
                            minZoom="1"
                        />
                        {this.state.lat && this.state.lng
                            && <Marker position={[this.state.lat, this.state.lng]} icon={redPin}></Marker>}
                    </Map>
                </div>

                <div id="popup-buttons-container">
                    <button onClick={this.handleCancel} className="add-cancel">Cancel</button>
                    <button onClick={this.handleAdd} className="add-confirm">Confirm</button>
                </div>
                {this.state.hasError && <div className="error-message">Please complete all required fields!</div>}
                {this.state.sendingData && <div className="spinner-container"><Spinner animation="border" variant="danger" /></div>}
            </div>
        );
    }
}

export default AddPopup;