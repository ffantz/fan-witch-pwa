import React from "react";
import './../style/Home.css';

import { Navigate } from "react-router-dom";

class NavBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};

        this.sair = this.sair.bind(this);
        this.handleNavCollapse = this.handleNavCollapse.bind(this);
        this.isNavCollapsed = true;
    }

    sair () {
        localStorage.setItem("logado", 0);
        return <Navigate to="/login" />
    }

    // Trata a barra oculta - mobile
    handleNavCollapse () {
        this.isNavCollapsed = !this.isNavCollapsed
        this.forceUpdate();
    }

    render () {
        return (
            <nav className="navbar navbar-expand-lg fixed-top navbar-purple bg-purple">
                <div style={{marginLeft: '10px' }}>
                    <img style={{marginRight: '10px' }} className="mr-3" src="./assets/img/fanwitch-icone.png" alt="" width="35" height="35" />
                    <span className="navbar-brand navbar-menu mr-auto mr-lg-0">FanWitch</span>
                </div>

                <button className="navbar-toggler p-0 border-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!this.isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={this.handleNavCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`${this.isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item" style={{marginLeft: '10px' }}>
                            <a className="nav-link" href="/">Home <span className="sr-only"></span></a>
                        </li>
                        <li className="nav-item" style={{marginLeft: '10px' }}>
                            <a className="nav-link button-sair" href="/login" onClick={this.sair}>Sair</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar