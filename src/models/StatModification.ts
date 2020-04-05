export default class StatModification {
	/**
	 * Amount the stat this is associated with should be modified.
	 */
	public amount: number;
	/**
	 * Number of turns the stat should be modified.
	 */
	public turns: number;

	public constructor(amount: number, turns: number) {
		this.amount = amount;
		this.turns = turns;
	}
}
