export let addMark = (lat = 46.48376732, lng = 30.73566455) => {
    return {
        type: 'ADD_MARKER',
        payload: {
            lat, lng
        }
    }
};

export let updateMark = (markers) => {
    return {
        type: 'UPD_MARKERS',
        payload: {
            markers
        }
    }
};

export let showMark = () => {
    return {
        type: 'SHOW_MARKERS'
    }
};

export let saveMark = () => {
    return {
        type: 'SAVE_MARKERS'
    }
};

export let deleteMark = () => {
    return {
        type: 'DEL_MARKERS'
    }
};