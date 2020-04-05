/**
 * Track combat-related stats.
 */
export default class CombatStats {
	/**
	 * Total number of times a melee roll has failed.
	 */
	public meleeFailures: number = 0;
	/**
	 * Total number of times a range roll has failed.
	 */
	public rangeFailures: number = 0;
	/**
	 * Total number of times a magic roll has failed.
	 */
	public magicFailures: number = 0;
	/**
	 * Total number of times a dodge roll has failed.
	 */
	public dodgeFailures: number = 0;

	public constructor() {
	}

	// TODO function to return which checks should be made
}
