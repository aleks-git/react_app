import React, { PureComponent } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import bindAllMethods from 'react-bind-all-methods';
import {connect} from 'react-redux';
import {addMark, updateMark, showMark, saveMark, deleteMark} from "../../actions/addMarkerActions";

export class MapContainer extends PureComponent {
    constructor(props){
        super(props);
        this.currentMap = {};
        this.state = {
            zoom: 14,
            nearestRadius: 1000,
            centralPosition: {lat: 46.48376732, lng: 30.73566455 },
        };

        bindAllMethods(MapContainer)(this);
    }

    componentDidMount(){
        this.currentMap = this.nodeMap.map;
        this._getGeoLocation();

        this._customButtons('SHOW', '', 'LEFT_TOP', this.showMarkers);
        this._customButtons('SAVE', '', 'LEFT_TOP', this.saveMarkers);
        this._customButtons('DEL', '', 'LEFT_TOP', this.deleteMarkers);
        this._customButtons('Pharmacies', 'pharmacy', 'LEFT_BOTTOM', this.handleGetNearestPlaces);
        this._customButtons('Gas stations', 'gas_station', 'LEFT_BOTTOM', this.handleGetNearestPlaces);
        this._customButtons('Schools', 'school', 'LEFT_BOTTOM', this.handleGetNearestPlaces);
        this._customButtons('Restaurants', 'restaurant', 'LEFT_BOTTOM', this.handleGetNearestPlaces);
    }

    addMarker (lat, lng){
        this.props.addM(lat, lng);
    };

    showMarkers(){
        this.props.showM();
    }

    saveMarkers(){
        this.props.saveM();
    }

    updateMarkers(markers){
        this.props.updateM(markers);
    }

    deleteMarkers(){
        this.props.deleteM();
    }

    /**
    *Maybe it is should be separate component
    */
    _customButtons (text, type, positionAtMap, customButtonCallbackfunction) {
        let map = this.currentMap;

        let controlDiv = document.createElement('div');
        let controlUI = document.createElement('div');
        controlUI.setAttribute("class", "customMapButton");

        let controlText = document.createElement('div');
        controlText.setAttribute("class", "customMapButtonText");
        controlText.setAttribute("data-type", type);
        controlText.innerHTML = text;

        controlDiv.appendChild(controlUI);
        controlUI.appendChild(controlText);
        controlUI.addEventListener('click', function(event) {
            customButtonCallbackfunction(event);
        });

        map.controls[google.maps.ControlPosition[positionAtMap]].push(controlDiv);
    };

    handleGetNearestPlaces(event){
        let type = event.target.getAttribute('data-type');
        let service = new google.maps.places.PlacesService(this.currentMap);
        service.nearbySearch({
            location: this.state.centralPosition,
            radius: this.state.nearestRadius,
            type: [type]
        }, this._callbackNearestMarkers);
    }

    _callbackNearestMarkers(results, status){
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            let markersArr = [];
            for (let i = 0; i < results.length; i++) {
                let location = results[i].geometry.location;
                markersArr.push({lat: location.lat(), lng: location.lng()})
            }
            this.updateMarkers(markersArr)
        }
    }

    _getGeoLocation () {
        let self = this;
        let centrPos = self.state.centralPosition;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position){
                    self.setState({centralPosition: {lat: position.coords.latitude, lng: position.coords.longitude}});
                    self.currentMap.setCenter(self.state.centralPosition);
                    self.addMarker(position.coords.latitude, position.coords.longitude);
                },
                function(){
                    let agree = confirm('Can we put default marker on a map?');
                    if(agree) self.addMarker(centrPos.lat, centrPos.lng);
                }
            )
        }
        else {
            console.error('Your browser does not support geolocation.');
            self.addMarker(centrPos.lat, centrPos.lng);
        }
    }



    render() {
        const renderedMarkers =  this.props.allMarkers.map((marker, i) => <Marker key={i} position={{lat: marker.lat, lng: marker.lng}}/> );

        return (
            <div className="googleMapBlock">
                <Map google={this.props.google}
                     initialCenter={this.state.centralPosition}
                     zoom={this.state.zoom}
                     streetViewControl={false}
                     mapTypeControl={false}
                     ref={(map) => this.nodeMap = map}
                     onClick={(t, map, c) => this.addMarker(c.latLng.lat(), c.latLng.lng())}>

                     {renderedMarkers}
                </Map>
            </div>
        )
    };

}


function mapStateToProps(state){
    return {
        allMarkers: state
    }
}

function mapDispatchToProps(dispatch){
    return {
        addM: (lat, lng) => dispatch(addMark(lat, lng)),
        showM: () => dispatch(showMark()),
        saveM: () => dispatch(saveMark()),
        updateM: (markers) => dispatch(updateMark(markers)),
        deleteM: () => dispatch(deleteMark())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: ('AIzaSyDkqhi8l2Ph9yUMP4fPd2vqC4Y8oIZUuZI')
})(MapContainer));
