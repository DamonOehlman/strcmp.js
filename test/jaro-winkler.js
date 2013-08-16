var test = require('tape');
var strcmp = require('../');
var opts = {
  algorithm: 'jaro-winkler',
  precision: 3
};

test('compare strings that are EXACTLY equal', function(t) {
  t.plan(2);
  t.equal(strcmp('abc', 'abc', opts), 1);
  t.equal(strcmp('abba', 'abba', opts), 1);
});

test('evaluate string similarity', function(t) {
  t.plan(2);
  t.equal(strcmp('DWAYNE', 'DUANE', opts), 0.84);
  t.equal(strcmp('DIXON', 'DICKSONX', opts), 0.813);
});

test('handle transpositions', function(t) {
  t.plan(1);
  t.equal(strcmp('MARTHA', 'MARHTA', opts), 0.961);
});

test('handle total mis-matches', function(t) {
  t.plan(1);
  t.equal(strcmp('NOT', 'SAME', opts), 0);
});