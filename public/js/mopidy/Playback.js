define(function() {
    "use strict";
    
    // Constructor --------------------------------------
    function Playback(socket) {
        this._socket = socket;
        this._eventHandlers = {};
        this.isPlaying = null;
        this.currentTrack = null;
        
        this._socket.on("playback_state_changed", _onStateChanged.bind(this));
        this._socket.on("track_playback_started", _playbackStarted.bind(this));
        
        socket.call("core.playback.get_state", null, _cbCurrentState.bind(this));
    }
    
    // Instance methods ---------------------------------
    Playback.prototype = {
        constructor: Playback,
        play: play,
        stop: stop,
        pause: pause,
        next: next,
        previous: previous,
        seek: seek,
        togglePause: togglePause,
        on: on
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
        _callSocket(this._socket, "next");
    }
    
    function previous() {
        _callSocket(this._socket, "previous");
    }
    
    function seek(position) {
        _callSocket(this._socket, "seek", position);  
    }
    
    function togglePause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    function on(event, handler) {
        if (!this._eventHandlers[event])
            this._eventHandlers[event] = [];
            
        this._eventHandlers[event].push(handler);
    }
    
    // Private methods ----------------------------------
    function _callSocket(socket, method, parameter) {
        method = "core.playback." + method;
        socket.call(method, parameter);
    }
    
    function _onStateChanged(e) {
        this.isPlaying = e.new_state === "playing";
        _fireEvent("statechanged", this.isPlaying, this);
    }
    
    function _cbCurrentState(result) {
        this.isPlaying = result === "playing";
        (_updateCurrentTrack.bind(this))();
    }
    
    function _updateCurrentTrack() {
        this._socket.call("core.playback.get_current_tl_track", null, _cbCurrentTrack.bind(this));
    }
    
    function _playbackStarted(result) {
        this.currentTrack = result.tl_track.track;
        _fireEvent("trackchanged", this.currentTrack, this);
    }
    
    function _cbCurrentTrack(result) {
        this.currentTrack = result.track;
        _fireEvent("trackchanged", this.currentTrack, this);
    }
    
    function _fireEvent(event, eventArgs, playback) {
        var handlers = playback._eventHandlers[event];
        console.log("Playback event: " + event);
        
        if (handlers) {
            for (var i = 0; i < handlers.length; i++) {
                (handlers[i].bind(playback))(eventArgs);
            }
        }
    }
    
    return Playback;
});