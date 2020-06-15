/**
 * Represents the results after checking a stat.
 */
export default class StatCheckResults {
	/**
	 * Whether the check was successful or not.
	 */
	public successful = false;
	/**
	 * Whether the check resulted in a critical. Check against `successful` to see what type of critical it was.
	 */
	public critical = false;
	/**
	 * Difference between the character's stat and the check.
	 */
	public difference = 0;

	/**
	 * Creates new stat check results.
	 *
	 * @param successful Whether the check was successful.
	 * @param critical Whether the check resulted in a critical. Combine with `successful` to determine if it was a critical success or critical failure.
	 * @param difference Difference between the character's stat and the check. 0 or less is better.
	 */
	public constructor(successful = false, critical = false, difference = 0) {
		this.successful = successful;
		this.critical = critical;
		this.difference = difference;
	}
}
