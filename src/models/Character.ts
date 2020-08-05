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
	 * Text to use when the character is introduced. May be generic or empty for opponents.
	 */
	public introText = '';
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
	/**
	 * Side the character is on. Typically 1 = adventurers and 2 = opponents, but each party just needs to have the same side.
	 */
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
				this.name += ` (${characterModel.shortName})`;
				// TODO do we need a utility to display a message when a character appears?
				this.introText = characterModel.introText;
				this.modelType = characterModel.id;
				this.preferredAttack = characterModel.preferredAttack;
				this.baseStats = {...characterModel.baseStats};
				// TODO skills
				this.currentHealth = this.baseStats.health;
			}
		} else {
			const opponentModel = CharacterData.Opponents.filter(c => c.id === modelId)[0];

			if (opponentModel) {
				this.name = opponentModel.shortName;
				// TODO do we need a utility to display a message when an opponent appears, perhaps based upon the location they're encountered?
				this.introText = opponentModel.introText;
				this.modelType = opponentModel.id;
				this.preferredAttack = opponentModel.preferredAttack;
				this.baseStats = {...opponentModel.baseStats};
				this.currentHealth = this.baseStats.health;
				// TODO skills
			}
		}
	}
}
