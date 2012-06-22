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