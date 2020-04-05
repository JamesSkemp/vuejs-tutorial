import BaseStats from './BaseStats';
import StatModifications from './StatModifications';

export default class Character {
	/**
	 * Stores the character's base stats. Temporary changes to these stats should be handled by `statMods` or `currentHealth`.
	 */
	public baseStats: BaseStats;
	/**
	 * Temporary modifications to the character's `baseStats`.
	 */
	public statMods: StatModifications;
	public currentHealth: number;
	public lastAttack: number = -1;
	public nextAttack: number = -1;
	public party: number = -1;
	// TODO store additional attacks the character has access to, outside default one

	public constructor() {
		// TODO accept id of some sort to change initial values
		this.baseStats = new BaseStats(30, 12, 10, 0, 6, 0, 10, '1d6');
		this.currentHealth = this.baseStats.health;
		this.statMods = new StatModifications();
	}

	// TODO functionality to get current stats based upon baseStats and statMods
}
