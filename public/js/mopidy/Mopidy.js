define(["./RpcSocket", "./Playback"], function(Socket, Playback) {
    "use strict";
    
    // Constructor --------------------------------------
    function Mopidy() {
        this.playback = null;
        
        this._socket = new Socket("ws://192.168.1.116:6680/mopidy/ws");
        this._eventHandlers = {};
        
        this._socket.on("open", _onSocketOpen);
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
        this.playback = new Playback(this._socket);
        
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