import World from "@/models/World";
import { startNextMoment } from '@/utilities/WorldUtilities';

const world = new World();

test('World starts at moment 0', () => {
	expect(world.currentMoment).toBe(0);
});

test('Starting next moment increments moment by 1', () => {
	const startMoment = world.currentMoment;
	startNextMoment(world);
	expect(world.currentMoment).toBe(startMoment + 1);
});
