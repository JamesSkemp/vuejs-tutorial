import StatModifications from '@/models/StatModifications';
import StatModification from '@/models/StatModification';

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

