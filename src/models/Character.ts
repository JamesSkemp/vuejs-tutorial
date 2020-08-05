import BaseStats from './BaseStats';
import StatModifications from './StatModifications';
import CombatStats from './CombatStats';
import Attack from './Attack';
import { AttackType } from '@/utilities/Enums';
import NameGenerator from '@/utilities/NameGenerator';
import Journal from './Journal';
import CharacterData from '@/data/CharacterData';

export default class Character {
	/**
	 * Unique id of the character, if a main character.
	 */
	public id = -1;
	/**
	 * Model type of character.
	 */
	public modelType = -1;
	/**
	 * Character's name. May be generic for opponents.
	 */
	public name = '';
	/**
	 * How the character prefers to attack.
	 */
	public preferredAttack: AttackType;
	/**
	 * Stores the character's base stats. Temporary changes to these stats should be handled by `statMods` or `currentHealth`.
	 */
	public baseStats: BaseStats;
	/**
	 * Temporary modifications to the character's `baseStats`.
	 */
	public statMods: StatModifications;
	// TODO skills, such as healing and boosts? should probably be off of corresponding baseStat
	public combatStats: CombatStats;
	public currentHealth: number;
	public lastAttack = -1;
	public nextAttack = -1;
	public side = -1;
	public isInBattle = false;
	public isResting = false;
	public testString = "";
	public journal: Journal;

	/**
	 * Create a new Character, either an adventurer or opponent.
	 *
	 * @param modelId CharacterData model to use when creating the character. Can point to adventurers or opponents, based upon isAdventurer.
	 * @param isAdventurer If true, will try to match against adventurer data, otherwise will try to match against opponent data.
	 */
	public constructor(modelId: number, isAdventurer = false) {
		// TODO should this be a utility?

		this.preferredAttack = AttackType.Melee;
		this.baseStats = new BaseStats(30, 12, 10, 0, 6, 0, 10);
		this.baseStats.melee.attacks.push(new Attack(0, 'Basic', '1d6'));
		this.currentHealth = this.baseStats.health;

		this.statMods = new StatModifications();
		this.combatStats = new CombatStats();
		this.journal = new Journal();

		if (isAdventurer) {
			this.name = `${NameGenerator.randomName(2, 5)} ${NameGenerator.randomName(2, 5)}`;

			const characterModel = CharacterData.Adventurers.filter(c => c.id === modelId)[0];

			if (characterModel) {
				this.modelType = characterModel.id;
				this.preferredAttack = characterModel.preferredAttack;
				this.baseStats = {...characterModel.baseStats};
				// TODO skills
				/*this.baseStats = new BaseStats(
					characterModel.baseStats.health,
					characterModel.baseStats.melee.value,
					characterModel.baseStats.range.value,
					characterModel.baseStats.magic.value,
					characterModel.baseStats.dodge,
					characterModel.baseStats.armor,
					characterModel.baseStats.speed
				);
				characterModel.baseStats.melee.attacks.forEach(attack => {
					this.baseStats.melee.attacks.push(new Attack(
						attack.id,
						attack.name,
						attack.damage,
						attack.cooldown,
						attack.attackModifier,
						attack.dodgeModifier,
						attack.targetStatModifications
					));
				});
				characterModel.baseStats.range.attacks.forEach(attack => {
					this.baseStats.range.attacks.push(new Attack(
						attack.id,
						attack.name,
						attack.damage,
						attack.cooldown,
						attack.attackModifier,
						attack.dodgeModifier,
						attack.targetStatModifications
					));
				});
				characterModel.baseStats.magic.attacks.forEach(attack => {
					this.baseStats.magic.attacks.push(new Attack(
						attack.id,
						attack.name,
						attack.damage,
						attack.cooldown,
						attack.attackModifier,
						attack.dodgeModifier,
						attack.targetStatModifications
					));
				});*/
				this.currentHealth = this.baseStats.health;
			}
		} else {
			const opponentModel = CharacterData.Opponents.filter(c => c.id === modelId)[0];

			if (opponentModel) {
				this.modelType = opponentModel.id;
				this.preferredAttack = opponentModel.preferredAttack;
				this.baseStats = {...opponentModel.baseStats};
				this.currentHealth = this.baseStats.health;
				// TODO skills
			}
		}
	}
}
