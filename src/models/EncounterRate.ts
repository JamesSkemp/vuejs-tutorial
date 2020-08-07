/**
 * Encounter rate of a location.
 */
export default interface EncounterRate {
	/**
	 * Number of moments that an encounter should be checked after. For example, a checkTime of 4 would mean that if a party entered the location at moment 10, at moment 14 there should be a check against chance for an encounter.
	 */
	checkTime: number;
	/**
	 * Percent chance of an encounter.
	 */
	chance: number;
}
