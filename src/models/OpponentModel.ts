import CharacterModel from './CharacterModel'

/**
 * Model used to define opponent data, that's later parsed into a Character.
 */
export default interface OpponentModel extends CharacterModel {
	/**
	 * Approximate challenge level. The higher the number, the higher the challenge.
	 */
	challenge: number;
	// TODO rarity? whether they have a name?
	// TODO types of location they are usually found in?
}
