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
	// TODO add functionality to remove a modification
	// TODO add functionality to see if a particular modification has been added (for example, paralysis, poison) - it should check all stats since it's possible for one effect to impact multiple stats

	/**
	 * Process a turn on all modifications, decreasing turn counts and dropping any that are no longer valid.
	 */
	public processTurn(): void {
		// TODO
		this.healthModifications.forEach(modification => {
			console.log(modification);
		});
		this.meleeModifications.forEach(modification => {
			console.log(modification);
		});
		this.rangeModifications.forEach(modification => {
			console.log(modification);
		});
		this.magicModifications.forEach(modification => {
			console.log(modification);
		});
		this.dodgeModifications.forEach(modification => {
			console.log(modification);
		});
		this.armorModifications.forEach(modification => {
			console.log(modification);
		});
		this.speedModifications.forEach(modification => {
			console.log(modification);
		});
		this.damageModifications.forEach(modification => {
			console.log(modification);
		});
	}
}
