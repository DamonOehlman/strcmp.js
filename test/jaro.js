var test = require('tape');
var strcmp = require('../');
var opts = {
  algorithm: 'jaro',
  precision: 3
};
    
test('compare strings that are EXACTLY equal', function(t) {
  t.plan(4);
  t.equal(strcmp('abc', 'abc', opts), 1);
  t.equal(strcmp('abba', 'abba', opts), 1);
  t.equal(strcmp('a b c', 'a b c', opts), 1);
  t.equal(strcmp('WEST END', 'WEST END', opts), 1);
});

test('evaluate string similarity', function(t) {
  t.plan(2);
  t.equal(strcmp('DWAYNE', 'DUANE', opts), 0.822);
  t.equal(strcmp('DIXON', 'DICKSONX', opts), 0.767);
});

test('handle transpositions', function(t) {
  t.plan(1);
  t.equal(strcmp('MARTHA', 'MARHTA', opts), 0.944);
});

test('handle total mis-matches', function(t) {
  t.plan(1);
  t.equal(strcmp('NOT', 'SAME', opts), 0);
});