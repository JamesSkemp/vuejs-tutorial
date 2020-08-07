import Location from '@/models/Location';
import { DiceRoll } from 'rpg-dice-roller';

/**
 * Given a location, check whether an encounter should trigger.
 *
 * @param location Location to check against.
 * @param rateModifier Encounter chance modifier. Positive numbers lead to more encounters, negative lead to fewer encounters.
 * @returns True if an encounter should be triggered.
 */
export function checkForEncounter(location: Location, rateModifier: number): boolean {
	const chance = location.encounterRate.chance + rateModifier;

	const roll = new DiceRoll('d%').total;
	return roll <= chance;
}

// TODO different function to get a random opponent - verify that the numbers for that add up to 100? or maybe the last one is the default?

/**
 * Get which opponent(s) should be encountered.
 *
 * @param location Location to pull opponents from.
 * @param minimum Minimum number of opponents to return.
 * @param maximum Maximum number of opponents to return.
 * @returns Id(s) of the opponent to encounter.
 */
export function getLocationOpponent(location: Location, minimum: number, maximum: number): number[] {
	if (location.opponents.length === 0) {
		return [];
	}
	if (location.opponents.length === 1) {
		return [ location.opponents[0].id ];
	}

	const numberOfOpponents = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

	const opponentIds: number[] = [];

	for (let i = 0; i < numberOfOpponents; i++) {
		let roll = new DiceRoll('d%').total;

		for (let j = 0; j < location.opponents.length; j++) {
			roll -= location.opponents[j].rarity;
			if (roll <= 0) {
				opponentIds.push(location.opponents[j].id);
				break;
			}
		}
	}

	return opponentIds;
}
