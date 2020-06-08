import World from '@/models/World';
import Party from '@/models/Party';

/**
 * Sort all parties in a World by id.
 *
 * @param world World that contains the parties to sort.
 * @returns Sorted parties.
 */
export function sortPartiesById(world: World): Party[] {
	return world.parties.sort((p1, p2) => {
		return p1.id - p2.id;
	});
}
