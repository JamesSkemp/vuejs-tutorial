import World from "@/models/World";
import { startNextMoment, getUnusedPartyId } from '@/utilities/WorldUtilities';

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
});
