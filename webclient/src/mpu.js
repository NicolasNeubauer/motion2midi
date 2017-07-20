const hasMPU = () => window.DeviceOrientationEvent != undefined;

var listenToOrientation = function(gravityCallback, orientationCallback, resolution) {

    var lastOrientation = window.orientation;
    var currentOrientation = lastOrientation;

    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
    } else {
        return;
    }

    function deviceOrientationHandler(evt) {
        var deviceOrientationData = evt;
        try {
            gravityCallback(
                Math.round(((evt.alpha + 180) % 360) * resolution) / resolution,
                Math.round((evt.beta * resolution) / resolution));
        } catch (ex) {
            console.log(ex);
        }

        if (currentOrientation != window.orientation) {
            lastOrientation = currentOrientation;
            currentOrientation = window.orientation;
            orientationCallback(lastOrientation, currentOrientation)
        }
    }
}


export {
    hasMPU,
    listenToOrientation
}
