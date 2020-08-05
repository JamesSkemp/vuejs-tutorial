/**
 * Character attack preferences.
 */
export enum AttackType {
	Melee,
	Range,
	Magic
}

export enum Desire {
	Battle,
	Explore,
	/**
	 * Wants to regain health.
	 */
	Rest,
	SearchForParty,
	Travel
}

export enum PartyState {
	AtLocation,
	/**
	 * At a town location.
	 */
	AtLocationTown,
	// TODO battle, or encounter? should there be another state for an encounter, which may become a battle?
	InBattle,
	IsResting,
	IsTravelling
}

/**
 * Get the string version of an AttackPreference.
 *
 * @param attackPreference Character's attack preference.
 * @returns Friendly text for display.
 */
export function attackPreferenceToText(attackPreference: AttackType): string {
	switch (attackPreference) {
		case AttackType.Melee:
			return 'Melee';
		case AttackType.Range:
			return 'Range';
		case AttackType.Magic:
			return 'Magic';
		default:
			return 'Unknown';
	}
}

/**
 * Get the string version of a Desire.
 *
 * @param desire Character's Desire.
 * @returns String representation of the Desire.
 */
export function desireToText(desire: Desire): string {
	switch (desire) {
		case Desire.Rest:
			return 'Rest';
		case Desire.SearchForParty:
			return 'Search for a party';
		case Desire.Explore:
			return 'Explore';
		case Desire.Travel:
			return 'Travel';
		case Desire.Battle:
			return 'Battle';
		default:
			return 'Unknown';
	}
}

/**
 * Gets friendly text for a PartyState.
 *
 * @param partyState PartyState to convert to text.
 * @returns {string} Friendly text for display.
 */
export function partyStateToText(partyState: PartyState): string {
	switch (partyState) {
		case PartyState.AtLocation:
			// TODO return location information
			return 'At Location ___';
		case PartyState.AtLocationTown:
			return 'At Town';
		case PartyState.InBattle:
			return 'In Battle';
		case PartyState.IsResting:
			return 'Resting';
		case PartyState.IsTravelling:
			return 'Travelling';
		default:
			return 'Unknown';
	}
}
