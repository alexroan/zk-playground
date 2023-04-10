pragma circom 2.0.0;
  
/*This circuit template checks that c is the multiplication of a and b.*/

template Multiplier () {

   // Declaration of signals.
   signal input a;
   signal input b;
   signal output c;
     
   // Constraints.
   c <== a * b;
   // The same as:
   // a * b ==> c;
}

// This is how you define public inputs
// Needs to be at least 1 private
component main {public [a]} = Multiplier();