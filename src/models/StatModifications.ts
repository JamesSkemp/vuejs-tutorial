import StatModification from './StatModification';

export default class StatModifications {
	public healthModifications: StatModification[] = [];
	public meleeModifications: StatModification[] = [];
	public rangeModifications: StatModification[] = [];
	public magicModifications: StatModification[] = [];
	public dodgeModifications: StatModification[] = [];
	public armorModifications: StatModification[] = [];
	/**
	 * Adds a speed modification. Unlike the others, negative numbers increase the speed, while positive numbers decrease the speed.
	 */
	public speedModifications: StatModification[] = [];
	public damageModifications: StatModification[] = [];

	constructor() {
		// TODO?
	}
}
