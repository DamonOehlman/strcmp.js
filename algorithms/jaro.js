/* jshint node: true */
"use strict";

var toArray = Array.prototype.slice;
var placeholder = "";

function getCommon(s1, s2, opts) {
  var matches = [];
  var matchChar;
  var index;
  var diff;

  for (var ii = 0, count = s1.length; ii < count; ii++) {
    index = s2.indexOf(s1[ii]);
    diff = Math.abs(index - ii);

    if (index >= 0 && diff <= opts.matchWindow) {
      matches = matches.concat(s2.splice(index, 1, null));
    }
  }

  return matches;
}

function extractMatches(s1, s2, chars, opts) {
  var m1 = [];
  var m2 = [];
  var index1;
  var index2;
  var diff;

  // convert s1 and s2 to arrays
  s1 = toArray.call(s1);
  s2 = toArray.call(s2);

  for (var ii = 0, count = chars.length; ii < count; ii++) {
    index1 = s1.indexOf(chars[ii]);
    index2 = s2.indexOf(chars[ii]);
    diff = Math.abs(index1 - index2);

    if (index1 >= 0 && index2 >= 0 && diff <= opts.matchWindow) {
      m1[index1] = s1[index1];
      s1[index1] = " ";

      m2[index2] = s2[index2];
      s2[index2] = " ";
    }
  }

  return [m1.filter(notEmpty), m2.filter(notEmpty)];
}

function notEmpty(char) {
  return char;
}

function countTranspositions(m1, m2) {
  var transpositions = 0;
  var startIndex = 0;
  var index;

  // create a copy of m2
  m2 = [].concat(m2);

  // iterate through string 1 and determine the transition distance of characters to string 2
  for (var ii = 0, count = m1.length; ii < count; ii++) {
    // calculate the index
    index = m2.indexOf(m1[ii]);

    // if we have match, then splice the character out of s2
    if (index >= 0) {
      // increment the transposition distance
      transpositions += Math.abs(index - ii);
      m2[index] = " ";
    }

    // console.log(m1[ii], m2, index, ii - index, transpositions);
  }

  return transpositions;
}

module.exports = function(s1, s2, opts) {
  var common;
  var matches;
  var transpositions;

  if (s1 === ("" || undefined || null) || s2 === ("" || null || undefined)) {
    return 0;
  }

  // initialise options
  opts = opts || {};

  // initialise the match window
  opts.matchWindow = opts.matchWindow || 3;

  // if we are ignoring case, convert s1 and s2 to lower case strings
  if (typeof opts.ignoreCase == "undefined" || opts.ignoreCase) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  }

  // get the common characters
  common = getCommon(s1, toArray.call(s2), opts);

  // if we have no common characters, return 0
  if (common.length === 0) return 0;

  // extract the matches from the two strings
  matches = extractMatches(s1, s2, common, opts);

  // calculate the transpositions from m2 to m1
  transpositions = countTranspositions(matches[1], matches[0]) / 2;

  // console.log(common, matches[0], matches[1]);
  // console.log(common.length, s1.length, s2.length, transpositions);

  return (
    (common.length / s1.length +
      common.length / s2.length +
      (common.length - transpositions) / common.length) /
    3
  );
};
