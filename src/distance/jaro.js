var jaro = (function() {
    
    var toArray = Array.prototype.slice;
    
    function getCommon(s1, s2, opts) {
        var matches = [],
            matchChar;
            
        // convert s2 to an array
        s2 = toArray.call(s2);
            
        for (var ii = 0, count = s1.length; ii < count; ii++) {
            var index = s2.indexOf(s1[ii]),
                diff = Math.abs(index - ii);
            
            if (index >= 0 && diff <= opts.matchWindow) {
                matches = matches.concat(s2.splice(index, 1, ' '));
            }
        }
        
        return matches.filter(function(char) {
            return char !== ' ';
        });
    }
    
    function countTranspositions(s1, s2) {
        var transpositions = 0,
            startIndex = 0;
        
        // convert s2 to an array
        s2 = toArray.call(s2);
        
        // iterate through string 1 and determine the transition distance of characters to string 2
        for (var ii = 0, count = s1.length; ii < count; ii++) {
            // calculate the index
            var index = s2.indexOf(s1[ii]);

            console.log(s1[ii], s2, index, ii - index);
            
            // if we have match, then splice the character out of s2
            if (index >= 0) {
                // increment the transposition distance
                transpositions += (ii - index);

                s2.splice(index, 1, ' ');
            }
        }

        return transpositions;
    }
    
    return function(s1, s2, opts) {
        // initialise options
        opts = opts || {};
        
        // initialise the match window
        opts.matchWindow = opts.matchWindow || 3;
        
        // if we are ignoring case, convert s1 and s2 to lower case strings
        if (typeof opts.ignoreCase == 'undefined' || opts.ignoreCase) {
            s1 = s1.toLowerCase();
            s2 = s2.toLowerCase();
        }
        
        // get the common characters
        var common = getCommon(s1, s2, opts),
            transpositions = (countTranspositions(s1, s2) + countTranspositions(s2, s1)) / 2;
        
        console.log(common);
        console.log(common.length, s1.length, s2.length, transpositions);
        
        return (common.length / s1.length + common.length / s2.length + (common.length - transpositions) / common.length) / 3;
    };
}());