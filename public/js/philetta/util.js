define(["../templar/templar"], function(templar) {
    function parseArtists(artists) {
        var result = "",
            j = artists.length,
            k = j - 2;
            
        for (var i = 0; i < j; i++) {
            result += artists[i].name;
            if (i < k) {
                result += ", ";
            } else if (i == k) {
                result += " and ";
            }
        }
        
        return result;
    }
    
    function resultsToList(list, results, handler) {
        list.innerHTML = "";
        if (results) {
            for (var i = 0; i < Math.min(results.length, 6); i++) {
                var result = results[i],
                    listItem = document.createElement("li"),
                    tl = { title: result.name };
                
                if (result["__model__"] !== "Artist") {
                    tl.subtitle = parseArtists(result.artists);
                }
                
                listItem.innerHTML = templar.parse(tl, "tl-search-result");
                listItem.setAttribute("data-type", result.__model__);
                listItem.setAttribute("data-uri", result.uri);
                listItem.addEventListener("click", handler, false);
                list.appendChild(listItem);
            }
        }
    }
    
    return {
        parseArtists: parseArtists,
        resultsToList: resultsToList
    };
});