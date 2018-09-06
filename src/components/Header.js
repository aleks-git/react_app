import React, { Component } from 'react';
import Menu from "./Menu";

class Header extends Component{
    render(){
        return(
            <header className="appHeader">
                <h1 className="appTitle">Welcome to my App</h1>
                <Menu />
            </header>
        );
    }
}

export default Header;