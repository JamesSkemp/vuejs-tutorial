/**
 * Character attack preferences.
 */
export enum AttackPreference {
	Melee,
	Range,
	Magic
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
