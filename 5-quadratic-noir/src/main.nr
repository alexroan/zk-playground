fn sqr(x : Field) -> Field {
    x * x
}

// x^2 + x + 5 = 11
// Answer: x = 2
fn main(x : Field) {
    constrain sqr(x) + x + 5 == 11;
}

#[test]
fn test_main() {
    main(2);
    // Uncomment these to fail
    // main(1);
    // main(3);
}

#[test]
fn test_sqr() {
    for i in 0..10 {
        constrain sqr(i) == i * i;
    }
}
