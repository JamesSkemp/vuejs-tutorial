import Journal from "@/models/Journal";
import { getLatestJournalEntries, eraseJournal } from '@/utilities/JournalUtilities';

const journal = new Journal();

test('Starting journal is empty', () => {
	expect(journal.entries.length).toBe(0);
});

test('Add 7 new entries', () => {
	for (let i = 0; i < 7; i++) {
		journal.addEntry(i, `Journal entry number ${i + 1}`);
	}
	expect(journal.entries.length).toBe(7);
});

test('Latest entry is number 7', () => {
	expect(getLatestJournalEntries(journal, 1)[0].message).toBe('Journal entry number 7');
});

test('Erasing all but 3 entries leaves number 5 as first', () => {
	eraseJournal(journal, 3);
	expect(journal.entries[0].message).toBe('Journal entry number 5');
});

test('Erasing all entries leaves no entries', () => {
	eraseJournal(journal);
	expect(journal.entries.length).toBe(0);
});
