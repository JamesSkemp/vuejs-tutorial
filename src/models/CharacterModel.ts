import BaseStats from './BaseStats';

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
}