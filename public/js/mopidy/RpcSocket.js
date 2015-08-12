define(function() {
    "use strict";
    
    // Constructor --------------------------------------
    function RpcSocket(url) {
        this._socket = new WebSocket(url);
        this._eventHandlers = {};
        
        this._queuedCalls = [];
        this._isAwaitingResult = false;
        this._resultCallback = null;
        
        this._socket.onopen = _onOpen.bind(this);
        this._socket.onmessage = _onMessage.bind(this);
    }
    
    // Instance methods ---------------------------------
    RpcSocket.prototype = {
        constructor: RpcSocket,
        on: on,
        call: call,
        close: close
    }
    
    // Public methods -----------------------------------
    function on(event, handler) {
        if (!this._eventHandlers[event])
            this._eventHandlers[event] = [];
            
        this._eventHandlers[event].push(handler);
    }
    
    function call(method, parameters, callback) {
        if (this._isAwaitingResult) {
            this._queuedCalls.push({
                method: method,
                parameters: parameters,
                callback: callback
            });
        } else {
            var rpc = _createRpcJson(method, parameters);
        
            if (callback) {
                this._isAwaitingResult = true;
                this._resultCallback = callback;
            }
        
            this._socket.send(rpc);
        }
    }
    
    function close() {
        this._socket.close();
    }
    
    // Private methods ----------------------------------
    function _createRpcJson(method, parameters) {
        var rpc = {
            jsonrpc: "2.0",
            id: 1,
            method: method
        };
        if (parameters) rpc.params = parameters;
        return JSON.stringify(rpc);
    }
    
    function _onOpen(e) {
        e.event = "open";
        _fireEvent(e, this);
    }
    
    function _onMessage(e) {
        var data = JSON.parse(e.data),
            rpcSocket = this,
            isResult = data.result !== undefined;
        
        if (isResult && rpcSocket._isAwaitingResult) {
            rpcSocket._resultCallback(data.result);
            rpcSocket._resultCallback = null;
            rpcSocket._isAwaitingResult = false;
            _nextQueued(rpcSocket);
        } else if (data.error) {
            alert("Error from socket: " + data.error.message + ": " + data.error.data);
        } else {
            _fireEvent(data, rpcSocket);
        }
    }
    
    function _nextQueued(rpcSocket) {
        while (rpcSocket._queuedCalls.length > 0) {
            var call = rpcSocket._queuedCalls.shift();
            rpcSocket.call(call.method, call.parameters, call.callback);   
        }
    }
    
    function _fireEvent(data, rpcSocket) {
        var event = data.event,
            handlers = rpcSocket._eventHandlers[event];
        
        if (handlers) {
            for (var i = 0; i < handlers.length; i++) {
                handlers[i](data);
            }
        }
    }
    
    return RpcSocket;
});