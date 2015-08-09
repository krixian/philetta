
requirejs(["Socket"], function(Socket) {
    
    var test = new Socket("ws://192.168.1.116:6680/mopidy/ws");
    test.on("connected", function(e) {
        console.log("Test");
        test.call("core.playback.get_state"); 
    });
    test.on("track_playback_started", function(e) {
        var track = e.tl_track.track;
        var artists = "";
        var i = track.artists.length;
        while (i--) {
            artists += track.artists[i].name;
            if (i > 1) {
                artists += ", ";
            } else if (i == 1) {
                artists += " and ";
            }
        }
        
        /*document.getElementById("track").innerHTML = track.name;
        document.getElementById("album").innerHTML = track.album.name;
        document.getElementById("artist").innerHTML = artists;*/
    });
    
    function onClose(e) {
        this.close();
    }
    
    window.addEventListener("beforeunload", onClose.bind(test), false);
    
    var controls = document.getElementsByClassName("controls")[0].childNodes,
        ci = controls.length;
    
    function controlIt(e) {
        var cmd = "core.playback." +
            e.target.innerHTML.toLowerCase();
        test.call(cmd);
    }
    
    while(ci--) {
        controls[ci].addEventListener("click", controlIt, false);
    }
    
    
});