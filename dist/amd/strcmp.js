
define('strcmp', [], function() {
    var jaro = (function() {
        
        var toArray = Array.prototype.slice,
            placeholder = ''
        
        function getCommon(s1, s2, opts) {
            var matches = [],
                matchChar;
                
            for (var ii = 0, count = s1.length; ii < count; ii++) {
                var index = s2.indexOf(s1[ii]),
                    diff = Math.abs(index - ii);
                
                if (index >= 0 && diff <= opts.matchWindow) {
                    matches = matches.concat(s2.splice(index, 1, null));
                }
            }
            
            return matches;
        }
        
        function extractMatches(s1, s2, chars, opts) {
            var m1 = [], m2 = [];
            
            // convert s1 and s2 to arrays
            s1 = toArray.call(s1);
            s2 = toArray.call(s2);
            
            for (var ii = 0, count = chars.length; ii < count; ii++) {
                var index1 = s1.indexOf(chars[ii]),
                    index2 = s2.indexOf(chars[ii]),
                    diff = Math.abs(index1 - index2);
                    
                if (index1 >= 0 && index2 >= 0 && diff <= opts.matchWindow) {
                    m1[index1] = s1[index1];
                    s1[index1] = ' ';
                    
                    m2[index2] = s2[index2];
                    s2[index2] = ' ';
                }
            }
            
            return [m1.filter(notEmpty), m2.filter(notEmpty)];
        }
        
        function notEmpty(char) {
            return char;
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
            var common = getCommon(s1, toArray.call(s2), opts), matches, transpositions;
            
            // console.log(common);
            
            // if we have no common characters, return 0
            if (common.length === 0) return 0;
            
            // extract the matches from the two strings
            matches = extractMatches(s1, s2, common, opts);
            // console.log(matches);
            
            // calculate the transpositions from m2 to m1
            transpositions = countTranspositions(matches[1], matches[0]) / 2;
                
            // console.log(common, matches[0], matches[1]);
            // console.log(common.length, s1.length, s2.length, transpositions);
            
            return (common.length / s1.length + common.length / s2.length + (common.length - transpositions) / common.length) / 3;
        };
    }());
    function jaroWinkler(s1, s2, opts) {
        var dj = jaro(s1, s2, opts),
            commonPrefixLen = 0;
            
        // if the jaro distance is 0, then pass that on
        if (dj === 0) return 0;
            
        // ensure we have opts
        opts = opts || {};
        
        // initialise the max prefix len
        opts.maxPrefixLen = opts.maxPrefixLen || 4;
        
        // initialise the weight
        opts.weight = opts.weight || 0.1;
            
        // if we are ignoring case, convert s1 and s2 to lower case strings
        if (typeof opts.ignoreCase == 'undefined' || opts.ignoreCase) {
            s1 = s1.toLowerCase();
            s2 = s2.toLowerCase();
        }
        
        // calculate the common prefix length up to the maximum
        for (var ii = 0, count = Math.min(s1.length, opts.maxPrefixLen + 1); ii < count; ii++) {
            if (s1[ii] !== s2[ii]) break;
            
            commonPrefixLen = ii + 1;
        }
        
        return dj + (commonPrefixLen * opts.weight * (1 - dj));
    }
    
    function strcmp(s1, s2, opts) {
        var comparer, result, algorithm;
    
        // if opts is specified and is a string, then it is the algorithm name
        if (typeof opts == 'string' || (opts instanceof String)) {
            opts = {
                algorithm: opts
            };
        }
        
        // ensure we have opts
        opts = opts || {};
        
        // initialise the algorithm function name
        algorithm = (opts.algorithm || '').split('-').map(function(item, index) {
            return index > 0 ? item[0].toUpperCase() + item.slice(1) : item;
        }).join('');
        
        // grab the comparer function
        comparer = strcmp[algorithm];
        
        // if we have no comparer than raise an error
        if (typeof comparer != 'function') {
            throw new Error('Unable to find comparison algorithm: ' + opts.algorithm);
        }
        
        // compare the two strings
        result = comparer(s1, s2, opts);
        
        // if a precision has been specified, then round the result
        if (opts.precision) {
            var factor = Math.pow(10, opts.precision);
    
            result = Math.round(result * factor) / factor;
        }
        
        // return the result
        return result;
    }
    
    // bind the alrogithms to the strcmp function
    strcmp.jaro = jaro;
    strcmp.jaroWinkler = jaroWinkler;
    
    return typeof strcmp != 'undefined' ? strcmp : undefined;
});