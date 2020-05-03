/**
 * Character attack preferences.
 */
export enum AttackPreference {
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
	InBattle,
	IsResting,
	IsTravelling
}

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
 * @param partyState PartyState to convert to text.
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
