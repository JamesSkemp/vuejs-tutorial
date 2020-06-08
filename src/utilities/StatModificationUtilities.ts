import StatModifications from '@/models/StatModifications';
import StatModification from '@/models/StatModification';

type TotalStatModification = { turns: number, total: number }

export function addHealthModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.healthModifications.push(statMod);
}

export function addMeleeModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.meleeModifications.push(statMod);
}

export function addRangeModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.rangeModifications.push(statMod);
}

export function addMagicModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.magicModifications.push(statMod);
}

export function addDodgeModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.dodgeModifications.push(statMod);
}

export function addArmorModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.armorModifications.push(statMod);
}

export function addSpeedModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.speedModifications.push(statMod);
}

export function addDamageModification(statMods: StatModifications, statMod: StatModification): void {
	// TODO what if a modification already exists? does it extend or replace?
	statMods.damageModifications.push(statMod);
}

/**
 * Get the total modifications for a stat, including maximum turns the stat is modified.
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
 * Given a collection of StatModification, decrements the turns count, if it wasn't added this round, and then drops any that no longer have turns remaining.
 * @param element StatModification to check.
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
