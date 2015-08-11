
requirejs(["mopidy/RpcSocket", "mopidy/Playback", "templar/templar"], function(Socket, Playback, templar) {
    
    var test = new Socket("ws://192.168.1.116:6680/mopidy/ws");
    test.on("socket_opened", function(e) {
        console.log("Connection opened!");
        document.body.className = "";
        playback = new Playback(test);
        
        playback.on("track_changed", updateTrack);
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
                playback.togglePause();
                setStateButton(playback.isPlaying, e.currentTarget);
                break;
            case "stop":
                playback.stop();
                break;
            case "previous":
                playback.previous();
                break;
            case "next":
                playback.next();
                break;
            case "popup":
                var element = document.getElementsByClassName("now-playing")[0],
                    isVisible = (element.className === "now-playing show");
                
                button.className = isVisible ? "" : "down";
                element.className = isVisible ? "now-playing" : "now-playing show";
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
        .setAttribute("xlink:href", state ? "#control-play" : "#control-pause");
    }
    
    function updateTrack(track) {
        var vm = { track: "-", artists: "-" };
        track = track.track;
        if (track) {
            var artists = "";
            for (var i = 0; i < track.artists.length; i++) {
                artists = artists + track.artists[i].name;
                if (i < track.artists.length - 2) {
                    artists += ", ";
                } else if (i == track.artists.length - 2) {
                    artists += " and ";
                }
            }
            
            vm.track = track.name;
            vm.artists = artists;
        }
        templar(vm, "tl-now-playing");
    }
    
});