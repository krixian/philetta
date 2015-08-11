define(function() {
    "use strict";
    
    var regex = /({{\s*(.+?)\s*}})/g;
    var templates = {};
    
    function templar(model, templateId) {
        var template = templar.parse(model, templateId);
        templates[templateId].elm.innerHTML = template;
    }
    
    templar.parse = function(model, templateId) {
        if (templates[templateId] === undefined) {
            var elm = document.getElementById(templateId);
            templates[templateId] = {
                elm: elm,
                markup: elm.innerHTML
            };
        }
        
        var template = templates[templateId].markup,
            match = null;
        
        while ((match = regex.exec(template)) !== null) {
            var re = new RegExp(match[1], "g"),
                value = model[match[2]];
            
            if (value) {
                template = template.replace(re, value);
            } else {
                template = template.replace(re, "");
            }
        }
        
        return template;
    };
    
    return templar;
    
});