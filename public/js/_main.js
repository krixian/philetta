
requirejs(["mopidy/Mopidy", "templar/templar"], function(Mopidy, templar) {

    var mopidy = new Mopidy();
    mopidy.on("ready", function() {
        document.body.removeAttribute("class");
        
        mopidy.playback.on("trackchanged", updateTrack);
        mopidy.playback.on("statechanged", updateState);
    });
    
    function updateTrack(track) {
        var vm = { title: "Not playing", artists: "" };
        if (track) {
            var artists = "",
                j = track.artists.length,
                k = j - 2;
                
            for (var i = 0; i < j; i++) {
                artists += track.artists[i].name;
                if (i < k) {
                    artists += ", ";
                } else if (i == k) {
                    artists += " and ";
                }
            }
            
            vm.title = track.name;
            vm.artists = artists;
        }
        templar(vm, "tl-now-playing");
    }
    
    function updateState(isPlaying) {
        document.getElementById("play") // <div>
            .childNodes[0]              // <svg>
            .childNodes[0]              // <use>
            .setAttribute("xlink:href",
                isPlaying
                ? "#control-pause"
                : "#control-play");
    }
    
    var controls = document.getElementsByClassName("controls")[0].childNodes,
        ci = controls.length;
    
    while(ci--) {
        controls[ci].addEventListener("click", controlIt, false);
    }
    
    function controlIt(e) {
        if (mopidy.isReady) {
            var button = e.currentTarget,
                cmd = button.getAttribute("data-cmd");
            switch (cmd) {
                case "play":
                    playback.togglePause();
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
    }
});