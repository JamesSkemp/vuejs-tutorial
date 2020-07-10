import Character from '@/models/Character';
import { DiceRoll } from 'rpg-dice-roller';
import { processStatModificationTurn, totalStatModifications } from './StatModificationUtilities';
import { Desire, PartyState } from './Enums';
import Party from '@/models/Party';
import StatCheckResults from '@/models/StatCheckResults';
import CharacterModel from '@/models/CharacterModel';

/**
 * Trigger an attack from one character to another.
 *
 * @param character Character attacking.
 * @param opponent Character being attacked.
 * @returns {string[]} Messages, if any.
 */
export function attackOpponent(character: Character, opponent: Character): string[] {
	// TODO what about attacks that target more than one opponent?
	// TODO different for each type of attack, or should this determine what the character will attack with? should it just be simplified to an attack value?
	const messages: string[] = [];
	// TODO check for criticals
	if (checkMelee(character).successful)
	{
		messages.push('Character hit');
		const damageRoll = new DiceRoll(character.baseStats.melee.attacks[0].damage);
		if (damageRoll.total > 0)
		{
			messages.push('Damage of ' + damageRoll.total);
			let damageTotal = damageRoll.total;
			// TODO check for criticals
			if (checkDodge(opponent).successful) {
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
 * Check to see a character makes a melee check.
 *
 * @param character Character to check.
 * @param modifier Amount to change the check. Positive makes success more likely, negative makes the check more difficult.
 * @returns True if the check was successful.
 */
export function checkMelee(character: Character, modifier?: number): StatCheckResults {
	const result = new StatCheckResults();
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
		result.successful = roll <= meleeStat && roll !== 20;
		result.critical = (roll === 1 || roll === 20);
		result.difference = (meleeStat - roll);
	}
	if (!result.successful) {
		character.combatStats.meleeFailures++;
	}
	return result;
}

/**
 * Check to see a character makes a range check.
 *
 * @param character Character to check.
 * @param modifier Amount to change the check. Positive makes success more likely, negative makes the check more difficult.
 * @returns True if the check was successful.
 */
export function checkRange(character: Character, modifier?: number): StatCheckResults {
	const result = new StatCheckResults();
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
		result.successful = roll <= rangeStat && roll !== 20;
		result.critical = (roll === 1 || roll === 20);
		result.difference = (rangeStat - roll);
	}
	if (!result.successful) {
		character.combatStats.rangeFailures++;
	}
	return result;
}

/**
 * Check to see a character makes a magic check.
 *
 * @param character Character to check.
 * @param modifier Amount to change the check. Positive makes success more likely, negative makes the check more difficult.
 * @returns True if the check was successful.
 */
export function checkMagic(character: Character, modifier?: number): StatCheckResults {
	const result = new StatCheckResults();
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
		result.successful = roll <= magicStat && roll !== 20;
		result.critical = (roll === 1 || roll === 20);
		result.difference = (magicStat - roll);
	}
	if (!result.successful) {
		character.combatStats.magicFailures++;
	}
	return result;
}

/**
 * Check to see a character makes a dodge check.
 *
 * @param character Character to check.
 * @param modifier Amount to change the check. Positive makes success more likely, negative makes the check more difficult.
 * @returns True if the check was successful.
 */
export function checkDodge(character: Character, modifier?: number): StatCheckResults {
	const result = new StatCheckResults();
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
		result.successful = roll <= dodgeStat && roll !== 20;
		result.critical = (roll === 1 || roll === 20);
		result.difference = (dodgeStat - roll);
	}
	if (!result.successful) {
		character.combatStats.dodgeFailures++;
	}
	return result;
}

/**
 * Get the current health, including modifications, for a character.
 *
 * @param character Character to check.
 * @returns {number} Current stat value, taking into account modifications.
 */
export function getCurrentHealthMax(character: Character): number {
	let health = character.baseStats.health;
	character.statMods.healthModifications.forEach(mod => {
		health += mod.amount;
	});
	return health;
}

/**
 * Get the current melee, including modifications, for a character.
 *
 * @param character Character to check.
 * @returns {number} Current stat value, taking into account modifications.
 */
export function getCurrentMelee(character: Character): number {
	let melee = character.baseStats.melee.value;
	character.statMods.meleeModifications.forEach(mod => {
		melee += mod.amount;
	});
	return melee;
}

/**
 * Get the current range, including modifications, for a character.
 *
 * @param character Character to check.
 * @returns {number} Current stat value, taking into account modifications.
 */
export function getCurrentRange(character: Character): number {
	let range = character.baseStats.range.value;
	character.statMods.rangeModifications.forEach(mod => {
		range += mod.amount;
	});
	return range;
}

/**
 * Get the current magic, including modifications, for a character.
 *
 * @param character Character to check.
 * @returns {number} Current stat value, taking into account modifications.
 */
export function getCurrentMagic(character: Character): number {
	let magic = character.baseStats.magic.value;
	character.statMods.magicModifications.forEach(mod => {
		magic += mod.amount;
	});
	return magic;
}

/**
 * Get the current dodge, including modifications, for a character.
 *
 * @param character Character to check.
 * @returns {number} Current stat value, taking into account modifications.
 */
export function getCurrentDodge(character: Character): number {
	let dodge = character.baseStats.dodge;
	character.statMods.dodgeModifications.forEach(mod => {
		dodge += mod.amount;
	});
	return dodge;
}

/**
 * Get the current armor, including modifications, for a character.
 *
 * @param character Character to check.
 * @returns {number} Current stat value, taking into account modifications.
 */
export function getCurrentArmor(character: Character): number {
	let armor = character.baseStats.armor;
	character.statMods.armorModifications.forEach(mod => {
		armor += mod.amount;
	});
	return armor;
}

/**
 * Get the current speed, including modifications, for a character.
 *
 * @param character Character to check.
 * @returns {number} Current stat value, taking into account modifications.
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
 * @param character Character to setup.
 * @param initialTurn Turn/moment the character was initialized. Should be set to the world's current moment.
 */
export function setInitialTurn(character: Character, initialTurn = 0): void {
	character.lastAttack = -1;
	character.nextAttack = initialTurn + getCurrentSpeed(character);
	character.isInBattle = true;
}

/**
 * Get a character's current desire.
 *
 * @param party Party the character is in (as party state can impact the character).
 * @param character Character to check.
 * @returns Character's current desire.
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
 * Process a character's turn in which they attacked.
 *
 * @param character Character to process.
 * @param currentTurn Current moment in the world.
 */
export function processAttackTurn(character: Character, currentTurn: number): void {
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
 * @param character Character to modify.
 */
export function resetCombatStats(character: Character): void {
	character.combatStats.meleeFailures = 0;
	character.combatStats.rangeFailures = 0;
	character.combatStats.magicFailures = 0;
	character.combatStats.dodgeFailures = 0;
}

/**
 * Get a character's displayable id and party side.
 *
 * @param character Character to check.
 * @returns Character's id and side.
 */
export function getShortDetails(character: Character): string {
	return `Character ${character.id} | Party ${character.side}`;
}

/**
 * Get a loggable string of a character's base stats.
 *
 * @param character Character to check.
 * @returns All of the character's base stats, joined by a `-`.
 */
export function getSuperShortBaseStats(character: Character | CharacterModel): string {
	return `${character.baseStats.health}-${character.baseStats.melee.value}-${character.baseStats.range.value}-${character.baseStats.magic.value}-${character.baseStats.dodge}-${character.baseStats.armor}-${character.baseStats.speed}`;
}

/**
 * Get a displayable list of a character's base stats.
 *
 * @param character Character to check.
 * @returns Single line of the character's base stats.
 */
export function getShortBaseStats(character: Character | CharacterModel): string {
	return `Health ${character.baseStats.health}, Melee ${character.baseStats.melee.value}, Range ${character.baseStats.range.value}, Magic ${character.baseStats.magic.value}, Dodge ${character.baseStats.dodge}, Armor ${character.baseStats.armor}, Speed ${character.baseStats.speed}`;
}

/**
 * Get a character's current stats.
 *
 * @param character Character to check.
 * @returns {string[]} Collection of current stats, one per stat.
 */
export function getCurrentStats(character: Character): string[] {
	return [`Health ${character.currentHealth}`, `Melee ${getCurrentMelee(character)}`, `Range ${getCurrentRange(character)}`, `Magic ${getCurrentMagic(character)}`, `Dodge ${getCurrentDodge(character)}`, `Armor ${getCurrentArmor(character)}`, `Speed ${getCurrentSpeed(character)}`];
}

/**
 * Get total stat modifications for each stat of a character.
 *
 * @param character Character to check.
 * @param emptyMessage The message that will be returned whenever there are no modifications for a stat.
 * @returns {string[]} Collection of current stat modifications, one per stat.
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
