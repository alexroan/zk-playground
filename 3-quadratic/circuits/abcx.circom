pragma circom 2.0.0;

template Abcx () {
    signal input a;
    signal input b;
    signal input c;
    signal input right;
    signal input x;

    signal xSquared <== x * x;
    signal axSquared <== a * xSquared;

    signal bxPlusC <== b * x + c;

    axSquared + bxPlusC === right;

}

component main {public [a,b,c,right]} = Abcx();