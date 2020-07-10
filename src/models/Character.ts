import BaseStats from './BaseStats';
import StatModifications from './StatModifications';
import CombatStats from './CombatStats';
import Attack from './Attack';
import { AttackPreference } from '@/utilities/Enums';
import NameGenerator from '@/utilities/NameGenerator';
import Journal from './Journal';

export default class Character {
	/**
	 * Unique id of the character, if a main character.
	 */
	public id = -1;
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
	public lastAttack = -1;
	public nextAttack = -1;
	public side = -1;
	public isInBattle = false;
	public isResting = false;
	public testString = "";
	public journal: Journal;

	public constructor() {
		// TODO accept id of some sort to change initial values, or should this be a utility?
		this.name = `${NameGenerator.randomName(2, 5)} ${NameGenerator.randomName(2, 5)}`;
		this.preferredAttack = AttackPreference.Melee;
		this.baseStats = new BaseStats(30, 12, 10, 0, 6, 0, 10);
		this.baseStats.melee.attacks.push(new Attack(0, 'Basic', '1d6'));
		this.currentHealth = this.baseStats.health;
		this.statMods = new StatModifications();
		this.combatStats = new CombatStats();
		this.journal = new Journal();
	}
}
