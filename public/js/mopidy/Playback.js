define(function() {
    "use strict";
    
    // Constructor --------------------------------------
    function Playback(socket) {
        this._socket = socket;
    }
    
    // Instance methods ---------------------------------
    Playback.prototype = {
        constructor: Playback,
        play: play,
        stop: stop,
        pause: pause,
        next: next,
        previous: previous,
        seek: seek
    }
    
    // Static properties --------------------------------
    Playback.STATE = {
        "PAUSED": 0,
        "PLAYING": 1,
        "STOPPED": 2
    }
    
    // Public methods -----------------------------------
    function play(track) {
        _callSocket(this._socket, "play", track);
    }
    
    function stop() {
        _callSocket(this._socket, "stop");
    }
    
    function pause() {
        _callSocket(this._socket, "pause");
    }
    
    function next() {
        this.play();
        _callSocket(this._socket, "next");
    }
    
    function previous() {
        this.play();
        _callSocket(this._socket, "previous");
    }
    
    function seek(position) {
        _callSocket(this._socket, "seek", position);  
    }
    
    // Private methods ----------------------------------
    function _callSocket(socket, method, parameter) {
        method = "core.playback." + method;
        socket.call(method, parameter);
    }
    
    return Playback;
});