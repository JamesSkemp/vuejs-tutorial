import Journal from '@/models/Journal';
import JournalEntry from '@/models/JournalEntry';

/**
 * Get the latest entries from a journal.
 *
 * @param journal Journal to pull entries from.
 * @param count Number of entries to pull.
 * @returns The latest entries from a journal, up to the count requested.
 */
export function getLatestJournalEntries(journal: Journal, count = 5): JournalEntry[] {
	return [...journal.entries].reverse().slice(0, count);
}

/**
 * Erases a journal, optionally keeping a certain number of entries.
 *
 * @param journal Journal to erase.
 * @param entriesToKeep Number of entries to keep, if any.
 */
export function eraseJournal(journal: Journal, entriesToKeep = 0): void {
	if (entriesToKeep <= 0) {
		journal.entries = [];
	} else {
		journal.entries = getLatestJournalEntries(journal, entriesToKeep).reverse();
	}
}
