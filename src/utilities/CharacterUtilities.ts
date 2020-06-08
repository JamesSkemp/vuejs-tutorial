import Character from '@/models/Character';
import { DiceRoll } from 'rpg-dice-roller';
import { processStatModificationTurn, totalStatModifications } from './StatModificationUtilities';
import { Desire, PartyState } from './Enums';
import Party from '@/models/Party';

/**
 * @param character
 * @param opponent
 */
export function attackOpponent(character: Character, opponent: Character): string[] {
	// TODO different for each type of attack, or should this determine what the character will attack with? should it just be simplified to an attack value?
	const messages: string[] = [];
	if (checkMelee(character))
	{
		messages.push('Character hit');
		const damageRoll = new DiceRoll(character.baseStats.melee.attacks[0].damage);
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
			takeDamage(opponent, damageTotal);
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
 * Damage to deal to the character, not including damage reduction like armor.
 *
 * @param character Character to take damage.
 * @param damage Damage dealt to the character, before armor.
 * @param minimumDamage Minimum damage to deal to the character.
 * @returns Final damage taken.
 */
export function takeDamage(character: Character, damage: number, minimumDamage = 0): number {
	let damageTaken = damage;
	damageTaken -= getCurrentArmor(character);

	if (damageTaken < minimumDamage) {
		damageTaken = minimumDamage;
	}
	// TODO some skills may negate this minimum damage
	character.currentHealth -= damageTaken;

	return damageTaken;
}

/**
 * @param character
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
 * @param character
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
 * @param character
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
 * @param character
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

/**
 * @param character
 */
export function getCurrentHealthMax(character: Character): number {
	let health = character.baseStats.health;
	character.statMods.healthModifications.forEach(mod => {
		health += mod.amount;
	});
	return health;
}

/**
 * @param character
 */
export function getCurrentMelee(character: Character): number {
	let melee = character.baseStats.melee.value;
	character.statMods.meleeModifications.forEach(mod => {
		melee += mod.amount;
	});
	return melee;
}

/**
 * @param character
 */
export function getCurrentRange(character: Character): number {
	let range = character.baseStats.range.value;
	character.statMods.rangeModifications.forEach(mod => {
		range += mod.amount;
	});
	return range;
}

/**
 * @param character
 */
export function getCurrentMagic(character: Character): number {
	let magic = character.baseStats.magic.value;
	character.statMods.magicModifications.forEach(mod => {
		magic += mod.amount;
	});
	return magic;
}

/**
 * @param character
 */
export function getCurrentDodge(character: Character): number {
	let dodge = character.baseStats.dodge;
	character.statMods.dodgeModifications.forEach(mod => {
		dodge += mod.amount;
	});
	return dodge;
}

/**
 * @param character
 */
export function getCurrentArmor(character: Character): number {
	let armor = character.baseStats.armor;
	character.statMods.armorModifications.forEach(mod => {
		armor += mod.amount;
	});
	return armor;
}

/**
 * @param character
 */
export function getCurrentSpeed(character: Character): number {
	let speed = character.baseStats.speed;
	character.statMods.speedModifications.forEach(mod => {
		speed += mod.amount;
	});
	return speed;
}

/**
 * Setup a character for their first turn of a battle.
 *
 * @param character
 * @param initialTurn
 */
export function setInitialTurn(character: Character, initialTurn = 0): void {
	character.lastAttack = -1;
	character.nextAttack = initialTurn + getCurrentSpeed(character);
	character.isInBattle = true;
}

/**
 * @param party
 * @param character
 */
export function getCharacterDesire(party: Party, character: Character): Desire {
	if (party.state === PartyState.AtLocationTown) {
		if (character.currentHealth < getCurrentHealthMax(character)) {
			return Desire.Rest;
		} else if (party.timeAtLocation >= 100) {
			// TODO change number as needed - 100 = 5 minutes
			return Desire.SearchForParty;
		} else if (party.targetLocation >= 0) {
			return Desire.Travel;
		} else {
			return Desire.Explore;
		}
	} else {
		// They're not at town.
		if (party.state === PartyState.InBattle) {
			return Desire.Battle;
		} else if (character.currentHealth <= getCurrentHealthMax(character) / 2) {
			// TODO tweak as needed
			return Desire.Rest;
		} else if (party.targetLocation >= 0) {
			return Desire.Travel;
		} else {
			return Desire.Explore;
		}
	}
}

/**
 * @param character
 * @param currentTurn
 */
export function processTurn(character: Character, currentTurn: number): void {
	processStatModificationTurn(character.statMods);
	character.lastAttack = currentTurn;
	character.nextAttack += getCurrentSpeed(character);
}

/**
 * Revives a character with current health set to a percentage of their maximum health. Stat mods are not taken into effect.
 *
 * @param character Character to revive.
 * @param healthPercentage Percentage of health to restore them to.
 */
export function revive(character: Character, healthPercentage = 100): void {
	character.currentHealth = Math.round(character.baseStats.health * (healthPercentage / 100));
}

/**
 * Completely resets all combat stats for a character. Should generally only be done for non-player characters.
 *
 * @param character
 */
export function resetCombatStats(character: Character): void {
	character.combatStats.meleeFailures = 0;
	character.combatStats.rangeFailures = 0;
	character.combatStats.magicFailures = 0;
	character.combatStats.dodgeFailures = 0;
}

/**
 * @param character
 */
export function getShortDetails(character: Character): string {
	return `Character ${character.id} | Party ${character.side}`;
}

/**
 * @param character
 */
export function getSuperShortBaseStats(character: Character): string {
	return `${character.baseStats.health}-${character.baseStats.melee.value}-${character.baseStats.range.value}-${character.baseStats.magic.value}-${character.baseStats.dodge}-${character.baseStats.armor}-${character.baseStats.speed}`;
}

/**
 * @param character
 */
export function getShortBaseStats(character: Character): string {
	return `Health ${character.baseStats.health}, Melee ${character.baseStats.melee.value}, Range ${character.baseStats.range.value}, Magic ${character.baseStats.magic.value}, Dodge ${character.baseStats.dodge}, Armor ${character.baseStats.armor}, Speed ${character.baseStats.speed}`;
}

/**
 * @param character
 */
export function getCurrentStats(character: Character): string[] {
	return [`Health ${character.currentHealth}`, `Melee ${getCurrentMelee(character)}`, `Range ${getCurrentRange(character)}`, `Magic ${getCurrentMagic(character)}`, `Dodge ${getCurrentDodge(character)}`, `Armor ${getCurrentArmor(character)}`, `Speed ${getCurrentSpeed(character)}`];
}

/**
 * @param character
 * @param emptyMessage
 */
export function getStatModifications(character: Character, emptyMessage = 'None'): string[] {
	let healthMods = '';
	let damageMods = '';
	let meleeMods = '';
	let rangeMods = '';
	let magicMods = '';
	let dodgeMods = '';
	let armorMods = '';
	let speedMods = '';

	if (character.statMods.healthModifications.length > 0) {
		const totals = totalStatModifications(character.statMods.healthModifications);
		healthMods = `Health ${totals.total} for ${totals.turns} turns`;
	}
	if (character.statMods.damageModifications.length > 0) {
		const totals = totalStatModifications(character.statMods.damageModifications);
		damageMods = `Damage ${totals.total} for ${totals.turns} turns`;
	}
	if (character.statMods.meleeModifications.length > 0) {
		const totals = totalStatModifications(character.statMods.meleeModifications);
		meleeMods = `Melee ${totals.total} for ${totals.turns} turns`;
	}
	if (character.statMods.rangeModifications.length > 0) {
		const totals = totalStatModifications(character.statMods.rangeModifications);
		rangeMods = `Range ${totals.total} for ${totals.turns} turns`;
	}
	if (character.statMods.magicModifications.length > 0) {
		const totals = totalStatModifications(character.statMods.magicModifications);
		magicMods = `Magic ${totals.total} for ${totals.turns} turns`;
	}
	if (character.statMods.dodgeModifications.length > 0) {
		const totals = totalStatModifications(character.statMods.dodgeModifications);
		dodgeMods = `Dodge ${totals.total} for ${totals.turns} turns`;
	}
	if (character.statMods.armorModifications.length > 0) {
		const totals = totalStatModifications(character.statMods.armorModifications);
		armorMods = `Armor ${totals.total} for ${totals.turns} turns`;
	}
	if (character.statMods.speedModifications.length > 0) {
		const totals = totalStatModifications(character.statMods.speedModifications);
		speedMods = `Speed ${totals.total} for ${totals.turns} turns`;
	}

	let results = [healthMods, damageMods, meleeMods, rangeMods, magicMods, dodgeMods, armorMods,speedMods];
	results = results.filter(m => m.length > 0);
	if (results.length === 0 && emptyMessage !== '') {
		results.push(emptyMessage);
	}
	return results;
}
