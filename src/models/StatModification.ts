export default class StatModification {
	/**
	 * Amount the stat this is associated with should be modified.
	 */
	public amount: number;
	/**
	 * Number of turns the stat should be modified.
	 */
	public turns: number;
	/**
	 * If true, this modification will skip being decremented once. Ideally should only be set for certain modifications, such as if one modification adds another when it expires.
	 */
	public newlyAdded: boolean;

	public constructor(amount: number, turns: number, newlyAdded: boolean = false) {
		this.amount = amount;
		this.turns = turns;
		this.newlyAdded = newlyAdded;
	}
}
