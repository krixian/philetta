define(function() {
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
    
    return {
        parseArtists: parseArtists
    };
});