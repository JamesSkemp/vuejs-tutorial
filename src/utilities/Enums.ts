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
