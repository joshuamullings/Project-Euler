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
    if (n == 0 || n == 1) return false;
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
 * @param  {Number} limit           The largest number to check is prime.
 * @return {primes}                 An array of all primes under the limit.
 *
 */
function SieveOfEratosthenes(limit) {
    // define and populate sieve
    // -1 is prime, 0 is not prime, 1 is unknown
    var sieve = [];
    for (var i = 0; i < limit; i++) {
        sieve[i] = 1;
    }

    sieve[0] = 0;
    sieve[1] = 0;

    // start from 2, 1 is not prime
    for (var i = 2; i + 1 < limit; ) {
        // once we find a prime, mark that number as prime and flag all multiples as not prime
        if (IsPrime(i)) {
            sieve[i] = -1;

            // flag multiples as not prime
            for (var j = 2; i * j < limit; j++) {
                sieve[i * j] = 0;
            }

            // find the next unmarked number
            while (sieve[i] != 1 && i + 1 < limit) {
                i++;
            }
        }
    }

    // filter primes
    var primes = [];

    // fudge first entry such that nth position = nths prime
    primes[0] = 0;

    for (var i = 1; i < sieve.length; i++) {
        if (sieve[i] == -1) {
            primes.push(i);
        }
    }

    return primes;
}

/**
 * Return all prime numbers up to the nth term.
 *
 * @param {Number} n            The nth prime to find.
 * @param {Number} sieveSize    Size to extend the sieve each iteration. Default = 100.
 * @return                      The nth prime number.
 *
 */
function SieveOfEratosthenesNthPrime(n, sieveSize = 20, iterations = 0, previousPrimesList = null, previousPrimeCount = 0) {
    if (iterations == 0) {
        // track prime count and found primes
        var primeCount = 0;
        var primesList = [];

        // define and populate sieve, 1 bigger on the first pass to account for the fact array indicies start at 0
        // -1 is prime, 0 is not prime, 1 is unknown
        var sieve = [];
        for (var i = 0; i < sieveSize + 1; i++) sieve[i] = 1;

        sieve[0] = 0; // 0 not prime
        sieve[1] = 0; // 1 is not prime
    } else {
        // track prime count and found primes
        var primeCount = previousPrimeCount;
        var primesList = previousPrimesList;

        // define and populate sieve
        // -1 is prime, 0 is not prime, 1 is unknown
        var sieve = [];
        for (var i = 0; i < sieveSize; i++) sieve[i] = 1;

        // mark all multiples of found primes as non prime
        for (var i = 0; i < primesList.length; i++) {
            for (var j = 0; j < sieveSize; j++) {
                if ((1 + j + sieveSize * iterations) % primesList[i] == 0) sieve[j] = 0;
            }
        }
    }

    // 2nd order sieve correct
    // need to make the below skip ahead to the first unknown
    // account for the fact the first time through this may not be the same

    for (var i = 0; i < sieveSize; ) {
        // if the number we're checking is prime
        if (IsPrime(i + sieveSize * iterations)) {
            // mark this value as prime
            sieve[i] = -1;

            // add prime to prime list and increase prime count
            primesList.push(i);
            primeCount++;

            // if we've reached the nth prime, return it
            if (primeCount == n) {
                return i;
            } else {
                // mark all multiples in the sieve as not prime
                for (var j = 2; i * j < sieveSize + 1; j++) sieve[i * j] = 0;

                // find the next unmarked number
                while (sieve[i] != 1 && i < sieveSize) {
                    i++;
                }
            }
        } else {
            // mark this value as not prime
            sieve[i] = 0;

            // skip to the next number
            i++;
        }
    }

    SieveOfEratosthenesNthPrime(n, sieveSize, iterations + 1, primesList, primeCount);
}

/**
 * Calculate all prime factors of a number.
 *
 * @param  {Number} n           Number to calculate prime factors for.
 * @return                      All prime factors of a number.
 *
 */
function CalculatePrimeFactors(n) {
    // calculate what the largest prime factor could be
    var largestPrime = Math.floor(Math.sqrt(n));

    // generate all possible prime factors
    var primes = SieveOfEratosthenes(largestPrime);

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

                console.log(n);

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
    SieveOfEratosthenesNthPrime,
    CalculatePrimeFactors
};
