import BaseStats from '@/models/BaseStats';

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

	if (baseStats.dodge !== 6) {
		pointTotal += 2 * (baseStats.dodge - 6);
	}

	if (baseStats.armor > 0) {
		pointTotal += baseStats.armor * 2;
	}

	if (baseStats.speed !== 10) {
		pointTotal += 2 * (10 - baseStats.speed);
	}

	return pointTotal;
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
