
requirejs(["mopidy/RpcSocket", "mopidy/Playback"], function(Socket, Playback) {
    
    var test = new Socket("ws://192.168.1.116:6680/mopidy/ws");
    test.on("socket_opened", function(e) {
        console.log("Connection opened!");
        document.body.className = "";
        playback = new Playback(test);
        
        playback.on("track_updated", updateTrack);
    });
    
    test.on("track_playback_started", function(e) {
        updateTrack(e.tl_track);
    });
    
    var playback = null;
    
    function onClose(e) {
        this.close();
    }
    
    window.addEventListener("beforeunload", onClose.bind(test), false);
    
    var controls = document.getElementsByClassName("controls")[0].childNodes,
        ci = controls.length;
    
    function controlIt(e) {
        var button = e.currentTarget,
            cmd = button.getAttribute("data-cmd");
        switch (cmd) {
            case "play":
                var state = playback.togglePause();
                setStateButton(state, e.currentTarget);
                break;
            case "stop":
                playback.stop();
                break;
            case "previous":
                playback.previous();
            case "next":
                playback.next();
                break;
            case "popup":
                var element = document.getElementsByClassName("now-playing")[0],
                    display = element.style.display,
                    isVisible = (display === "block");
                
                button.className = isVisible ? "" : "down";
                element.style.display = isVisible ? "none" : "block";
                break;
        }
    }
    
    while(ci--) {
        controls[ci].addEventListener("click", controlIt, false);
    }
    
    function setStateButton(state, button) {
        button
        .childNodes[0] //svg
        .childNodes[0] //use
        .setAttribute("xlink:href", (state === 1) ? "#control-play" : "#control-pause");
    }
    
    function updateTrack(track) {
        track = track.track;
        if (track) {
            var artists = "";
            for (var i = 0; i < track.artists.length; i++) {
                artists += track.artists[i].name;
                if (i > 1) {
                    artists += ", ";
                } else if (i == 1) {
                    artists += " and ";
                }
            }
            
            document.getElementById("track").innerHTML = track.name;
            document.getElementById("artists").innerHTML = artists;
        } else {
            document.getElementById("track").innerHTML = "Nothing playing";
            document.getElementById("artists").innerHTML = "";
        }
    }
    
    
});