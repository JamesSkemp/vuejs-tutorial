import BaseStats from './BaseStats';
import StatModifications from './StatModifications';
import CombatStats from './CombatStats';
import Attack from './Attack';
import { AttackPreference } from '@/utilities/Enums';
import NameGenerator from '@/utilities/NameGenerator';

export default class Character {
	/**
	 * Unique id of the character, if a main character.
	 */
	public id: number = -1;
	/**
	 * Character's name. May be generic for opponents.
	 */
	public name: string;
	/**
	 * How the character prefers to attack.
	 */
	public preferredAttack: AttackPreference;
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
	public isInBattle: boolean = false;
	public isResting: boolean = false;
	public testString: string = "";

	public constructor() {
		// TODO accept id of some sort to change initial values, or should this be a utility?
		this.name = `${NameGenerator.randomName(2, 5)} ${NameGenerator.randomName(2, 5)}`;
		this.preferredAttack = AttackPreference.Melee;
		this.baseStats = new BaseStats(30, 12, 10, 0, 6, 0, 10);
		this.baseStats.melee.attacks.push(new Attack('Basic', '1d6'));
		this.currentHealth = this.baseStats.health;
		this.statMods = new StatModifications();
		this.combatStats = new CombatStats();
	}
}
