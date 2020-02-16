import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import SpotRow from './SpotRow';
import './SpotsTable.css';


class SpotsTable extends Component {

    render() {
        if (this.props.spots.length == 0) {
            return (
                <div id="table-container">
                    No results found
                </div>
            );
        }
        return (
            <div id="table-container">
                <Table responsive size="sm" striped bordered hover>
                    <thead>
                        <tr>
                            <th onClick={() => this.props.sortSpots("name")}>Name</th>
                            <th onClick={() => this.props.sortSpots("country")}>Country</th>
                            <th onClick={() => this.props.sortSpots("lat")}>Latitude</th>
                            <th onClick={() => this.props.sortSpots("long")}>Longitude</th>
                            <th onClick={() => this.props.sortSpots("probability")}>Wind prob</th>
                            <th onClick={() => this.props.sortSpots("month")}>When to go</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.spots.map(spot =>
                            <SpotRow key={spot.id}
                                name={spot.name}
                                country={spot.country}
                                lat={spot.lat}
                                long={spot.long}
                                probability={spot.probability}
                                month={spot.month} />)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default SpotsTable;