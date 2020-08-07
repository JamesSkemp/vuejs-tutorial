/**
 * Opponent that can be found at a Location, with reference to opponent and the percent chance they'll be encountered.
 */
export default interface LocationOpponent {
	/**
	 * Id of the opponent that might be encountered.
	 */
	id: number;
	/**
	 * Percent chance the opponent can be encountered.
	 */
	rarity: number;
}
