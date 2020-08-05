import World from 'src/models/World';
import { eraseJournal } from '@/utilities/JournalUtilities';

const world = new World();

test('World has empty journal', () => {
	expect(world.journal.count()).toBe(0);
});

test('World journal has an entry', () => {
	world.journal.addEntry(0, 'Test');
	expect(world.journal.count()).toBe(1);
});

test('World journal is cleared', () => {
	world.journal.addEntry(1, 'Test 2');
	eraseJournal(world.journal);
	expect(world.journal.count()).toBe(0);
});
