/* jshint node: true */
'use strict';

var jaro = require('./algorithms/jaro');
var jaroWinkler = require('./algorithms/jaro-winkler');

/**
  # strcmp.js

  Some string comparison functions which have been written to help me grok
  the algorithms.  If you are after this kind of thing and more natural
  language goodness, I'd recommend checking out
  [natural](https://github.com/NaturalNode/natural).

  __NOTE:__ I'm not a maths / algorithms geek, and the implementation here 
  could probably be sped up / made more correct by someone if they wanted to.
  If you are that kind of person though, your time is probably better spent
  refining the implementation in the natural library.

  ## Example Usage

  At the moment, check out the tests for example usage, but it kind of
  looks like this:

  ```js
  strcmp('MARTHA', 'MARHTA', { algorithm: 'jaro', precision: 3 });
  // --> 0.944

  strcmp('MARTHA', 'MARHTA', { algorithm: 'jaro-winkler', precision: 3 });
  // --> 0.961
  ```

  OR

  ```js
  strcmp.jaro('MARTHA', 'MARHTA');
  // --> 0.9444444444444445

  strcmp.jaroWinkler('MARTHA', 'MARHTA');
  // --> 0.9611111111111111
  ```
**/

var strcmp = module.exports = function(s1, s2, opts) {
  var comparer;
  var result;
  var algorithm;
  var factor;

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
    factor = Math.pow(10, opts.precision);
    result = Math.round(result * factor) / factor;
  }
  
  // return the result
  return result;
};

// bind the alrogithms to the strcmp function
strcmp.jaro = jaro;
strcmp.jaroWinkler = jaroWinkler;