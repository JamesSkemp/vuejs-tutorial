import Attack from '@/models/Attack';
import { getStatModificationsDetails } from './StatModificationUtilities';

/**
 * Get the display-friendly text for an attack.
 *
 * @param attack Attack to display.
 * @returns {string} User-friendly text.
 */
export function getAttackText(attack: Attack): string {
	const cooldown = attack.cooldown === 0 ? '' : `Cooldown ${attack.cooldown}.`;
	const cooldownRemaining = attack.cooldownRemaining === 0 ? '' : ` Cooldown remaining ${attack.cooldownRemaining}.`;

	return `[${attack.id}] ${attack.name} Attack - ${attack.damage} damage. ${cooldown}${cooldownRemaining} ${getStatModificationsDetails(attack.targetStatModifications)}`;
}

/**
 * Process a character turn for an attack. This effectively just accounts for cooldowns.
 *
 * @param attack Attack to process a turn for.
 */
export function processAttackCooldown(attack: Attack): void {
	// Make sure the cooldown remaining is valid.
	if (attack.cooldownRemaining < 0) {
		attack.cooldownRemaining = 0;
	}

	if (attack.skipCooldownTurn) {
		attack.skipCooldownTurn = false;
		return;
	}
	if (attack.cooldownRemaining === 0) {
		return;
	}
	attack.cooldownRemaining--;
}

/**
 * Handles an attack that was used during the turn by setting any cooldown-related properties as needed.
 *
 * @param attack Attack that was used.
 */
export function markAttackAsUsed(attack: Attack): void {
	if (attack.cooldown > 0) {
		attack.cooldownRemaining += attack.cooldown;
		attack.skipCooldownTurn = true;
	}
}
