import World from "@/models/World";
import { startNextMoment, getUnusedPartyId, addPartyToWorld, fixPartyIds, removeEmptyParties } from '@/utilities/WorldUtilities';
import Party from '@/models/Party';
import { addMainCharacter } from '@/utilities/PartyUtilities';
import Character from '@/models/Character';

const world = new World();

test('World starts at moment 0', () => {
	expect(world.currentMoment).toBe(0);
});

test('Starting next moment increments moment by 1', () => {
	const startMoment = world.currentMoment;
	startNextMoment(world);
	expect(world.currentMoment).toBe(startMoment + 1);
});

describe('Verify party ids in world', () => {
	test('Starting unused party id', () => {
		expect(getUnusedPartyId(world)).toBe(0);
	});

	test('Add party with id 1', () => {
		const party1 = new Party(1);
		expect(addPartyToWorld(world, party1)).toBe(1);
	});

	test('Add party with id 3', () => {
		const party3 = new Party(3);
		expect(addPartyToWorld(world, party3)).toBe(3);
	});

	test('Fix party ids', () => {
		fixPartyIds(world);
		expect(world.parties.length == 2 && world.parties[0].id == 0 && world.parties[1].id == 1).toBe(true);
	});

	test('Remove empty parties', () => {
		const party = new Party(3);
		const character = new Character(1, true);
		addMainCharacter(party, character, world.currentMoment);
		addPartyToWorld(world, party);
		removeEmptyParties(world);
		expect(world.parties.length).toBe(1);
	});

	test('Negative party id should be positive', () => {
		const party = new Party(-4);
		expect(addPartyToWorld(world, party)).toBeGreaterThanOrEqual(0);
	});

	test('Passing no party creates one', () => {
		expect(addPartyToWorld(world)).toBeGreaterThanOrEqual(0);
	});
});
