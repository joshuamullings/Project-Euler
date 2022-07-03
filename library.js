const { config } = require("process");

/**
 * Generate the first n terms of the fibonacci series.
 *
 * @param  {Number} n   The number of terms.
 * @return {Array}      The first n terms of the fibonacci series.
 *
 */
function generateFibonacciNumberOfTerms(n) {
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
 * @return {Array}          The fibonacci series until terms exceed limit.
 *
 */
function generateFibonacciUpToValueLimit(limit) {
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
function isPrime(n) {
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
 * @return {Array}                  An array of all primes under the limit.
 *
 */
function sieveOfEratosthenes(limit) {
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
        if (isPrime(i)) {
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
 * Return the nth prime number.
 *
 * @param {Number} n                    The nth prime to find.
 * @param {Number} sieveSize            Size to extend the sieve each iteration. Default = 100.
 * @param {Number} iterations           The current iteration of the sieve
 * @param {Array} previousPrimeList     The prime list of the previous sieve
 * @param {Number} previousPrimeCount   The prime count of the previous sieve
 * @return {Number}                     The nth prime number.
 *
 */
function sieveOfEratosthenesNthPrime(n, sieveSize = 2000, iterations = 0, previousPrimeList = null, previousPrimeCount = 0) {
    var nAdjustment = iterations * sieveSize;
    var sieve = [];
    var primeCount = iterations == 0 ? 0 : previousPrimeCount;
    var primeList = iterations == 0 ? [] : previousPrimeList;
    for (var i = 0; i < sieveSize + 1; i++) sieve[i] = 1;
    if (iterations == 0) {
        for (var i = 0; i < primeList.length; i++) {
            for (var j = 0; j < sieveSize; j++) {
                if ((1 + j + nAdjustment) % primeList[i] == 0) sieve[j] = 0;
            }
        }
    }

    for (var i = 0; i < sieveSize; ) {
        var nAdjustedNumber = i + nAdjustment;
        if (isPrime(nAdjustedNumber)) {
            sieve[i] = -1;
            primeList.push(nAdjustedNumber);
            primeCount++;
            if (primeCount === n) {
                return nAdjustedNumber;
            } else {
                sieve = markMultiples(nAdjustedNumber, sieveSize, sieve);
                i = findNext(i, sieveSize, sieve);
            }
        } else {
            sieve[i] = 0;
            i++;
        }
    }

    return sieveOfEratosthenesNthPrime(n, sieveSize, iterations + 1, primeList, primeCount);
}

function markMultiples(i, sieveSize, sieve) {
    for (var j = 2; i * j < sieveSize + 1; j++) sieve[i * j] = 0;
    return sieve;
}

function findNext(i, sieveSize, sieve) {
    while (sieve[i] != 1 && i < sieveSize) i++;
    return i;
}

/**
 * Calculate all prime factors of a number.
 *
 * @param  {Number} n           Number to calculate prime factors for.
 * @return {Array}              All prime factors of a number.
 *
 */
function calculatePrimeFactors(n) {
    // calculate what the largest prime factor could be
    var largestPrime = Math.floor(Math.sqrt(n));

    // generate all possible prime factors
    var primes = sieveOfEratosthenes(largestPrime);

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

/**
 * Find the largest product of adjacent digits.
 *
 * @param {Number} length               // The length of adjacent digits to check.
 * @return {Number}                     // The largest product of the adjacent digits.
 *
 */
var numberArray = [];
var Length;
function checkAdjacentDigits(adjacentLength) {
    numberArray = readTextFileTo2DArray("files/problem008.txt");
    Length = adjacentLength;
    var largestProduct = 0;
    for (var row = 0; row < numberArray.length; row++) {
        for (var column = 0; column < numberArray[row].length; column++) {
            var largestSum = Math.max(
                calculateSum(row, column, 0, -1), // north
                calculateSum(row, column, 1, -1), // north west
                calculateSum(row, column, 1, 0), // east
                calculateSum(row, column, 1, 1), // south east
                calculateSum(row, column, 0, 1), // south
                calculateSum(row, column, -1, 1), // south west
                calculateSum(row, column, -1, 0), // west
                calculateSum(row, column, -1, -1) // north west
            );
            if (largestSum > largestProduct) largestProduct = largestSum;
        }
    }

    return largestProduct;
}

function readTextFileTo2DArray(filePath) {
    var fs = require("fs");
    var file = fs.readFileSync(filePath).toString().split("\n");
    for (var i in file) file[i] = file[i].split("");
    return file;
}

function calculateSum(row, column, horizontal, vertical) {
    var sum = numberArray[row][column];
    for (var adjustment = 1; adjustment < Length; adjustment++) {
        var rowAdjusted = row + vertical * adjustment;
        var columnAdjusted = column + horizontal * adjustment;
        if (rowAdjusted < 0 || columnAdjusted < 0 || rowAdjusted > Length || columnAdjusted > Length) sum *= 1;
        else sum *= numberArray[rowAdjusted][columnAdjusted];
    }

    return sum;
}

module.exports = {
    generateFibonacciNumberOfTerms,
    generateFibonacciUpToValueLimit,
    isPrime,
    sieveOfEratosthenes,
    sieveOfEratosthenesNthPrime,
    calculatePrimeFactors,
    checkAdjacentDigits,
};
