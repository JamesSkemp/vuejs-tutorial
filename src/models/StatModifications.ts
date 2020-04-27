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
	}

	// TODO add functionality to add a modification - possibly add multiple modifications
	// TODO add functionality to prematurely remove or decrement a modification
	// TODO add functionality to see if a particular modification has been added (for example, paralysis, poison) - it should check all stats since it's possible for one effect to impact multiple stats
}
