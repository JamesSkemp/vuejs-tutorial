/**
 * Return a random number in a range, inclusive.
 *
 * @param minimum Minimum number to return.
 * @param maximum Maximum number to return.
 * @returns Random number between the numbers provided, inclusive.
 */
export function randomNumberInRange(minimum: number, maximum: number): number {
	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
}
