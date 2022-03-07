const library = require("./library.js");

/**
 * Problem 1: Multiples of 3 or 5.
 *
 * If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
 * Find the sum of all the multiples of 3 or 5 below 1000.
 *
 * @param {Number} limit        The number which to find all multiples below.
 * @return {Number}             The sum of all multiples.
 *
 */
function Problem001(limit) {
    var sum = 0;

    for (var i = 0; i < limit; i++) {
        if (i % 3 == 0 || i % 5 == 0) {
            sum += i;
        }
    }

    return sum;
}

/**
 * Problem 2: Even Fibonacci numbers.
 *
 * Each new term in the Fibonacci sequence is generated by adding the previous two terms.
 *
 * By starting with 1 and 2, the first 10 terms will be:
 *
 * 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
 *
 * By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.
 *
 * @param {Number} limit        The limit of terms to calculate.
 * @return {Number}             The sum of the even-valued terms.
 */
function Problem002(limit) {
    var terms = library.GenerateFibonacciUpToValueLimit(limit);
    var sum = 0;

    terms.forEach((element) => {
        if (element % 2 == 0) {
            sum += element;
        }
    });

    return sum;
}

/**
 * Problem 3: Largest prime factor
 *
 * The prime factors of 13195 are 5, 7, 13 and 29.
 *
 * What is the largest prime factor of the number 600851475143?
 *
 * @param {Number} n        The number to find the largest prime factor of.
 * @return {Number}         The largest prime factor of n.
 *
 */
function Problem003(n) {
    // get all prime factors of n
    var primeFactors = library.CalculatePrimeFactors(n);

    // return just the largest
    return primeFactors[primeFactors.length - 1];
}

/**
 * Problem 4: Largest palindrome product
 *
 * A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
 *
 * Find the largest palindrome made from the product of two 3-digit numbers.
 *
 * @param {Number} digits       Number of digits for each of the numbers
 * @return {String}             The largest palindrome product
 */
function Problem004(digits) {
    // calculate number limit
    var digitLimit = Math.pow(10, digits);

    // hold products
    var productList = [];

    // cauclate products
    for (var i = 0; i < digitLimit; i++) {
        for (var j = 0; j < digitLimit; j++) {
            productList.push(i * j);
        }
    }

    // sort products in descending order
    productList = productList.sort((a, b) => b - a);

    // look through products until we find a palindrome, first one is biggest
    for (var i = 0; i < productList.length; i++) {
        // check if palindrome
        if (productList[i].toString() == productList[i].toString().split("").reverse().join("")) {
            return productList[i];
        }
    }

    return 0;
}

/**
 * Problem 5: Smallest multiple
 *
 * 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
 *
 * What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
 *
 * @param {Number} range        // Number range from 1 to rage
 * @return                      // Return the smallest postive divisor across 1 - range
 */
function Problem005(range) {
    // not found flag
    var notFound = true;

    // start number
    var number = 10;

    // run until found
    while (notFound) {
        // check each divisor from 2 to range
        for (var divisor = 2; divisor <= range; divisor++) {
            // check if we can evenly divide by each divisor
            if (number % divisor != 0) {
                break;
            }

            // if we've checked them all and are still here
            if (divisor == range) {
                notFound = false;
            }
        }

        // go to next number
        number++;
    }

    return number - 1;
}

module.exports = {
    Problem001,
    Problem002,
    Problem003,
    Problem004,
    Problem005
};
