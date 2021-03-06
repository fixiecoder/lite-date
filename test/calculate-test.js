const { assert } = require('chai');
const {
  calculateYearFromMs,
  calculateYearAndRemainder,
  calculatePartialYearMS,
  calculateDayOfYear,
  calculateDayOfWeek,
  caclulateEpochMS,
  calculateIsLeapYear
} = require('../src/calculate');

const testValues = require('./test-values');

const lastSecondOf2017 = 1514764799000;
const lastSecondOf1980 = 347155199000;
const lastSecondOf1996 = 852076799000;
const startOf2018 = 1514764800000;
const startOf1980 = 315532800000;
const startOf1981 = 347155200000;
const startOf2020 = 1577836800000;
const afterFebInLeapYear1980 = 326073599000;
const DAY_MS = 1000 * 60 * 60 * 24;
const YEAR_MS_NO_LEAP = DAY_MS * 365;


describe.only('calculateYearAndRemainder', () => {
  it('start of leap year', () => {
    testValues.leap.start.forEach(values => {
      const result = calculateYearAndRemainder(values.epoch);
      assert.equal(result.year, values.year);
    });
  });
  it('end of leap year', () => {
    testValues.leap.end.forEach(values => {
      const result = calculateYearAndRemainder(values.epoch);
      assert.equal(result.year, values.year);
    });
  });
  it('beforeLeapDay of leap year', () => {
    testValues.leap.beforeLeapDay.forEach(values => {
      const result = calculateYearAndRemainder(values.epoch);
      assert.equal(result.year, values.year);
    });
  });
  it('afterLeapDay of leap year', () => {
    testValues.leap.afterLeapDay.forEach(values => {
      const result = calculateYearAndRemainder(values.epoch);
      assert.equal(result.year, values.year);
    });
  });
});

describe('calculateYearFromMs', () => {
  it('should return the correct year when given an epoch that is midnight on the 1st of January of a year', () => {
    const expectedOne = 2018;
    const expectedTwo = 1980;
    const expectedThree = 1981;
    const expectedFour = 2020;
    const resultOne = calculateYearFromMs(startOf2018);
    const resultTwo = calculateYearFromMs(startOf1980);
    const resultThree = calculateYearFromMs(startOf1981);
    const resultFour = calculateYearFromMs(startOf2020);
    assert.equal(resultOne, expectedOne);
    assert.equal(resultTwo, expectedTwo);
    assert.equal(resultThree, expectedThree);
    assert.equal(resultFour, expectedFour);
  });

  it('should return the correct year when given an epoch that is the last second of a year', () => {
    const expectedOne = 2017;
    const expectedTwo = 1980;
    const expectedThree = 1996;
    const resultOne = calculateYearFromMs(lastSecondOf2017);
    const resultTwo = calculateYearFromMs(lastSecondOf1980);
    const resultThree = calculateYearFromMs(lastSecondOf1996);
    assert.equal(resultOne, expectedOne);
    assert.equal(resultTwo, expectedTwo);
    assert.equal(resultThree, expectedThree);
  });

  it('should return the correct year when given an epoch that is after february in a leapYear', () => {
    const expectedOne = 1980;
    const resultOne = calculateYearFromMs(afterFebInLeapYear1980);
    assert.equal(resultOne, expectedOne);
  });

  it('should return 1970 when given 0', () => {
    const expectedOne = 1970;
    const resultOne = calculateYearFromMs(0);
    assert.equal(resultOne, expectedOne);
  });
});

describe('calculateYearAndRemainder', () => {
  it('should work', () => {
    const expectedRemainder = 3888000000; // 45 days
    const result = calculateYearAndRemainder(startOf2018 + expectedRemainder);
    assert.equal(result.remainder, expectedRemainder);
  });

  it('should work 2', () => {
    const expectedRemainder = 3888000000 * 2; // 90 days
    const result = calculateYearAndRemainder(startOf1980 + expectedRemainder);
    assert.equal(result.remainder, expectedRemainder);
  });

  it('should work 3', () => {
    const expectedRemainder = 3888000000 * 6; // 270 days
    const result = calculateYearAndRemainder(startOf1981 + expectedRemainder);
    assert.equal(result.remainder, expectedRemainder);
  });

  // it('should work', () => {
  //   const wholeYears = ((1996 - 1970) * YEAR_MS_NO_LEAP) + (DAY_MS * 6);
  //   const expected = lastSecondOf1996 - wholeYears - DAY_MS;
  //   const result = calculateYearAndRemainder(lastSecondOf1996);
  //   console.log('================');
  //   console.log('result', result);
  //   console.log('expect', expected);
  //   assert.equal(result.remainder, expected);
  // });
});
