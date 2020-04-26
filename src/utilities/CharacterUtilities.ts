import Character from '@/models/Character';
import { DiceRoll } from 'rpg-dice-roller';
import { sortByHealth } from './CharacterSortUtilities';

export function attackOpponent(character: Character, opponent: Character) : string[] {
	// TODO different for each type of attack, or should this determine what the character will attack with? should it just be simplified to an attack value?
	let messages: string[] = [];
	if (checkMelee(character))
	{
		messages.push('Character hit');
		let damageRoll = new DiceRoll(character.baseStats.melee.attacks[0].damage);
		if (damageRoll.total > 0)
		{
			messages.push('Damage of ' + damageRoll.total);
			let damageTotal = damageRoll.total;
			if (checkDodge(opponent)) {
				damageTotal = Math.ceil(damageTotal / 2);
				messages.push('Damage halved to ' + damageTotal);
			}
			else
			{
				messages.push('Dodge failed.');
			}
			opponent.takeDamage(damageTotal);
			messages.push('Current health ' + opponent.currentHealth);
		}
	}
	else
	{
		messages.push('Attack missed.');
	}

	return messages;
}

/**
 * 
 * @param modifier Amount to change the check. Positive makes success more likely, negative makes the check more difficult.
 * @returns True if the character succeed their check.
 */
export function checkMelee(character: Character, modifier?: number): boolean {
	let success = false;
	let meleeStat = character.baseStats.melee.value;
	if (character.statMods.meleeModifications) {
		character.statMods.meleeModifications.forEach(mod => {
			if (mod.turns > 0) {
				meleeStat += mod.amount;
			}
		});
	}
	if (modifier) {
		meleeStat += modifier;
	}

	if (meleeStat >= 1) {
		const roll = new DiceRoll('1d20').total;
		success = roll <= meleeStat;
	}
	if (!success) {
		character.combatStats.meleeFailures++;
	}
	return success;
}

/**
 * 
 * @param modifier Amount to change the check. Positive makes success more likely, negative makes the check more difficult.
 * @returns True if the character succeed their check.
 */
export function checkRange(character: Character, modifier?: number): boolean {
	let success = false;
	let rangeStat = character.baseStats.range.value;
	if (character.statMods.rangeModifications) {
		character.statMods.rangeModifications.forEach(mod => {
			if (mod.turns > 0) {
				rangeStat += mod.amount;
			}
		});
	}
	if (modifier) {
		rangeStat += modifier;
	}

	if (rangeStat >= 1) {
		const roll = new DiceRoll('1d20').total;
		success = roll <= rangeStat;
	}
	if (!success) {
		character.combatStats.rangeFailures++;
	}
	return success;
}

/**
 * 
 * @param modifier Amount to change the check. Positive makes success more likely, negative makes the check more difficult.
 * @returns True if the character succeed their check.
 */
export function checkMagic(character: Character, modifier?: number): boolean {
	let success = false;
	let magicStat = character.baseStats.magic.value;
	if (character.statMods.magicModifications) {
		character.statMods.magicModifications.forEach(mod => {
			if (mod.turns > 0) {
				magicStat += mod.amount;
			}
		});
	}
	if (modifier) {
		magicStat += modifier;
	}

	if (magicStat >= 1) {
		const roll = new DiceRoll('1d20').total;
		success = roll <= magicStat;
	}
	if (!success) {
		character.combatStats.magicFailures++;
	}
	return success;
}

/**
 * 
 * @param modifier Amount to change the check. Positive makes success more likely, negative makes the check more difficult.
 */
export function checkDodge(character: Character, modifier?: number): boolean {
	let success = false;
	let dodgeStat = character.baseStats.dodge;
	if (character.statMods.dodgeModifications) {
		character.statMods.dodgeModifications.forEach(mod => {
			if (mod.turns > 0) {
				dodgeStat += mod.amount;
			}
		});
	}
	if (modifier) {
		dodgeStat += modifier;
	}

	if (dodgeStat >= 1) {
		const roll = new DiceRoll('1d20').total;
		success = roll <= dodgeStat;
	}
	if (!success) {
		character.combatStats.dodgeFailures++;
	}

	return success;
}

export function getCurrentMelee(character: Character): number {
	let melee = character.baseStats.melee.value;
	character.statMods.meleeModifications.forEach(mod => {
		melee += mod.amount;
	});
	return melee;
}

export function getCurrentRange(character: Character): number {
	let range = character.baseStats.range.value;
	character.statMods.rangeModifications.forEach(mod => {
		range += mod.amount;
	});
	return range;
}

export function getCurrentMagic(character: Character): number {
	let magic = character.baseStats.magic.value;
	character.statMods.magicModifications.forEach(mod => {
		magic += mod.amount;
	});
	return magic;
}

export function getCurrentDodge(character: Character): number {
	let dodge = character.baseStats.dodge;
	character.statMods.dodgeModifications.forEach(mod => {
		dodge += mod.amount;
	});
	return dodge;
}

export function getCurrentArmor(character: Character): number {
	let armor = character.baseStats.armor;
	character.statMods.armorModifications.forEach(mod => {
		armor += mod.amount;
	});
	return armor;
}

export function getCurrentSpeed(character: Character): number {
	let speed = character.baseStats.speed;
	character.statMods.speedModifications.forEach(mod => {
		speed += mod.amount;
	});
	return speed;
}

export function getSuperShortBaseStats(character: Character): string {
	return `${character.baseStats.health}-${character.baseStats.melee.value}-${character.baseStats.range.value}-${character.baseStats.magic.value}-${character.baseStats.dodge}-${character.baseStats.armor}-${character.baseStats.speed}`;
}

export function getShortBaseStats(character: Character): string {
	return `Health ${character.baseStats.health}, Melee ${character.baseStats.melee.value}, Range ${character.baseStats.range.value}, Magic ${character.baseStats.magic.value}, Dodge ${character.baseStats.dodge}, Armor ${character.baseStats.armor}, Speed ${character.baseStats.speed}`;
}
