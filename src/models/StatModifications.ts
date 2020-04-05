import StatModification from './StatModification';

export default class StatModifications {
	public healthModifications: StatModification[] = [];
	public meleeModifications: StatModification[] = [];
	public rangeModifications: StatModification[] = [];
	public magicModifications: StatModification[] = [];
	public dodgeModifications: StatModification[] = [];
	public armorModifications: StatModification[] = [];
	public speedModifications: StatModification[] = [];
	public damageModifications: StatModification[] = [];

	constructor() {
	}

	// TODO add functionality to add a modification - possibly add multiple modifications
	// TODO add functionality to prematurely remove or decrement a modification
	// TODO add functionality to see if a particular modification has been added (for example, paralysis, poison) - it should check all stats since it's possible for one effect to impact multiple stats

	/**
	 * Process a turn on all modifications, decreasing turn counts and dropping any that are no longer valid.
	 */
	public processTurn(): void {
		this.healthModifications = this.healthModifications.filter(this.filterExpiredStatModification);
		//console.log(JSON.stringify(this.meleeModifications));
		this.meleeModifications = this.meleeModifications.filter(this.filterExpiredStatModification);
		//console.log(JSON.stringify(this.meleeModifications));
		this.rangeModifications = this.rangeModifications.filter(this.filterExpiredStatModification);
		this.magicModifications = this.magicModifications.filter(this.filterExpiredStatModification);
		this.dodgeModifications = this.dodgeModifications.filter(this.filterExpiredStatModification);
		this.armorModifications = this.armorModifications.filter(this.filterExpiredStatModification);
		this.speedModifications = this.speedModifications.filter(this.filterExpiredStatModification);
		this.damageModifications = this.damageModifications.filter(this.filterExpiredStatModification);
	}

	/**
	 * Given a collection of StatModification, decrements the turns count, if it wasn't added this round, and then drops any that no longer have turns remaining.
	 * @param element StatModification to check.
	 * @param index 
	 * @param array 
	 */
	private filterExpiredStatModification(element: StatModification, index, array) {
		if (!element.newlyAdded) {
			element.turns--;
		} else {
			element.newlyAdded = false;
		}

		return element.turns > 0;
	}
}
