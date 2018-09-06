import {baseHost} from "../../constants";

let addMarkerReducer = (state = [], action) => {
    switch (action.type){
        case "ADD_MARKER":
            return [...state, {lat: action.payload.lat, lng: action.payload.lng}];
        case "SHOW_MARKERS":
            return getAllMarkers();
        case "SAVE_MARKERS":
            sendAllMarkers(state);
            return state;
        case "UPD_MARKERS":
            return action.payload.markers;
        case "DEL_MARKERS":
            return [];
        default:
            return state;
    }
};




function getAllMarkers(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', baseHost + '/api/getMarkers.php', false);
    xhr.send();

    if (xhr.status != 200) {
        console.error('Something was wrong with getting of markers.');
        //console.error(xhr.status + ': ' + xhr.statusText);
        return [];
    } else {
        console.info('We get all markers from server.');
        return JSON.parse(xhr.response);
    }
}


function sendAllMarkers(markers) {
    fetch(baseHost + '/api/setMarkers.php', {
        method: 'POST',
        body: JSON.stringify(markers)
    })
    .then(results => { return results.text() })
    .then(data => {
        console.info('We sent all markers to server.');
    })
    .catch((error) => {
        console.error('Something was wrong with saving of markers.');
    });
}

export default addMarkerReducer;