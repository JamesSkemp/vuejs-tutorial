import BaseStats from './BaseStats';
import StatModifications from './StatModifications';
import CombatStats from './CombatStats';
import Attack from './Attack';
import { getCurrentArmor, getCurrentSpeed } from '@/utilities/CharacterUtilities';

export default class Character {
	/**
	 * Unique id of the character, if a main character.
	 */
	public id: number = -1;
	/**
	 * Stores the character's base stats. Temporary changes to these stats should be handled by `statMods` or `currentHealth`.
	 */
	public baseStats: BaseStats;
	/**
	 * Temporary modifications to the character's `baseStats`.
	 */
	public statMods: StatModifications;
	public combatStats: CombatStats;
	public currentHealth: number;
	public lastAttack: number = -1;
	public nextAttack: number = -1;
	public side: number = -1;
	// TODO store additional attacks the character has access to, outside default one

	public constructor() {
		// TODO accept id of some sort to change initial values
		this.baseStats = new BaseStats(30, 12, 10, 0, 6, 0, 10);
		this.baseStats.melee.attacks.push(new Attack('Basic', '1d6'));
		this.currentHealth = this.baseStats.health;
		this.statMods = new StatModifications();
		this.combatStats = new CombatStats();
	}

	// TODO functionality to get current stats based upon baseStats and statMods
	// TODO roll melee, range, magic, dodge functions, with proper failure tracking

	/**
	 * Damage to deal to the character, not including damage reduction like armor.
	 * @param damage Damage dealt to the character, before armor.
	 * @param minimumDamage Minimum damage to deal to the character.
	 */
	public takeDamage(damage: number, minimumDamage: number = 0) {
		let damageTaken = damage;
		damageTaken -= getCurrentArmor(this);

		if (damageTaken < minimumDamage) {
			damageTaken = minimumDamage;
		}
		// TODO some skills may negate this minimum damage
		this.currentHealth -= damageTaken;
	}

	/**
	 * Setup the character for their first turn of a battle.
	 */
	public setInitialTurn(initialTurn: number = 0): void {
		this.lastAttack = -1;
		this.nextAttack = initialTurn + getCurrentSpeed(this);
		this.isInBattle = true;
	}

	public processTurn(currentTurn: number): void {
		this.statMods.processTurn();
		this.lastAttack = currentTurn;
		this.nextAttack += getCurrentSpeed(this);
	}

	/**
	 * Revives a character with current health set to a percentage of their maximum health. Stat mods are not taken into effect.
	 * @param healthPercentage Percentage of health to restore them to.
	 */
	public revive(healthPercentage: number = 100): void {
		this.currentHealth = Math.round(this.baseStats.health * (healthPercentage / 100));
	}

	public getShortDetails(): string {
		return `Character ${this.id} | Party ${this.side}`;
	}

	/**
	 * Completely resets all combat stats for a character. Should generally only be done for non-player characters.
	 */
	private resetCombatStats() {
		this.combatStats.meleeFailures = 0;
		this.combatStats.rangeFailures = 0;
		this.combatStats.magicFailures = 0;
		this.combatStats.dodgeFailures = 0;
	}
}
