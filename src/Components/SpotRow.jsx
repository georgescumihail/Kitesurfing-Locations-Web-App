import React, { Component } from 'react';

class SpotRow extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.country}</td>
                <td>{this.props.lat}</td>
                <td>{this.props.long}</td>
                <td>{this.props.probability}</td>
                <td>{this.props.month}</td>
            </tr>
        );
    }
}

export default SpotRow;