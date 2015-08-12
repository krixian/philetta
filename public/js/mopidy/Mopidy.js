define(["./RpcSocket", "./Playback", "./Mixer"], function(Socket, Playback, Mixer) {
    "use strict";
    
    // Constructor --------------------------------------
    function Mopidy() {
        this.isReady = false;
        this.playback = null;
        this.mixer = null;
        
        this._socket = new Socket("ws://192.168.1.116:6680/mopidy/ws");
        this._eventHandlers = {};
        
        this._socket.on("open", _onSocketOpen.bind(this));
    }
    
    // Instance methods ---------------------------------
    Mopidy.prototype = {
        constructor: Mopidy,
        close: close,
        on: on
    }
    
    // Public methods -----------------------------------
    function close() {
        this._socket.close();
    }
    
    function on(event, handler) {
        if (!this._eventHandlers[event])
            this._eventHandlers[event] = [];
        this._eventHandlers[event].push(handler);
    }
    
    // Private methods ----------------------------------
    function _onSocketOpen(e) {
        this.isReady = true;
        this.playback = new Playback(this._socket);
        this.mixer = new Mixer(this._socket);
        
        _fireEvent("ready", this);
    }
    
    function _fireEvent(event, mopidy) {
        var handlers = mopidy._eventHandlers[event];
        console.log("Mopidy event: " + event);
        
        if (handlers) {
            for (var i = 0; i < handlers.length; i++) {
                handlers[i]();
            }
        }
    }
    
    return Mopidy;
});