
requirejs(["mopidy/Mopidy", "templar/templar", "philetta/commands", "philetta/util"], function(Mopidy, templar, commands, util) {

    var mopidy = new Mopidy();
    mopidy.on("ready", function() {
        registerCommands();
        document.body.removeAttribute("class");
        
        mopidy.playback.on("trackchanged", updateTrack);
        mopidy.playback.on("statechanged", updateState);
        mopidy.library.on("searchresult", updateSearchResults);
    });
    
    function updateTrack(track) {
        var vm = { title: "Not playing", artists: "" };
        if (track) {
            vm.title = track.name;
            vm.artists = util.parseArtists(track.artists);
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
    
    function itemSelected(e) {
        var item = e.currentTarget,
            itemType = item.getAttribute("data-type"),
            itemUri = item.getAttribute("data-uri");
        
        alert("Type: " + itemType + "\r\nUri: " + itemUri);
    }
    
    function updateSearchResults(results) {
        document.getElementById("search").className = "search";
                
        var albumList = document.getElementById("search-albums"),
            artistList = document.getElementById("search-artists"),
            trackList = document.getElementById("search-tracks");
            
        results = results[0];
        if (results) {
            util.resultsToList(albumList, results.albums, itemSelected);
            util.resultsToList(artistList, results.artists, itemSelected);
            util.resultsToList(trackList, results.tracks, itemSelected);
        }
    }
    
    function search(e) {
        var input = this[0],
            query = input.value;
        if (query) {
            input.blur();
            mopidy.library.search(query);
        }
        e.preventDefault();
        return false;
    }
    
    function registerCommands() {
        var menuList = document.getElementById("menu"),
            controlList = document.getElementById("controls");
            
        commands.registerList(menuList, {
            "search": function() {
                window.location.href = "#search";
                document.forms[0][0].value = "";
                document.forms[0][0].focus();
            }
        });
        
        commands.registerList(controlList, {
            "play": function () {
                mopidy.playback.togglePause();
            },
            "stop": function () {
                mopidy.playback.stop();
            },
            "previous": function () {
                mopidy.playback.previous();
            },
            "next": function () {
                mopidy.playback.next();
            },
            "popup": function(e) {
                var button = e.currentTarget,
                    element = document.getElementsByClassName("now-playing")[0],
                    isVisible = (element.className === "now-playing show");
                        
                button.className = isVisible ? "" : "down";
                element.className = isVisible ? "now-playing" : "now-playing show";
            }    
        });
    }
    
    window.addEventListener("beforeunload", function() { mopidy.close(); }, false);
    document.getElementById("search").addEventListener("submit", search, false);
});