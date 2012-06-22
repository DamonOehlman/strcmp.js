use Text::JaroWinkler qw( strcmp95 );
use strict;

my @tests = (
    ["abc", "abc",  3],
    ["abba", "abba", 4],
    ["DWAYNE", "DUANE", 5],
    ["MARTHA", "MARHTA", 6],
    ["SDNEY", "SYDNEY", 6],
    ["BAGNOO", "NOOSA", 6],
    ["BUNDANOON", "NOOSA", 9]
);
    
for my $test (@tests) {
    print $test->[0] . " <==> " . $test->[1] . " : " . strcmp95($test->[0], $test->[1], $test->[2]) . "\n";
}