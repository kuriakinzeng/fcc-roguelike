export function getMoveVector(e){
    switch (e.keyCode) {
        case 37:
            return {x: -1, y: 0};
        case 38:
            return {x: 0, y: -1};
        case 39:
            return {x: 1, y: 0};
        case 40:
            return {x: 0, y: 1};
        default:
            return null;
    }
}

export function addVector(coordinates, vector){
    if(vector) {
        return {'x':coordinates.x+vector.x, 'y':coordinates.y+vector.y}
    } else {
        return {'x':coordinates.x, 'y':coordinates.y}
    }
}