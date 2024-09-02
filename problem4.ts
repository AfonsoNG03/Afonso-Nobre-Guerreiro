// O(n), since the loop runs n times
func sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// O(n), since the loop runs n times
func sum_to_n_b(n: number): number {
    let sum = 0;
    while (n > 0) {
        sum += n;
        n -= 1;
    }
    return sum;
}

// O(1), since the function only performs a few operations
// Uses the formula for the sum of the first n natural numbers 
func sum_to_n_c(n: number): number {
    return n * (n + 1) / 2;
}