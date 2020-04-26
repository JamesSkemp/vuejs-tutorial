import World from '@/models/World';
import Party from '@/models/Party';

export function sortPartiesById(world: World): Party[] {
	return world.parties.sort((p1, p2) => {
		return p1.id - p2.id;
	});
}
