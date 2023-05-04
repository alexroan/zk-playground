pragma circom 2.0.0;

function sqr(x) {
    return x*x;
}

// x^2 + x + 5 = 11
// Answer: x = 2

template Quadratic () {
    signal input x;
    signal output right;

    var first = sqr(x);
    var second = x;
    var third = 5;
    var sum = first + second + third;
    right <== sum;
    assert(right == 11);
}

component main = Quadratic();
