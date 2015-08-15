define(function() {
    
    function registerList(listElement, commandSet) {
        var listItems = listElement.children,
            i = listItems.length;
        
        while (i--) {
            var cmd = commandSet[listItems[i].getAttribute("data-cmd")];
            if (cmd) {
                listItems[i].addEventListener("click", cmd, false);
            }
        }
    }
    
    return {
        registerList: registerList
    };
    
});