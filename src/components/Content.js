import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import About from "./pages/About";
import MapContainer from "./pages/Map";
import Home from "./pages/Home";
import Auth from "./pages/Authorization";
import NotFound from "./pages/NotFound";

class Content extends Component{
    render(){
        return(
            <div className="content">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/map" component={MapContainer} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default Content;