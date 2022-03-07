/**
 * Generate the first n terms of the fibonacci series.
 *
 * @param  {Number} n   The number of terms.
 * @return {terms}      The first n terms of the fibonacci series.
 *
 */
function GenerateFibonacciNumberOfTerms(n) {
    var terms = [];
    var i = 2;

    terms[0] = 1;
    terms[1] = 2;

    while (i < terms) {
        terms[i] = terms[i - 1] + terms[i - 2];
        i++;
    }

    return terms;
}

/**
 * Generate the fibonacci series until the term value exceeds a limit.
 *
 * @param  {Number} limit   The value limit of fibonacci terms.
 * @return {terms}          The fibonacci series until terms exceed limit.
 *
 */
function GenerateFibonacciUpToValueLimit(limit) {
    var terms = [];
    var i = 2;

    terms[0] = 1;
    terms[1] = 2;

    while (terms[i - 1] + terms[i - 2] < limit) {
        terms[i] = terms[i - 1] + terms[i - 2];
        i++;
    }

    return terms;
}

/**
 * Check if a number is prime.
 *
 * @param  {Number} n       The number to check is prime or not.
 * @return {Boolean}        If the number is prime or not.
 *
 */
function IsPrime(n) {
    for (var i = Math.floor(Math.sqrt(n)); i > 1; i--) {
        if (n % i == 0) {
            return false;
        }
    }

    return true;
}

/**
 * Return all prime numbers up to a limit.
 *
 * @param  {Number} limit   The largest number to check is prime.
 * @return {primes}         An array of all primes under the limit.
 *
 */
function SieveOfEratosthenes(limit) {
    // generate prime numbers up to limit
    // add one because I want array positions to match to numbers
    var largestPrime = Math.floor(Math.sqrt(limit)) + 1;
    var sieve = [];

    // populate sieve
    // -1 is prime, 0 is not prime, 1 is unknown
    for (var i = 0; i < largestPrime; i++) {
        sieve[i] = 1;
    }

    sieve[0] = 0;
    sieve[1] = 0;

    // start from 2, 1 is not prime
    for (var i = 2; i + 1 < largestPrime; ) {
        // once we find a prime, mark that number as prime and flag all multiples as not prime
        if (IsPrime(i)) {
            sieve[i] = -1;

            // flag multiples as not prime
            for (var j = 2; i * j < largestPrime; j++) {
                sieve[i * j] = 0;
            }

            // find the next unmarked number
            while (sieve[i] != 1 && i + 1 < largestPrime) {
                i++;
            }
        }
    }

    // filter primes
    var primes = [];

    for (var i = 0; i < sieve.length; i++) {
        if (sieve[i] == -1) {
            primes.push(i);
        }
    }

    return primes;
}

/**
 * Calculate all prime factors of a number.
 *
 * @param  {Number} n           Number to calculate prime factors for.
 * @return {primeFactors}       All prime factors of a number.
 *
 */
function CalculatePrimeFactors(n) {
    // generate all possible primes to use
    var primes = SieveOfEratosthenes(n);

    // hold a list of prime factors
    var primeFactors = [];

    // keep checking factors until we discover them all
    while (n > 1) {
        // start from the first each time..
        for (var i = 0; i < primes.length; i++) {
            // check if we can divide n by the prime..
            if (n % primes[i] == 0) {
                // if so, reduce n by the prime
                n = n / primes[i];

                // log which prime it was
                primeFactors.push(primes[i]);

                // go back to the start
                break;
            } // else jump to the next prime until we find one. by definition there has to be one.
        }
    }

    return primeFactors;
}

module.exports = {
    GenerateFibonacciNumberOfTerms,
    GenerateFibonacciUpToValueLimit,
    IsPrime,
    SieveOfEratosthenes,
    CalculatePrimeFactors
};
