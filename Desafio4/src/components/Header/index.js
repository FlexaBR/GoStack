import React, { Component } from 'react';

import './index.css';
import logo from '../../assets/devbook.png';
import user from '../../assets/avatar.jpg';

class Header extends Component {
  render() {
    return (
      <nav id="header">
        <img src={logo} alt="DevBook"/>
        <div id="user-info">
          <p>Patrick Maciel</p>
          <a href="#">
            <img src={user} alt="Perfil"/>
          </a>
        </div>
      </nav>
    );
  }
}

export default Header;
