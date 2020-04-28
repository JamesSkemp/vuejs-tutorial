import Character from '@/models/Character';
import { sortByHealth, sortBySpeed, sortByDodge, sortByArmor, sortByMelee, sortByRange, sortByMagic } from './CharacterSortUtilities';
import { getCurrentMagic } from './CharacterUtilities';

/**
 * Return the character with the most health, or null if there are no (living) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithHighestHealth(characters: Character[]): Character | null {
	const mostHealth = sortByHealth(characters.filter(c => c.currentHealth > 0));

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
	const leastHealth = sortByHealth(characters.filter(c => c.currentHealth > 0)).reverse();

	if (leastHealth.length > 0) {
		return leastHealth[0];
	}
	return null;
}

/**
 * Return the character with the highest melee, or null if there are no (living) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithHighestMelee(characters: Character[]): Character | null {
	const most = sortByMelee(characters.filter(c => c.currentHealth > 0));

	if (most.length > 0) {
		return most[0];
	}
	return null;
}

/**
 * Return the character with the lowest melee, or null if there are no (living) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithLowestMelee(characters: Character[]): Character | null {
	const least = sortByMelee(characters.filter(c => c.currentHealth > 0));

	if (least.length > 0) {
		return least[0];
	}
	return null;
}

/**
 * Return the character with the highest range, or null if there are no (living) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithHighestRange(characters: Character[]): Character | null {
	const most = sortByRange(characters.filter(c => c.currentHealth > 0));

	if (most.length > 0) {
		return most[0];
	}
	return null;
}

/**
 * Return the character with the lowest range, or null if there are no (living) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithLowestRange(characters: Character[]): Character | null {
	const least = sortByRange(characters.filter(c => c.currentHealth > 0));

	if (least.length > 0) {
		return least[0];
	}
	return null;
}

/**
 * Return the character with the highest magic, or null if there are no (living) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithHighestMagic(characters: Character[]): Character | null {
	const most = sortByMagic(characters.filter(c => c.currentHealth > 0 && getCurrentMagic(c) > 0));

	if (most.length > 0) {
		return most[0];
	}
	return null;
}

/**
 * Return the character with the lowest magic, or null if there are no (living or able) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithLowestMagic(characters: Character[]): Character | null {
	const least = sortByMagic(characters.filter(c => c.currentHealth > 0 && getCurrentMagic(c) > 0));

	if (least.length > 0) {
		return least[0];
	}
	return null;
}

/**
 * Return the character with the highest dodge, or null if there are no (living) characters.
 * @param characters Characters to search.
 */
export function getCharacterWithHighestDodge(characters: Character[]): Character | null {
	const most = sortByDodge(characters.filter(c => c.currentHealth > 0));

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
	const least = sortByDodge(characters.filter(c => c.currentHealth > 0)).reverse();

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
	const most = sortByArmor(characters.filter(c => c.currentHealth > 0));

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
	const least = sortByArmor(characters.filter(c => c.currentHealth > 0)).reverse();

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
	const most = sortBySpeed(characters.filter(c => c.currentHealth > 0)).reverse();

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
	const least = sortBySpeed(characters.filter(c => c.currentHealth > 0));

	if (least.length > 0) {
		return least[0];
	}
	return null;
}

export function getLivingCharacters(characters: Character[]): Character[] {
	const livingCharacters = characters.filter(c => c.currentHealth > 0);
	return livingCharacters;
}
