import Party from '@/models/Party';

/**
 * Sorts parties by id.
 * @param parties Parties to sort.
 */
export function sortByPartyId(parties: Party[]): Party[] {
	return parties.sort((p1, p2) => {
		return p1.id - p2.id;
	});
}
