import BaseStats from '@/models/BaseStats';
import BaseStat from '@/models/BaseStat';
import { Parser, DiceRoller, DiceRoll } from 'rpg-dice-roller';

/**
 * Given a set of base stats, determine how many points they total to.
 *
 * @param baseStats Base stats to get the points total for.
 * @returns Total points.
 */
export function getBaseStatsPoints(baseStats: BaseStats): number {
	let pointTotal = 0;
	// Every three health is a point.
	pointTotal += Math.ceil(baseStats.health / 3);

	// TODO all three of the following should take into account special skills
	pointTotal += getCombatStatPoints(baseStats.melee.value);
	pointTotal += getCombatStatPoints(baseStats.range.value);
	// TODO magic = 0 gives extra points
	pointTotal += getCombatStatPoints(baseStats.magic.value);

	// Get an extra point for every attack after the first.
	let attacksModifier = -1;
	if (baseStats.melee.attacks.length > 0) {
		attacksModifier++;
		pointTotal += getBaseAttackPoints(baseStats.melee.attacks[0].damage);
	}
	if (baseStats.range.attacks.length > 0) {
		attacksModifier++;
		pointTotal += getBaseAttackPoints(baseStats.range.attacks[0].damage);
	}
	if (baseStats.magic.attacks.length > 0) {
		attacksModifier++;
		pointTotal += getBaseAttackPoints(baseStats.magic.attacks[0].damage);
	}
	pointTotal += attacksModifier;

	if (baseStats.dodge !== 6) {
		pointTotal += 2 * (baseStats.dodge - 6);
	}

	if (baseStats.armor > 0) {
		pointTotal += baseStats.armor * 3;
	}

	if (baseStats.speed !== 10) {
		pointTotal += 2 * (10 - baseStats.speed);
	}

	return pointTotal;
}

/**
 * Get attack information for a base stat.
 *
 * @param baseStat Melee/range/magic stat to get information for.
 * @returns Array of strings with data.
 */
export function getBaseStatAttacks(baseStat: BaseStat): string[] {
	const results: string[] = [];
	const damageSearch = new RegExp('^(\\d*)d(\\d)(\\+(\\d))*$', 'g');
	if (baseStat.attacks.length > 0) {
		baseStat.attacks.forEach(attack => {
			results.push(attack.damage);
			console.log(damageSearch.exec(attack.damage));
			console.log(Parser.parse(attack.damage));
		});
	}
	return results;
}

/**
 * Get the number of points for a combat stat (melee, range, magic).
 *
 * @param value Combat stat (melee, range, magic) value to get points for.
 * @returns Number of points the stat is worth. Positive = better than the default.
 */
function getCombatStatPoints(value: number): number {
	const defaultValue = 10;
	if (value === defaultValue) {
		return 0;
	} else if (value === 0) {
		// TODO give them some sort of negative points to balance it?
		return 0; // only the magic stat should have a possible 0.
	// Stat is better than usual.
	} else if (value === (defaultValue + 1)) {
		return 1;
	} else if (value === (defaultValue + 2)) {
		return 2;
	} else if (value === (defaultValue + 3)) {
		return 4;
	} else if (value === (defaultValue + 4)) {
		return 6;
	// Stat is worse than usual.
	} else if (value === (defaultValue - 1)) {
		return -1;
	} else if (value === (defaultValue - 2)) {
		return -2;
	} else if (value === (defaultValue - 3)) {
		return -4;
	} else if (value === (defaultValue - 4)) {
		return -6;
	// Finally, check extreme cases.
	} else if (value < (defaultValue - 4)) {
		return (-6 + (-3 * (defaultValue - 4 - value)));
	} else if (value > (defaultValue + 4)) {
		return (6 + (3 * (value - (defaultValue + 4 ))));
	}
	return 0;
}

/**
 * Get the number of points an attack grants.
 *
 * @param attackValue Dice notation for the attack.
 * @returns Points for an attack value.
 */
function getBaseAttackPoints(attackValue: string): number {
	const roller = new DiceRoller();
	// TODO support characters with multiple attacks? dervish could be 1d6 and 1d4, for example, but would need to roll for hit with each attack
	const roll: DiceRoll = roller.roll(attackValue) as DiceRoll;
	return (roll.minTotal - 1) + roll.maxTotal;
}
