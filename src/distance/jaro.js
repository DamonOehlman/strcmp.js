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
    
    function extractMatches(target, chars) {
        var matches = [];
        
        // create a copy of the chars
        chars = [].concat(chars);
        
        for (var ii = 0, count = target.length; ii < count; ii++) {
            matches = matches.concat(chars.splice(chars.indexOf(target[ii]), 1, ' '));
        }
        
        return matches.filter(function(char) {
            return char !== ' ';
        });
    }
    
    function countTranspositions(m1, m2) {
        var transpositions = 0,
            startIndex = 0;
            
        // create a copy of m2
        m2 = [].concat(m2);
        
        // console.log('transpositions:');
        
        // iterate through string 1 and determine the transition distance of characters to string 2
        for (var ii = 0, count = m1.length; ii < count; ii++) {
            // calculate the index
            var index = m2.indexOf(m1[ii]);

            // if we have match, then splice the character out of s2
            if (index >= 0) {
                // increment the transposition distance
                transpositions += Math.abs(index - ii);
                m2[index] = ' ';
            }
            
            // console.log(m1[ii], m2, index, ii - index, transpositions);
        }

        return transpositions;
    }
    
    return function(s1, s2, opts) {
        // if s1 length or s2 length equals 0 return 0
        
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
        var common = getCommon(s1, s2, opts), m1, m2, transpositions;
        
        // if we have no common characters, return 0
        if (common.length === 0) return 0;
        
        // extract the common characters from s1 and s2
        m1 = extractMatches(s1, common);
        m2 = extractMatches(s2, common);
        
        // calculate the transpositions from m2 to m1
        transpositions = countTranspositions(m2, m1) / 2;
            
        // console.log(common, m1, m2);
        // console.log(common.length, s1.length, s2.length, transpositions);
        
        return (common.length / s1.length + common.length / s2.length + (common.length - transpositions) / common.length) / 3;
    };
}());