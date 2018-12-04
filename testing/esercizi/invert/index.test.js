const invert = require('./index').invert;
test('Test: a not an array', () => {
    expect(invert(1, 0)).toBe(null);
});

test('Test: a is null', () => {
    expect(invert([1], 2)).toBe(null);
});

test('Test: k is null', () => {
    expect(invert([1], 2)).toBe(null);
});

test('Test: k greater than the length of a', () => {
    expect(invert([1], 2)).toBe(null);
});

test('Test: a not an array of integers', () => {
    expect(invert(['a', 1], 1)).toBe(null);
});

test('Test: k not an integer,', () => {
    expect(invert([1, 2, 3], 'a')).toBe(null);
});

test('Test: a not an array of positive integers', () => {
    expect(invert([-1, 1], 1)).toBe(null);
});

test('Test: k not a positive integer,', () => {
    expect(invert([1, 2, 3], -1)).toBe(null);
});

test('Test: a empty array', () => {
    expect(invert([], 0)).toEqual([]);
});

test('Test: a array of positive integers number, k positive integer smaller than the length of a', () => {
    expect(invert([1, 2, 3, 4], 2)).toEqual([3, 4, 1, 2]);
});