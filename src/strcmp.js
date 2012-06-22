//= distance/

function strcmp(s1, s2, opts) {
    var comparer, result;

    // if opts is specified and is a string, then it is the algorithm name
    if (typeof opts == 'string' || (opts instanceof String)) {
        opts = {
            algorithm: opts
        };
    }
    
    // ensure we have opts
    opts = opts || {};

    // grab the comparer function
    comparer = strcmp[opts.algorithm] || jaro;
    
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