define(function() {
    "use strict";
    
    // Constructor --------------------------------------
    function Library(socket) {
        this._socket = socket;
        this._eventHandlers = {};
        this.rootDirectories = [];
        
        // this._socket.call("core.library.browse", {uri: null}, _cbBrowseRoot.bind(this));
    }
    
    // Instance methods ---------------------------------
    Library.prototype = {
        constructor: Library,
        search: search,
        on: on
    }
    
    // Public methods -----------------------------------
    function search(query) {
        this._socket.call("core.library.search", { query: {"any": [query]}, uris: ["spotify:"] }, _cbSearch.bind(this));
    }
    
    function on(event, handler) {
        if (!this._eventHandlers[event])
            this._eventHandlers[event] = [];
            
        this._eventHandlers[event].push(handler);
    }
    
    // Private methods ----------------------------------
    function _cbSearch(result) {
        _fireEvent("searchresult", result, this);
    }
    
    function _fireEvent(event, eventArgs, library) {
        var handlers = library._eventHandlers[event];
        console.log("Library event: " + event);
        
        if (handlers) {
            for (var i = 0; i < handlers.length; i++) {
                (handlers[i].bind(library))(eventArgs);
            }
        }
    }
    
    return Library;
});