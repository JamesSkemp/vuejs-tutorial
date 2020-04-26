import Character from '@/models/Character';
import { getCurrentDodge, getCurrentArmor, getCurrentSpeed } from './CharacterUtilities';

/**
 * Sorts characters by health, with those with the highest health being returned first.
 * @param characters Characters to sort.
 */
export function sortByHealth(characters: Character[]): Character[] {
	return characters.sort((n1, n2) => {
		let healthCheck = n2.currentHealth - n1.currentHealth;
		if (healthCheck === 0) {
			healthCheck = n2.baseStats.health - n1.baseStats.health;
		}
		return healthCheck;
	});
}

export function sortByDodge(characters: Character[]): Character[] {
	return characters.sort((n1, n2) => {
		let dodgeCheck = getCurrentDodge(n2) - getCurrentDodge(n1);
		if (dodgeCheck === 0) {
			dodgeCheck = n2.baseStats.dodge - n1.baseStats.dodge;
		}
		return dodgeCheck;
	});
}

export function sortByArmor(characters: Character[]): Character[] {
	return characters.sort((n1, n2) => {
		let armorCheck = getCurrentArmor(n2) - getCurrentArmor(n1);
		if (armorCheck === 0) {
			armorCheck = n2.baseStats.armor - n1.baseStats.armor;
		}
		return armorCheck;
	});
}

/**
 * Sorts characters by speed, with the quickest (lowest number) being before slower characters (higher number).
 * @param characters Characters to sort.
 */
export function sortBySpeed(characters: Character[]): Character[] {
	// For all checks we want the lower number to go first.
	return characters.sort((n1, n2) => {
		// First order by their next attack.
		let speedCheck = n1.nextAttack - n2.nextAttack;
		if (speedCheck === 0) {
			// If there's a tie we'll compare modified speed stats.
			speedCheck = getCurrentSpeed(n1) - getCurrentSpeed(n2);
			if (speedCheck === 0) {
				// If those are the same compare base stats.
				speedCheck = n1.baseStats.speed - n2.baseStats.speed;
			}
		}
		return speedCheck;
	});
}
