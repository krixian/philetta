define(function() {
    "use strict";
    
    // Constructor --------------------------------------
    function Mixer(socket) {
        this._socket = socket;
        this.setVolume(100);
    }
    
    // Instance methods ---------------------------------
    Mixer.prototype = {
        constructor: Mixer,
        setVolume: setVolume
    }
    
    // Public methods -----------------------------------
    function setVolume(volume) {
        this._socket.call("core.mixer.set_volume", [volume]);
    }
    
    return Mixer;
});