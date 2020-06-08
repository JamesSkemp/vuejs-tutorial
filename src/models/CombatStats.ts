/**
 * Track combat-related stats.
 */
export default class CombatStats {
	/**
	 * Total number of times a melee roll has failed.
	 */
	public meleeFailures = 0;
	/**
	 * Total number of times a range roll has failed.
	 */
	public rangeFailures = 0;
	/**
	 * Total number of times a magic roll has failed.
	 */
	public magicFailures = 0;
	/**
	 * Total number of times a dodge roll has failed.
	 */
	public dodgeFailures = 0;

	public constructor() {
		// TODO?
	}

	// TODO function to return which checks should be made
}
