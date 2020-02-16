import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import PersonIcon from '@material-ui/icons/Person';
import './NavbarArea.css';

class NavbarArea extends Component {

    state = {
        isMenuVisible: false
    }

    changeMenuVisibility = () => {
        this.setState(prev => ({
            isMenuVisible: !prev.isMenuVisible
        }));
    }

    logoutUser = () => {
        this.props.logoutUser();
    }

    handleAddButton = () => {
        this.props.toggleAddPopup();
    }

    render() {

        var menuClass = this.state.isMenuVisible ? "logout-button-visible" : "logout-button-hidden";

        return (
            <div id="navbar-container">
                <Navbar className="bg-light justify-content-between">
                    <div id="navbar-title">Kite</div>
                    <div id="navbar-buttons">
                        <button onClick={this.handleAddButton} id="add-button">Add Spot</button>
                        <span onClick={this.changeMenuVisibility} id="navbar-menu"><PersonIcon fontSize="large"></PersonIcon></span>
                        <div onClick={this.logoutUser} className={menuClass}>
                            Logout
                        </div>
                    </div>
                </Navbar>
            </div>
        );
    }
}

export default NavbarArea;