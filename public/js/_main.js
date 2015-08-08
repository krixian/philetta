
requirejs(["Socket"], function(Socket) {
    
    var test = new Socket("ws://192.168.1.116:6680/mopidy/ws");
    test.on("connected", function(e) {
        console.log("Test");
        test.call("core.playback.get_state"); 
    });
    test.on("track_playback_started", function(e) {
        var track = e.tl_track.track;
        var artists = "";
        var d = track.artists.length, i = d;
        d--;
        while (i--) {
            var x = d-i;
            artists += track.artists[x].name;
            if (i > 1) {
                artists += ", ";
            } else if (i == 1) {
                artists += " and ";
            }
        }
        
        
        document.getElementById("track").innerHTML = track.name;
        document.getElementById("album").innerHTML = track.album.name;
        document.getElementById("artist").innerHTML = artists;
    });
    
    function onClose(e) {
        this.close();
    }
    
    window.addEventListener("beforeunload", onClose.bind(test), false);
    
});