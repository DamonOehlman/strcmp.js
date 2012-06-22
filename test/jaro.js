var strcmp = require('../pkg/cjs/strcmp'),
    expect = require('expect.js'),
    opts = {
        algorithm: 'jaro',
        precision: 3
    };
    
describe('jaro distance string comparison', function() {
    it('should be able to compare strings that are EXACTLY equal', function() {
        expect(strcmp.jaro('abc', 'abc')).to.equal(1);
        expect(strcmp.jaro('abba', 'abba')).to.equal(1);
        
        console.log(strcmp.jaro('DWAYNE', 'DUANE'));
        console.log(strcmp.jaro('DIXON', 'DICKSONX'));
    });
    
    it('should be able to evaluate string similarity', function() {
        expect(strcmp('DWAYNE', 'DUANE', opts)).to.equal(0.822);
        expect(strcmp('DIXON', 'DICKSONX', opts)).to.equal(0.767);
    });
});