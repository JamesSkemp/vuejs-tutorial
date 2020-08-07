import LocationOpponent from './LocationOpponent';
import EncounterRate from './EncounterRate';

export default class Location {
	/**
	 * Unique id of the location.
	 */
	public id = -1;
	/**
	 * Short name of the location.
	 */
	public shortName = "Unknown";
	public asset = "tiledBack_black";
	/**
	 * Chance of an encounter while at the location.
	 */
	public encounterRate: EncounterRate = { checkTime: 4, chance: 25 };
	/**
	 * Ids of the opponents that may be found in this location. Order matters, and the same opponent id can be used multiple times.
	 */
	public opponents: LocationOpponent[] = [];
}
