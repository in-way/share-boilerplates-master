import React, { Component } from 'react';

import './style/Button.scss';

import logo from '../../assets/images/emoji-4.png';

class Button extends Component {
    render() {
        return (
            <button className="button" onClick={this.props.onClick}>
                <img src={logo} alt="logo" />
                {this.props.children}
            </button>
        );
    }
}

export default Button;
