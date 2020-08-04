import World from "@/models/World";
import Party from '@/models/Party';
import { addPartyToWorld } from '@/utilities/WorldUtilities';
import { sortPartiesById } from '@/utilities/WorldSortUtilities';

describe('Verify world party sorting', () => {
	const world = new World();

	const party1 = new Party(1);
	const party3 = new Party(3);

	test('Party id is returned', () => {
		expect(addPartyToWorld(world, party3)).toBe(3);
	});

	test('Two parties added', () => {
		addPartyToWorld(world, party1);
		expect(world.parties.length).toBe(2);
	});

	test('Parties out of order', () => {
		expect(world.parties[0].id).toBe(3);
	});

	test('Parties sorted to be in order', () => {
		sortPartiesById(world);
		expect(world.parties[0].id).toBe(1);
	});
});
