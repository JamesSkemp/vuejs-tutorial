import World from 'src/models/World';

const world = new World();

test('World has empty journal', () => {
	expect(world.journal.count()).toBe(0);
});
