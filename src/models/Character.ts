import BaseStats from './BaseStats';
import StatModifications from './StatModifications';
import CombatStats from './CombatStats';
import Attack from './Attack';
import { DiceRoll } from 'rpg-dice-roller';

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
	public party: number = -1;
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

	public getCurrentMelee(): number {
		let melee = this.baseStats.melee.value;
		this.statMods.meleeModifications.forEach(mod => {
			melee += mod.amount;
		});
		return melee;
	}

	public getCurrentRange(): number {
		let range = this.baseStats.range.value;
		this.statMods.rangeModifications.forEach(mod => {
			range += mod.amount;
		});
		return range;
	}

	public getCurrentMagic(): number {
		let magic = this.baseStats.magic.value;
		this.statMods.magicModifications.forEach(mod => {
			magic += mod.amount;
		});
		return magic;
	}

	public getCurrentArmor(): number {
		let armor = this.baseStats.armor;
		this.statMods.armorModifications.forEach(mod => {
			armor += mod.amount;
		});
		return armor;
	}

	public getCurrentSpeed(): number {
		let speed = this.baseStats.speed;
		this.statMods.speedModifications.forEach(mod => {
			speed += mod.amount;
		});
		return speed;
	}

	/**
	 * 
	 * @param modifier Amount to change the check. Positive makes success more likely, negative makes the check more difficult.
	 * @returns True if the character succeed their check.
	 */
	public checkMelee(modifier?: number): boolean {
		let success = false;
		let meleeStat = this.baseStats.melee.value;
		if (this.statMods.meleeModifications) {
			this.statMods.meleeModifications.forEach(mod => {
				if (mod.turns > 0) {
					meleeStat += mod.amount;
				}
			});
		}
		if (modifier) {
			meleeStat += modifier;
		}

		if (meleeStat >= 1) {
			const roll = new DiceRoll('1d20').total;
			success = roll <= meleeStat;
		}
		if (!success) {
			this.combatStats.meleeFailures++;
		}
		return success;
	}

	/**
	 * 
	 * @param modifier Amount to change the check. Positive makes success more likely, negative makes the check more difficult.
	 */
	public checkDodge(modifier?: number): boolean {
		let success = false;
		let dodgeStat = this.baseStats.dodge;
		if (this.statMods.dodgeModifications) {
			this.statMods.dodgeModifications.forEach(mod => {
				if (mod.turns > 0) {
					dodgeStat += mod.amount;
				}
			});
		}
		if (modifier) {
			dodgeStat += modifier;
		}

		if (dodgeStat >= 1) {
			const roll = new DiceRoll('1d20').total;
			success = roll <= dodgeStat;
		}
		if (!success) {
			this.combatStats.dodgeFailures++;
		}

		return success;
	}

	/**
	 * Damage to deal to the character, not including damage reduction like armor.
	 * @param damage Damage dealt to the character, before armor.
	 * @param minimumDamage Minimum damage to deal to the character.
	 */
	public takeDamage(damage: number, minimumDamage: number = 0) {
		let damageTaken = damage;
		damageTaken -= this.getCurrentArmor();

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
		this.nextAttack = initialTurn + this.getCurrentSpeed();
	}

	public processTurn(currentTurn: number): void {
		this.statMods.processTurn();
		this.lastAttack = currentTurn;
		this.nextAttack += this.getCurrentSpeed();
	}

	/**
	 * Revives a character with current health set to a percentage of their maximum health. Stat mods are not taken into effect.
	 * @param healthPercentage Percentage of health to restore them to.
	 */
	public revive(healthPercentage: number = 100): void {
		this.currentHealth = Math.round(this.baseStats.health * (healthPercentage / 100));
	}

	/**
	 * Completely resets all combat stats for a character. Should generally only be done for non-player characters.
	 */
	public resetCombatStats() {
		this.combatStats.meleeFailures = 0;
		this.combatStats.rangeFailures = 0;
		this.combatStats.magicFailures = 0;
		this.combatStats.dodgeFailures = 0;
	}

	public getShortDetails(): string {
		return `Party ${this.party}`;
	}
}
