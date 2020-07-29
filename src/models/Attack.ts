import StatModifications from './StatModifications';

export default class Attack {
	public id: number;
	/**
	 * Name of the attack, for display.
	 */
	public name: string;
	/**
	 * Dice notation for the damage calculation.
	 */
	public damage: string;
	public cooldown = 0;
	/**
	 * Cooldown remaining since the attack was last used.
	 */
	public cooldownRemaining = 0; // TODO make this part of character turn to auto-decrement
	/**
	 * Modifier to the check to hit. Positive number increases the ability to hit.
	 */
	public attackModifier = 0;
	/**
	 * Modifer to the opponent's check to dodge. Negative number makes it harder for the attack to be dodged.
	 */
	public dodgeModifier = 0;
	/**
	 * Stat modifications applied to the target of the attack, if hit.
	 */
	public targetStatModifications: StatModifications;
	/**
	 * If true, the attack was used this turn, and cooldown should not be decreased.
	 */
	public skipCooldownTurn = false; // TODO this needs to be taken into account

	public constructor(id: number, name: string, damage: string, cooldown?: number, attackModifier?: number, dodgeModifier?: number, targetStatModifications?: StatModifications) {
		this.id = id;
		this.name = name;
		this.damage = damage;
		if (cooldown) {
			this.cooldown = cooldown;
		}
		this.cooldownRemaining = 0;
		if (attackModifier) {
			this.attackModifier = attackModifier;
		}
		if (dodgeModifier) {
			this.dodgeModifier = dodgeModifier;
		}
		this.targetStatModifications = targetStatModifications ?? new StatModifications();
	}
}
