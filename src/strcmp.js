//= distance/

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