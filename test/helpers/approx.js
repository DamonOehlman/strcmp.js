Number.prototype.approxEql = function(val) {
    return Math.abs(this - val) < 1e-5;
}