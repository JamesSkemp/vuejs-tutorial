import World from "@/models/World";
import { addPartyToWorld } from '@/utilities/WorldUtilities';
import { clearOpponents, addOpponent, partyHasLivingOpponents } from '@/utilities/PartyUtilities';
import Character from '@/models/Character';

const world = new World();
const partyId = addPartyToWorld(world);

test('Starting party has no opponents', () => {
	expect(world.parties[0].opponents).toHaveLength(0);
});

test('Clearing opponents with none added still returns true', () => {
	expect(clearOpponents(world.parties[0])).toBe(true);
});

test('No opponents means there are no living opponents', () => {
	expect(partyHasLivingOpponents(world.parties[0])).toBe(false);
});

describe('Testing after adding opponent and removing', () => {
	beforeAll(() => {
		addOpponent(world.parties[0], new Character(1), world.currentMoment);
	});

	test('Adding opponent results in one opponent', () => {
		expect(world.parties[0].opponents).toHaveLength(1);
	});

	test('Clearing opponents with one included returns true and no opponents', () => {
		expect(clearOpponents(world.parties[0]) && world.parties[0].opponents.length === 0).toBe(true);
	});
});

