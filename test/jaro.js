var strcmp = require('../strcmp'),
    expect = require('expect.js'),
    opts = {
        algorithm: 'jaro',
        precision: 3
    };
    
describe('jaro distance string comparison', function() {
    it('should be able to compare strings that are EXACTLY equal', function() {
        expect(strcmp('abc', 'abc', opts)).to.equal(1);
        expect(strcmp('abba', 'abba', opts)).to.equal(1);
        expect(strcmp('a b c', 'a b c', opts)).to.equal(1);
        expect(strcmp('WEST END', 'WEST END', opts)).to.equal(1);
    });
    
    it('should be able to evaluate string similarity', function() {
        expect(strcmp('DWAYNE', 'DUANE', opts)).to.equal(0.822);
        expect(strcmp('DIXON', 'DICKSONX', opts)).to.equal(0.767);
    });
    
    it('should handle transpositions', function() {
        expect(strcmp('MARTHA', 'MARHTA', opts)).to.equal(0.944);
    });
    
    it('should handle total mis-matches', function() {
        expect(strcmp('NOT', 'SAME', opts)).to.equal(0);
    });
});