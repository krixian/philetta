define("Socket", function() {
    "use strict";
    
    // Constructor
    function Socket(url) {
        this._socket = new WebSocket(url);
        this._eventHandlers = {};
        
        this._socket.onmessage = onMessage.bind(this);
    }
    
    function onMessage(e) {
        var data = JSON.parse(e.data),
            socket = this;
        fireEvent(data, socket);
    }
    
    function fireEvent(data, socket) {
        var event = data.event, handlers = socket._eventHandlers[event];
        if (handlers && handlers.length && handlers.length > 0) {
            var i = handlers.length;
            while (i--) {
                handlers[i](data);
            }
        } else {
            console.log("Unhandled event: " + event);
        }
    }
    
    function eventHandler(event, handler) {
        if (this._eventHandlers[event] === undefined)
            this._eventHandlers[event] = [];
        this._eventHandlers[event].push(handler);
    }
    
    function sendMessage(method, parameters) {
        var rpc = {
            jsonrpc: "2.0",
            id: 1,
            method: method
        }
        if (parameters !== undefined && parameters !== null) rpc["params"] = parameters;
        this._socket.send(JSON.stringify(rpc));
    }
    
    function closeConnection() {
        this._socket.close();
    }
    
    // Public methods
    Socket.prototype = {
        "constructor": Socket,
        "on": eventHandler,
        "call": sendMessage,
        "close": closeConnection
    };
    
    return Socket;
});