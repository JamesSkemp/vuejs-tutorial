import Character from '@/models/Character';
import { sortByHealth, sortBySpeed, sortByDodge, sortByArmor } from './CharacterSortUtilities';

/**
 * Return the character with the most health, or null if there are no (living) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithHighestHealth(characters: Character[]): Character | null {
	let mostHealth = sortByHealth(characters.filter(c => c.currentHealth > 0));

	if (mostHealth.length > 0) {
		return mostHealth[0];
	}
	return null;
}

/**
 * Return the character with the least health, or null if there are no (living) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithLowestHealth(characters: Character[]): Character | null {
	let leastHealth = sortByHealth(characters.filter(c => c.currentHealth > 0)).reverse();

	if (leastHealth.length > 0) {
		return leastHealth[0];
	}
	return null;
}

/**
 * Return the character with the highest dodge, or null if there are no (living) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithHighestDodge(characters: Character[]): Character | null {
	let most = sortByDodge(characters.filter(c => c.currentHealth > 0));

	if (most.length > 0) {
		return most[0];
	}
	return null;
}

/**
 * Return the character with the lowest dodge, or null if there are no (living) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithLowestDodge(characters: Character[]): Character | null {
	let least = sortByDodge(characters.filter(c => c.currentHealth > 0)).reverse();

	if (least.length > 0) {
		return least[0];
	}
	return null;
}

/**
 * Return the character with the most armor, or null if there are no (living) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithHighestArmor(characters: Character[]): Character | null {
	let most = sortByArmor(characters.filter(c => c.currentHealth > 0));

	if (most.length > 0) {
		return most[0];
	}
	return null;
}

/**
 * Return the character with the least armor, or null if there are no (living) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithLowestArmor(characters: Character[]): Character | null {
	let least = sortByArmor(characters.filter(c => c.currentHealth > 0)).reverse();

	if (least.length > 0) {
		return least[0];
	}
	return null;
}

/**
 * Return the character with the highest speed (slowest character, or null if there are no (living) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithHighestSpeed(characters: Character[]): Character | null {
	let most = sortBySpeed(characters.filter(c => c.currentHealth > 0)).reverse();

	if (most.length > 0) {
		return most[0];
	}
	return null;
}

/**
 * Return the character with the lowest speed (fastest character), or null if there are no (living) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithLowestSpeed(characters: Character[]): Character | null {
	let least = sortBySpeed(characters.filter(c => c.currentHealth > 0));

	if (least.length > 0) {
		return least[0];
	}
	return null;
}
