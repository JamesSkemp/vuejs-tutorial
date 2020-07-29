import StatModifications from '@/models/StatModifications';
import StatModification from '@/models/StatModification';

type TotalStatModification = { turns: number, total: number }

/**
 * Add a health stat modification.
 *
 * @param statMods StatModifications to modify.
 * @param statMod Health modification to add.
 */
export function addHealthModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.healthModifications.push(statMod);
}

/**
 * Add a melee stat modification.
 *
 * @param statMods StatModifications to modify.
 * @param statMod Melee modification to add.
 */
export function addMeleeModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.meleeModifications.push(statMod);
}

/**
 * Add a range stat modification.
 *
 * @param statMods StatModifications to modify.
 * @param statMod Range modification to add.
 */
export function addRangeModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.rangeModifications.push(statMod);
}

/**
 * Add a magic stat modification.
 *
 * @param statMods StatModifications to modify.
 * @param statMod Magic modification to add.
 */
export function addMagicModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.magicModifications.push(statMod);
}

/**
 * Add a dodge stat modification.
 *
 * @param statMods StatModifications to modify.
 * @param statMod Dodge modification to add.
 */
export function addDodgeModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.dodgeModifications.push(statMod);
}

/**
 * Add an armor stat modification.
 *
 * @param statMods StatModifications to modify.
 * @param statMod Armor modification to add.
 */
export function addArmorModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.armorModifications.push(statMod);
}

/**
 * Add a speed stat modification.
 *
 * @param statMods StatModifications to modify.
 * @param statMod Speed modification to add.
 */
export function addSpeedModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.speedModifications.push(statMod);
}

/**
 * Add a damage stat modification.
 *
 * @param statMods StatModifications to modify.
 * @param statMod Damage modification to add.
 */
export function addDamageModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.damageModifications.push(statMod);
}

/**
 * Get the total modifications for a stat, including maximum turns the stat is modified.
 *
 * @param statMods StatModifications to check.
 * @returns Turns a modification is in effect, and the current modification amount. The total may change as turns go by, and modifications expire.
 */
export function totalStatModifications(statMods: StatModification[]): TotalStatModification {
	let turns = 0;
	let total = 0;
	if (statMods.length > 0) {
		statMods.forEach(statMod => {
			if (statMod.turns > turns) {
				turns = statMod.turns;
			}
			total += statMod.amount;
		});
	}
	return {turns, total};
}

/**
 * Process a turn on all modifications, decreasing turn counts and dropping any that are no longer valid.
 *
 * @param statMods StatModifications to process.
 */
export function processStatModificationTurn(statMods: StatModifications): void {
	statMods.healthModifications = statMods.healthModifications.filter(filterExpiredStatModification);
	//console.log(JSON.stringify(statMods.meleeModifications));
	statMods.meleeModifications = statMods.meleeModifications.filter(filterExpiredStatModification);
	//console.log(JSON.stringify(statMods.meleeModifications));
	statMods.rangeModifications = statMods.rangeModifications.filter(filterExpiredStatModification);
	statMods.magicModifications = statMods.magicModifications.filter(filterExpiredStatModification);
	statMods.dodgeModifications = statMods.dodgeModifications.filter(filterExpiredStatModification);
	statMods.armorModifications = statMods.armorModifications.filter(filterExpiredStatModification);
	statMods.speedModifications = statMods.speedModifications.filter(filterExpiredStatModification);
	statMods.damageModifications = statMods.damageModifications.filter(filterExpiredStatModification);
}

/**
 * Clears all modifications, no matter their state.
 *
 * @param statMods Modifications to clear.
 * @returns {void}
 */
export function clearAllModifications(statMods: StatModifications): void {
	statMods.healthModifications = [];
	statMods.meleeModifications = [];
	statMods.rangeModifications = [];
	statMods.magicModifications = [];
	statMods.dodgeModifications = [];
	statMods.armorModifications = [];
	statMods.speedModifications = [];
	statMods.damageModifications = [];
}

/**
 * Get a displayable version of stat modifications. Properties without a modification are not displayed.
 *
 * @param statMods Stat modifications to display data for.
 * @returns Stat modification details for display.
 */
export function getStatModificationsDetails(statMods: StatModifications): string {
	// TODO this all needs to be cleaned up
	const healthMod = statMods.healthModifications.length === 0 ? '' : ` Health ${JSON.stringify(statMods.healthModifications)}`;
	const meleeMod = statMods.meleeModifications.length === 0 ? '' : ` Melee ${JSON.stringify(statMods.meleeModifications)}`;
	const rangeMod = statMods.rangeModifications.length === 0 ? '' : ` Range ${JSON.stringify(statMods.rangeModifications)}`;
	const magicMod = statMods.magicModifications.length === 0 ? '' : ` Magic ${JSON.stringify(statMods.magicModifications)}`;
	const dodgeMod = statMods.dodgeModifications.length === 0 ? '' : ` Dodge ${JSON.stringify(statMods.dodgeModifications)}`;
	const armorMod = statMods.armorModifications.length === 0 ? '' : ` Armor ${JSON.stringify(statMods.armorModifications)}`;
	const speedMod = statMods.speedModifications.length === 0 ? '' : ` Speed ${JSON.stringify(statMods.speedModifications)}`;
	const damageMod = statMods.damageModifications.length === 0 ? '' : `Damage ${JSON.stringify(statMods.damageModifications)}`;
	return `${healthMod}${meleeMod}${rangeMod}${magicMod}${dodgeMod}${armorMod}${speedMod}${damageMod}`;
}

/**
 * Given a collection of StatModification, decrements the turns count, if it wasn't added this round, and then drops any that no longer have turns remaining.
 *
 * @param element StatModification to check.
 * @returns {boolean} True if the modification is still active.
 */
function filterExpiredStatModification(element: StatModification): boolean {
	//console.log(arguments);
	if (!element.newlyAdded) {
		element.turns--;
	} else {
		element.newlyAdded = false;
	}
	return element.turns > 0;
}

// TODO add functionality to prematurely remove or decrement a modification
// TODO add functionality to see if a particular modification has been added (for example, paralysis, poison) - it should check all stats since it's possible for one effect to impact multiple stats
