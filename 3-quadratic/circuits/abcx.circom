pragma circom 2.0.0;

// ax^2 + bx + c = right
// Prove that x is known

template Abcx () {
    // Public inputs
    signal input a;
    signal input b;
    signal input c;
    signal input right;
    // Private inputs
    signal input x;

    // x^2 (constraint)
    signal xSquared <== x * x;
    // ax^2 (constraint)
    signal axSquared <== a * xSquared;

    // bx + c
    var bxPlusC = b * x + c;

    // ax^2 + bx + c == right (constraint)
    axSquared + bxPlusC === right;

}

// a,b,c,right all defined as public inputs
component main {public [a,b,c,right]} = Abcx();