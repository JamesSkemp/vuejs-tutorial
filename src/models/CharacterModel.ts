import BaseStats from './BaseStats';
import { AttackType } from '@/utilities/Enums';

/**
 * Model used to define character data, that's later parsed into a Character.
 */
export default interface CharacterModel {
	/**
	 * Unique id of the character type.
	 */
	id: number;
	/**
	 * Short internal description, to help when working with the raw data.
	 */
	shortName: string;
	introText: string;
	/**
	 * Used to determine which asset will be loaded.
	 */
	type: string;
	baseStats: BaseStats;
	preferredAttack: AttackType;
	// TODO skills, or is that part of something else?
}
